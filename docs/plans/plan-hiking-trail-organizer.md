# HikingTrailPlanner — Implementation Plan

> 類似上河地圖的登山行程時間估算工具。使用有向加權圖記錄各路段所需時間，讓登山客能規劃多天行程並計算總花費時間。

---

## 背景與目標

登山客在規劃行程時需要估算各段路程的時間，且上坡與下坡所需時間不同（A→B ≠ B→A）。此功能提供一個互動式工具，讓使用者從已知路線資料中依序選擇路點，規劃多天行程，並計算含休息時間與個人腳程調整後的總時間。

---

## 資料夾結構（新增）

```
frontend/src/
├── model/
│   └── hikingTrail.ts                    # TypeScript types
├── lib/
│   ├── trailGraph.ts                     # Adjacency List utilities
│   └── trailPathfinder.ts                # [Phase 5] Dijkstra
├── constants/
│   └── hikingTrails.ts                   # 靜態路線資料
├── store/hikingTrail/
│   ├── useHikingTrailStore.ts            # createSelectors enhanced store
│   └── hikingTrailSlice.ts              # State slice
├── components/hikingTrail/
│   └── TrailGraphView/
│       ├── index.tsx
│       └── components/
│           ├── NodeList.tsx
│           └── GraphCanvas.tsx           # SVG 視覺化
└── app/hiking-trail-planner/
    ├── layout.tsx
    ├── page.tsx
    └── [uid]/
        └── page.tsx
```

---

## Phase 1：資料結構與路線資料集

**目標：** 定義 TypeScript types，實作有向 Adjacency List，建立初始路線資料。

### TypeScript Types（`frontend/src/model/hikingTrail.ts`）

```typescript
export interface TrailNode {
  id: string
  name: string
  nameEn?: string
  i18nKey: string
  nodeType: TrailNodeType
  elevation?: number     // meter
}

export interface TrailEdge {
  from: string           // node id
  to: string             // node id
  minutes: number        // walking time in minutes
  distance?: number      // kilometer
  note?: string
}

export interface Trail {
  id: string
  name: string
  nameEn?: string
  i18nKey: string
  description?: string
  nodes: TrailNode[]
  edges: TrailEdge[]
}

// 執行期查詢結構（由 Trail.edges 建構）
export type TrailAdjacencyList = Map<string, Map<string, TrailEdge>>

// Day card 資訊 badge（住宿類型 + 水源），可多選，設計為可擴充
export type InfoBadgeType = 'tent' | 'house' | 'droplet'
```

### Utility Functions（`frontend/src/lib/trailGraph.ts`）

| 函式 | 說明 |
|------|------|
| `buildTrailAdjacencyList(trail)` | 從 `Trail.edges` 建構查詢 Map |
| `getEdge(adj, from, to)` | 取得兩點間邊資料 |
| `getNeighbors(adj, nodeId)` | 取得某節點的所有可達鄰居 id |
| `isValidPath(adj, nodeIds)` | 驗證連續節點對是否皆連通 |
| `calculatePathTime(adj, nodeIds)` | 計算一段路徑的總分鐘數 |

### 路線資料集（`frontend/src/constants/hikingTrails.ts`）

- 初始收錄**南二段**
- 每條路線包含完整節點清單 + 雙向邊（各方向時間不同）
- Export：`HIKING_TRAILS: Trail[]` 和 `HIKING_TRAIL_MAP: Record<string, Trail>`

**注意事項：**
- 路線時間資料需參考可靠來源（例如林務局、上河地圖），不可自行編造
- 節點數量預期 10–40 個，Adjacency List 的記憶體開銷微乎其微

**測試：** `trailGraph.ts` 的 unit tests，涵蓋邊查詢、鄰居查詢、路徑驗證、時間計算。

### 設計決策：為何採用分離的 nodes + edges（而非嵌入式 adjacentNodes）

曾評估將鄰接資訊直接嵌入每個節點：
```typescript
// 考慮過但不採用的 Option B
TrailNode.adjacentNodes: Record<neighborId, { minutes, ... }>
```

**採用分離結構（Option A）的理由：跨路線共用節點的擴充性。**

若未來兩條路線共用節點（例如「三叉山」同時出現在南二段與另一條縱走路線），Option A 合併方式簡單且無歧義：
```
mergedNodes = deduplicate([...trailA.nodes, ...trailB.nodes], by: 'id')
mergedEdges = [...trailA.edges, ...trailB.edges]
```
節點本身不含連線資訊，不會產生衝突。

Option B 則需要對共用節點做 deep merge `adjacentNodes`，同一條邊若兩份資料時間不同，衝突會被靜默覆蓋，難以察覺。

`buildTrailAdjacencyList()` 是 O(E) 的一次性建構步驟，執行成本可忽略。

---

## Phase 2：路線資訊展示元件

**目標：** 只讀的視覺化元件，讓使用者在規劃時能查閱路線結構。

### 路由
`/hiking-trail-planner/trails` — 路線清單頁面

### 展示模式
具有左側欄作為選單，右側欄作為檢視路線畫面，切割為左右的排版（類似 /peaks 頁面）。

| 模式 | 說明 |
|------|------|
| **List View** | 可展開的節點清單，每個節點顯示出發邊與對應時間 |
| **Graph View** | SVG 圖形，依海拔高度排列節點，顯示有向邊與時間標籤 |

**行動裝置：** 預設 List View；桌面版兩者並存或可切換。

### 元件設計（`frontend/src/components/hikingTrail/TrailGraphView/`）

- `index.tsx`：接受 `trail: Trail`，協調 list 與 graph 渲染
- `components/NodeList.tsx`：展開式節點清單
- `components/GraphCanvas.tsx`：SVG 視覺化
  - 節點位置依海拔高度排列（縱軸 = elevation）
  - 有向邊用箭頭 + 時間標籤表示
  - 點擊節點時可 highlight 連通的相鄰節點（供 Phase 3 選路使用）

**注意：** 不引入重量級 graph library，純 SVG 已足夠 10–40 節點規模。

---

## Phase 3：路線規劃頁（核心功能）

**目標：** 互動式頁面，讓使用者建立多天登山計畫。

### 路由
`/hiking-trail-planner` — 主要的清單頁面
`/hiking-trail-planner/[planId]` — 詳細頁面（包括檢視和編輯功能）

### Zustand Store（`frontend/src/store/hikingTrail/`）

```typescript
// hikingTrailSlice.ts

// 路段邊隱含於 stops[i] → stops[i+1] 之間
interface RouteStop {
  nodeId: string
}

interface DayPlan {
  id: string              // uuid
  badges: InfoBadgeType[] // 住宿類型與水源資訊 badge（可多選，可擴充）
  stops: RouteStop[]      // 有序停留節點；邊為 stops[i] → stops[i+1]
}

interface HikingPlan {
  id: string
  name: string
  trailIds: string[]      // 支援多路線合併為單一 Trail Network
  paceMultiplier: number  // per-trip 設定，預設 1.0
  days: DayPlan[]
  createdAt: number
  updatedAt: number
}

interface HikingTrailState {
  selectedTrailIds: string[]
  plans: HikingPlan[]
  activePlanId: string | undefined
  actions: {
    setSelectedTrails: (trailIds: string[]) => void
    createPlan: (name: string, trailIds: string[]) => void
    setActivePlan: (planId: string) => void
    addDay: (planId: string) => void
    removeDay: (planId: string, dayId: string) => void
    appendStop: (planId: string, dayId: string, nodeId: string) => void
    insertStop: (planId: string, dayId: string, index: number, nodeId: string) => void
    removeStop: (planId: string, dayId: string, index: number) => void
    setDayBadges: (planId: string, dayId: string, badges: InfoBadgeType[]) => void
    setPaceMultiplier: (planId: string, multiplier: number) => void
  }
}
```

- ~~持久化至 localStorage，key：`'hiking-trail-planner'`~~ 考慮使用 indexedDB

### 頁面 UI 佈局
TODO: 

### 路線建立互動

| 操作 | 實作方式 |
|------|---------|
| **圖形選擇** | (這個階段先不實作，單純顯示。)點擊 TrailGraphView 節點 → 追加至當前天路線末端（只 highlight 有效的下一個節點） |
| **行動裝置備選** | Dropdown / 搜尋選節點 |
| **中間插入** | 每個 segment 有「在此插入」按鈕；或拖曳排序 |
| **移除 segment** | 刪除按鈕；自動重算時間 |
| **驗證** | 若選擇的節點與上一個節點不連通，顯示錯誤提示 |

### 結果呈現

- 每天展開式 timeline：`節點 → [步行 X 分] → 節點 → ...`
- 每天小計（步行時間）、加權時間（× paceMultiplier）
- 全程總計

---

## Phase 4：計畫儲存與管理

**目標：** 儲存、命名、列表、刪除計畫；支援 JSON 匯出/匯入。

### 儲存
- Zustand persist 到 ~~localStorage~~ indexedDB（Phase 3 store 已涵蓋）
- 每個計畫有 UUID + 名稱 + 建立/更新時間戳

### UI
- 計畫清單（sidebar 或 modal）：顯示計畫名稱、路線、天數、建立時間
- 操作：載入、重新命名、複製、刪除
- 匯出為 JSON 檔案（下載按鈕）
- 從 JSON 檔案匯入（上傳按鈕）

**注意：** 不需後端、不需帳號系統；JSON 匯出/匯入讓使用者能分享計畫。

---

## Phase 5：[進階] 自動路徑補全

**目標：** 給定起點與終點，自動計算最短（最短時間）路徑。

### 演算法（`frontend/src/lib/trailPathfinder.ts`）

```typescript
interface PathResult {
  path: string[]          // node ids（含起點與終點）
  totalMinutes: number
}

function findShortestPath(
  adj: TrailAdjacencyList,
  fromId: string,
  toId: string
): PathResult | null
```

- 使用 Dijkstra，以時間（minutes）為權重
- 找不到路徑時回傳 `null`

### UI 整合
- 在路線規劃器中：選擇兩個不相鄰節點後出現「自動補齊」按鈕
- 顯示計算出的路徑供使用者確認後再套用
- 可選：顯示前 N 條替代路徑

**測試：** Dijkstra unit tests（含有向圖、不連通圖、單節點路徑等 edge cases）

---

## 跨面向事項

### i18n
- 新增 namespace `hiking-trail-planner` 至 `messages/en-US.json` 和 `messages/zh-TW.json`
- 路線資料以雙語儲存（`name` / `nameEn`）

### 路由
```
app/hiking-trail-planner/
├── layout.tsx          # AppLayout wrapper
├── page.tsx            # Landing：空白首頁 / 行程清單
└── [uid]/
    └── page.tsx        # Detail：行程詳細頁（麵包屑 + Day cards + stats + network preview）
```

### 測試策略
| 類型 | 涵蓋範圍 |
|------|---------|
| Unit | `trailGraph.ts` 所有函式，`trailPathfinder.ts` Dijkstra |
| Component | route builder 新增/移除/插入/時間計算 |
| E2E | 建立一個兩天行程，驗證總時間正確 |

---

## 實作順序

1. **Phase 1** — 資料模型 + 1 條路線資料集（所有功能的基礎）
2. **Phase 3 Store** — 先定好 state shape（Type + slice）
3. **Phase 2** — 展示元件（供 Phase 3 UI 使用）
4. **Phase 3 UI** — 核心功能
5. **Phase 4** — 儲存與匯出（polish）
6. **Phase 5** — Dijkstra（可獨立於 Phase 1 完成後開始）

---

## 確認事項

| 問題 | 決定 |
|------|------|
| 初始收錄哪條路線？ | **南二段** |
| `TrailNode.elevation` 是否為必填？ | **非必填** |
| 圖形選擇方式？ | **點擊追加**；拖曳排序為進階功能 |
| 休息時間顆粒度？ | **未來功能**（per node，移至 Phase 4；v1 不實作） |
