# Hiking Trail Planner

## 功能概述

瀏覽器端、隱私優先的多天登山行程規劃工具。使用者選取路線後，透過逐步點選節點的方式規劃每日行程，並以個人化步速係數估算加權時間。所有資料皆儲存於本地（IndexedDB），不需帳號或後端。

- **路由**：`/hiking-trail-planner`（Landing）、`/hiking-trail-planner/[planId]`（Detail）

---

## 關鍵檔案

### Pages
- `app/[locale]/hiking-trail-planner/page.tsx` — Landing 頁：空白首頁（首次使用）或行程列表
- `app/[locale]/hiking-trail-planner/[planId]/page.tsx` — 行程詳細頁（檢視與編輯）
- `app/[locale]/hiking-trail-planner/layout.tsx` — 頁面 layout

### Page-level Components
`app/[locale]/hiking-trail-planner/[planId]/components/` 下的元件為 detail page 專屬：

| 元件 | 說明 |
|------|------|
| `DayPlanCardWrapper.tsx` | 包裝 `DayPlanCard`，處理 per-day 的 store 操作 |
| `PaceCard.tsx` | 步速係數調整（+/- 步進）與加權時間顯示 |
| `TripStatsSection.tsx` | 行程統計摘要（總天數、總時間、加權時間） |
| `EditToolbar.tsx` | 編輯模式的儲存 / 取消工具列 |
| `PlanDetailMenu.tsx` | 三點選單（包含 showDuration 等設定） |
| `CoverPhotoCard.tsx` | 右欄封面照片區塊 |
| `PlanNotFound.tsx` | planId 不存在時的錯誤畫面 |
| `PaceAlert.tsx` | 步速係數過高或過低時的安全警告 |

### Shared Components
- `components/hikingTrail/TripCard/` — Landing 頁的行程卡片，含封面照片、路線、天數與 context menu
- `components/hikingTrail/DayPlanCard/` — 每天行程卡片（檢視與編輯雙模式）
  - `components/DayPlanForm.tsx` — 路點選擇表單
  - `components/NodeSelectionPanel/` — 可選節點面板（Desktop / Mobile 版型）
  - `components/RouteIndicator.tsx` — 兩節點間的路段時間標示
  - `components/NodeTypeBadge.tsx` — 節點類型圖示徽章（peak / hut / camp / fork / water-source）
  - `components/QuickJumpButton.tsx` — 開啟 Quick Jump modal 的按鈕
  - `components/QuickJumpModal.tsx` — 最短路徑計算與確認 modal
- `components/TrailGraph/` — Cytoscape.js 路網圖（`fcose` layout）
- `components/ColoredPill/` — 路線 pill 元件（`filled` / `outline` variant）

### Store
- `store/hikingTrail/hikingTrailSlice.ts` — Slice 定義（`plans`、CRUD actions）
- `store/hikingTrail/useHikingTrailStore.ts` — `createSelectors` 增強的 store；使用 **IndexedDB** 持久化（非 localStorage）

### Model
- `model/hikingTrail.ts` — 所有核心型別：`Trail`, `TrailNode`, `TrailEdge`, `DayPlan`, `HikingPlan`, `InfoBadgeType` 等

### Constants
- `constants/hiking-trails/hikingTrail.ts` — 基礎型別常數
- `constants/hiking-trails/southSecondSection.ts` — 南二段路線資料
- `constants/hiking-trails/northFirstSection.ts` — 北一段路線資料
- `constants/hiking-trails/yushanGroup.ts` — 玉山群峰路線資料
- `constants/hiking-trails/positions/` — 各路線的 Cytoscape preset 節點座標（避免重算 layout）
- `constants/hiking-trails/dayPlanCard.ts` — DayPlanCard 相關常數（步速分級等）
- `constants/hikingTrails.ts` — Barrel re-export（`HIKING_TRAILS`, `HIKING_TRAIL_MAP`）

### Lib
- `lib/trailGraph.ts` — 核心工具函式：`buildTrailAdjacencyList`, `getEdge`, `getNeighbors`, `calculatePathTime`, `findShortestPath`（Dijkstra）, `applyQuickJump`

### Hooks
- `hooks/useLeaveConfirm.ts` — 離開頁面前有未儲存變更時彈出確認提示

---

## Edit Mode

Detail page 以 URL query 控制模式：`?edit=true` 進入編輯模式，無此參數則為檢視模式。
`isEditing` state 初始化自 `searchParams.edit`，切換時透過 `router.replace` 更新 URL，確保 back navigation 行為一致。

---

## 資料架構

Trail 採用 **nodes + edges 分離**（而非嵌入式鄰接清單）：

```typescript
interface Trail {
  nodes: TrailNode[]   // 節點定義，不含連線資訊
  edges: TrailEdge[]   // 有向邊，含起點、終點、所需分鐘數
}
```

查詢時透過 `buildTrailAdjacencyList(trail)` 建構 `Map<string, Map<string, TrailEdge>>`。

**這個設計是刻意的**，目的是支援跨路線共用節點（例如「三叉山」同時出現在南二段與北二段）：合併只需 `deduplicate(nodes)` + concat edges，不會有深度 merge 衝突。若改為嵌入式，共用節點的鄰接資訊需要 deep merge，容易產生靜默覆蓋。

Quick Jump（`findShortestPath` / `applyQuickJump`）也在 `lib/trailGraph.ts`，不是獨立的 pathfinder 檔案。

---

## TrailGraph（Cytoscape.js）

- `cy` instance 存在 React **state** 而非 ref。這是刻意的：RWD 視口縮小時 `CytoscapeComponent` 會 remount，若 `cy` 放在 ref，grid/snap 的 `useEffect` 不會重新執行，導致這些功能靜默失效。放在 state 可確保 mount 後 effects 正確 re-attach。
- `constants/hiking-trails/positions/` 內的座標是 Cytoscape **preset** layout 用的節點位置，讓路網圖在每次渲染時保持相同佈局，不會重新計算。新增路線時需要同步提供對應的 positions 檔案。

---

## 注意事項

### IndexedDB 持久化
`useHikingTrailStore` 使用 IndexedDB（透過 `zustand-persist` 的 IndexedDB storage adapter），與其他功能使用 localStorage 不同。行程資料量較大，IndexedDB 無大小限制。

### 路線時間資料
`constants/hiking-trails/` 內的時間資料需參考可靠來源（林務局、上河地圖等），**不可自行編造或估算**。
