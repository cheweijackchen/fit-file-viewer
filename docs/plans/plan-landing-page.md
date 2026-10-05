# Landing Page 實作計劃

## Context

目前首頁 (`app/page.tsx`) 為 "Under Construction" 佔位頁面。需依照 Pencil 設計稿 (`nbPhv` Landing Page frame) 實作完整的 Landing Page。

**設計決策：**
- Landing Page 使用專屬 Layout（不沿用 AppLayout / AppHeader / AppFooter）
- 品牌名稱：**TrailKit**
- Hero 背景先用漸層佔位色塊，之後再替換實際圖片

---

## 設計稿區塊總覽

| # | 區塊 | 背景 | 說明 |
|---|------|------|------|
| 1 | Header | 透明/白 | TrailKit logo、導航連結、Get Started 按鈕 |
| 2 | Hero | 背景圖(先用漸層) | 標題、副標題、兩個 CTA 按鈕 |
| 3 | Feature Cards | 淺灰 | "Everything You Need on the Trail"、3 張主要功能卡片 |
| 4 | Coming Soon | 淺灰/白 | "More Tools on the Way"、4 張即將推出功能卡片 |
| 5 | Privacy | 深色 | "Built for Hikers Who Care About Privacy"、4 個隱私亮點 |
| 6 | CTA | 黃色漸層 | "Ready to Explore Your Data?"、兩個行動按鈕 |
| 7 | Footer | 深色 | Logo、說明文字、三欄連結、版權 |

---

## 元件拆分

```
app/
├── page.tsx                              # 組裝所有 Section（直接在此組合，不額外包裝）
└── components/
    └── landing/                          # Landing Page 專屬元件資料夾
        ├── LandingHeader.tsx             # 導航列
        ├── LandingHero.tsx               # Hero 區塊
        ├── LandingFeatureCards.tsx        # 主要功能卡片區
        ├── LandingComingSoon.tsx          # Coming Soon 卡片區
        ├── LandingPrivacy.tsx            # 隱私亮點區
        ├── LandingCTA.tsx                # 行動呼籲區
        └── LandingFooter.tsx             # 頁尾
```

每個 Section 元件接受 `className?: string` prop，方便 page.tsx 控制間距。

---

## 實作階段

### Phase 1：基礎結構 & Header

**目標：** 建立資料夾結構、Landing Page 骨架、Header

**檔案：**
- `app/components/landing/LandingHeader.tsx`（新增）
- `app/page.tsx`（改寫）

**色彩對應（所有色碼改用 Mantine 色彩）：**
| 設計稿色碼 | Mantine 對應 |
|---|---|
| `#D9B44A` (logo icon) | `var(--mantine-color-yellow-5)` (primary) |
| `#FCC419` (CTA 背景) | `Button` color="yellow" (primary) |
| `#1A1918` (logo 文字) | `var(--text-emphasis)` |
| `#6D6C6A` (導航文字) | `<Text>` 預設顏色（不加 `c` prop） |
| `#FFFFFF` (header 背景) | `var(--mantine-color-body)` |

**LandingHeader 結構：**
```
<header> (bg: var(--mantine-color-body), sticky top)
  <Container size="xl"> + flex justify-between items-center
    ├─ Logo: IconMountain (color=primary) + "TrailKit" (var(--text-emphasis))
    └─ Nav: flex items-center gap-8
         ├─ Tools (Mantine Menu trigger → dropdown)
         │    ├─ FIT File Viewer → /fit-file-viewer
         │    └─ Peaks Tracker  → /peaks
         ├─ About / Blog / Community (Text 連結)
         ├─ ThemeSwitch（復用 @/components/ThemeSwitch）
         └─ Get Started (Button color="yellow" radius="xl")
```

**RWD：**
- md 以上：Logo 左 + Nav 右（如設計稿）
- md 以下：隱藏導航文字連結，保留 Logo + ThemeSwitch + CTA

**Dark mode 注意：**
- Header 背景：`var(--mantine-color-body)`
- 導航文字：`<Text>` 預設顏色（自動支援 dark mode）
- Logo 文字：`var(--text-emphasis)`

---

### Phase 2：Hero 區塊

**目標：** 實作 Hero Section

**檔案：**
- `app/components/landing/LandingHero.tsx`

**Hero 細節：**
- 全寬區塊，高度約 620px
- 背景：先用深色漸層佔位（從深灰到透明，模擬山景氛圍）
- 上方小 Badge："Privacy-First Hiking Tools"（黃色圓角 badge）
- 主標題："Your Complete Hiking Toolkit" — Mantine `Title` order={1}，白色文字
- 副標題：描述文字，`<Text>` 半透明白色
- 兩個 CTA：
  - "Explore Tools" — Mantine `Button` color="yellow" size="lg"，帶箭頭 icon
  - "View Demo" — Mantine `Button` variant="outline" 白色邊框
- 佈局：垂直置中，`<Container>` 限制內容寬度

**Dark mode 注意：**
- Hero 區塊背景為深色漸層，文字為白色 → light/dark 下表現一致，不需特殊處理

---

### Phase 3：Feature Cards 區塊

**目標：** 實作 "Everything You Need on the Trail" 三張功能卡片

**檔案：**
- `app/components/landing/LandingFeatureCards.tsx`

**區塊結構：**
- Section 標題區：Badge（"CORE TOOLS"）+ Title + 副標題
- 三張卡片並排（RWD 時堆疊）：
  1. **Peaks Tracker** — Badge "Popular"
  2. **FIT File Viewer** — Badge "Core"
  3. **3D Trail Map** — Badge "Map"

**單張卡片結構：**
- 上方：圖片區（Mantine `Card.Section`，先用佔位色塊或 `var(--mantine-color-gray-2)`）
- 下方：Badge + 標題 + 描述 + 連結（帶箭頭 icon）
- 使用 Mantine `Card` 元件（自帶 border、radius、padding）

**佈局：** `<Container size="xl">` + Tailwind `grid grid-cols-1 md:grid-cols-3 gap-6`

**Dark mode 注意：**
- Section 背景：使用 `var(--mantine-color-gray-0)` light / `var(--mantine-color-dark-7)` dark → 透過 SCSS module + mantine.light/dark mixin
- Card 背景：Mantine Card 預設已支援 dark mode
- Card 內文字：使用 `<Text>` 和 `<Title>` 預設顏色
- Badge 文字/背景：使用 Mantine 色彩變數（如 `var(--mantine-color-yellow-5)`）
- 描述文字：`<Text c="dimmed">`
- 連結文字：使用 `var(--mantine-color-yellow-6)` 或 `var(--mantine-color-anchor)`

---

### Phase 4：Coming Soon 區塊

**目標：** 實作 "More Tools on the Way" 四張即將推出卡片

**檔案：**
- `app/components/landing/LandingComingSoon.tsx`

**區塊結構：**
- Section 標題區：Badge（"COMING SOON"）+ Title + 副標題
- 四張小卡片並排（RWD 時 2x2 或堆疊）：
  1. Trail Planner（路線 icon）
  2. Elevation Analyzer（圖表 icon）
  3. Weather Overlay（天氣 icon）
  4. GPX Converter（轉換 icon）

**單張卡片結構：**
- Icon（Tabler icon，黃色調）
- 標題（`<Text fw="bold">`）
- 簡短描述（`<Text c="dimmed" size="sm">`）
- 使用 Mantine `Card` 元件

**佈局：** `<Container size="xl">` + Tailwind `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`

**Dark mode 注意：**
- 同 Phase 3 的背景和卡片處理方式
- Icon 顏色使用 `var(--mantine-color-yellow-5)` 在兩個模式下都清晰

---

### Phase 5：Privacy 區塊

**目標：** 實作 "Built for Hikers Who Care About Privacy" 深色區塊

**檔案：**
- `app/components/landing/LandingPrivacy.tsx`

**區塊結構：**
- 深色背景區塊
- Badge（"WHY TRAILKIT"）+ Title + 副標題
- 四個亮點卡片並排：
  1. **100%** — Client-Side Processing
  2. **0 Bytes** — Uploaded to Server
  3. **No Account** — Required to Get Started
  4. **Open Source** — Free Forever

**單張卡片結構：**
- 大數字/文字（黃色或金色，強調色）
- 說明文字（灰色/淺色）
- 深色卡片背景，帶邊框

**Dark mode 注意：**
- 此區塊背景固定深色（`var(--mantine-color-dark-7)` 或 `var(--mantine-color-dark-8)`）
- 文字固定淺色 → light/dark 下表現一致
- 卡片使用深色背景 + 深色邊框，不隨 color scheme 變化
- 使用 SCSS module 或明確指定顏色，確保此區塊在 light mode 下也維持深色外觀

---

### Phase 6：CTA 區塊

**目標：** 實作 "Ready to Explore Your Data?" 行動呼籲區

**檔案：**
- `app/components/landing/LandingCTA.tsx`

**區塊結構：**
- 黃色漸層背景（金黃 → 深黃，底部帶山景剪影意象）
- 標題 + 副標題（白色文字）
- 兩個按鈕：
  - "Start Now — It's Free" — 白色按鈕（`variant="white"`），帶箭頭
  - "View on GitHub" — 白色邊框按鈕（`variant="outline"`），白色文字

**Dark mode 注意：**
- 此區塊背景固定為黃色漸層 → light/dark 下表現一致
- 文字固定白色

---

### Phase 7：Footer

**目標：** 實作 Landing Page 專屬頁尾

**檔案：**
- `app/components/landing/LandingFooter.tsx`

**區塊結構：**
- 深色背景
- 上半部：
  - 左側：TrailKit logo + 簡介文字
  - 右側三欄連結：Tools / Resources / Community
- 下半部：版權資訊 + 分隔線

**Dark mode 注意：**
- 同 Privacy 區塊，背景固定深色，文字固定淺色

---

### Phase 8：整合 & 收尾

**目標：** 在 page.tsx 組裝所有 Section，微調間距與 RWD

**工作內容：**
- 改寫 `app/page.tsx`，依序組合所有 Landing Section
- 不使用 AppLayout，直接渲染 LandingHeader → ... → LandingFooter
- 確認各區塊間距一致
- 測試 RWD 斷點（sm / md / lg）
- 測試 dark mode 切換是否正常（需保留 ThemeSwitch 或在 Header 加入）

---

## 通用開發原則

### Mantine 元件使用
- 排版容器：`Container`（限制最大寬度）、`Card`（功能卡片）、`Paper`（需要時）
- 文字：`Title`（標題）、`Text`（內文，利用預設 dark mode 支援）
- 按鈕：`Button`（CTA）、`Anchor`（連結）
- 間距/佈局 props：`p`, `gap`, `c`, `fw`, `size` 等

### Tailwind 使用
- Flex/Grid 排版：`flex`, `grid`, `grid-cols-*`, `gap-*`, `justify-*`, `items-*`
- RWD 斷點：`sm:`, `md:`, `lg:` 前綴
- 間距微調：`py-*`, `px-*`, `mt-*` 等
- 寬度限制：`max-w-*`

### Dark Mode 色彩策略
| 場景 | 做法 |
|------|------|
| 一般文字 | Mantine `<Text>` / `<Title>` 預設顏色（自動 dark mode） |
| 次要文字 | `<Text c="dimmed">` |
| 強調文字 | `var(--text-emphasis)` |
| 白色背景區塊 | `var(--mantine-color-body)` |
| 淺灰背景區塊 | SCSS module + `mantine.light` / `mantine.dark` mixin |
| 固定深色區塊（Privacy, Footer） | 明確指定深色背景，不隨 color scheme 變化 |
| 固定色彩區塊（CTA 黃色漸層） | 明確指定，不隨 color scheme 變化 |
| Icon 顏色 | `var(--mantine-color-yellow-5)` 或 Mantine color prop |

### 避免事項
- 不要硬編碼 `#FFFFFF` 作為背景 → 用 `var(--mantine-color-body)`
- 不要硬編碼文字顏色 → 用 Mantine Text 預設或 CSS 變數
- 不要在淺色背景上使用固定深色文字 → 確保 dark mode 下自動反轉

---

## 必遵規則

- **實作每個 Section 前，必須先使用 Pencil MCP 工具讀取 `landing-page.pen` 設計稿**（透過 `batch_get` 或 `get_screenshot` 取得對應區塊的設計細節），確保實作與設計稿一致。不可僅依賴本計劃文字描述進行實作。

---

## 驗證方式

1. **Build 檢查：** `yarn build` 確認無編譯錯誤
2. **Dev Server：** 啟動 dev server，瀏覽 `/` 路徑
3. **Dark Mode：** 透過 ThemeSwitch 或瀏覽器設定切換 light/dark，確認所有區塊顯示正常
4. **RWD：** 縮放視窗至 mobile / tablet / desktop 斷點，確認排版正確
5. **對照設計稿：** 使用 Pencil MCP `get_screenshot` 對照各區塊
