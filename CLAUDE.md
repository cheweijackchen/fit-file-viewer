# CLAUDE.md — TrailKit

> 給 Claude Code 的專案說明文件。每次進入對話時自動載入。

---

## 專案概述

**TrailKit** 是一個隱私優先的登山工具平台，所有資料處理皆在瀏覽器端完成，不上傳任何個人資料。

- 前端目錄：`frontend/`
- 框架：Next.js 16 (App Router) + React 19
- 主分支：`master`
- 語系：`en-US`（預設）、`zh-TW`

### 功能列表

| 功能 | 路由 | 說明 |
|------|------|------|
| FIT File Viewer | `/fit-file-viewer` | 解析 Garmin FIT / GPX 檔案，顯示心率、海拔、GPS 軌跡 |
| Peaks Tracker | `/peaks` | 台灣百岳追蹤器，含地圖、清單、進度統計 |
| Trail Map | `/map` | MapLibre GL 向量地圖，含地形、衛星、GPX 上傳 |
| Hiking Trail Planner | `/hiking-trail-planner` | 多天登山行程規劃工具，含路網圖、步速估算、IndexedDB 本地儲存 |

### 功能文件

詳細的功能架構與注意事項請參閱 `docs/features/`：

- [FIT File Viewer](docs/features/fit-file-viewer.md)
- [Peaks Tracker](docs/features/peaks-tracker.md)
- [Trail Map](docs/features/trail-map.md)
- [Hiking Trail Planner](docs/features/hiking-trail-planner.md)

---

## 技術棧

| 類別 | 套件 / 版本 |
|------|-------------|
| 框架 | Next.js 16.1.1, React 19.2.3 |
| 語言 | TypeScript 5 (strict mode) |
| UI 元件 | Mantine 8.3.x (core, charts, dropzone, hooks 等) |
| 圖表 | Recharts 3 (透過 @mantine/charts) |
| 地圖 | Leaflet 1.9 + react-leaflet 5, MapLibre GL |
| 狀態管理 | Zustand 5.0.9 (搭配自製 createSelectors 工具) |
| 樣式 | Tailwind CSS 4 + SCSS (sass-embedded) + Mantine 主題 |
| 圖示 | @tabler/icons-react 3 |
| 國際化 | next-intl (en-US, zh-TW) |
| 建構工具 | Turbopack (Next.js 內建) |
| Linter | ESLint 9 (flat config) + @stylistic/eslint-plugin |
| 測試 | Vitest 4 + @testing-library/react |
| 工具 | clsx, dayjs 1.11, @dotenvx/dotenvx |

---

## 資料夾結構

```
fit-file-viewer/
├── frontend/                   # 前端應用程式根目錄
│   ├── messages/               # i18n 翻譯檔 (en-US.json, zh-TW.json)
│   ├── src/
│   │   ├── app/                # Next.js App Router (pages / layouts)
│   │   │   ├── components/     # App 層級 layout 元件 (AppHeader, AppFooter…)
│   │   │   ├── [locale]/       # 語系首頁 (landing page)
│   │   │   ├── fit-file-viewer/ # FIT File Viewer 頁面
│   │   │   ├── peaks/          # Peaks Tracker 頁面
│   │   │   ├── demo/           # 元件 demo 頁面
│   │   │   ├── styles/         # App 層級樣式
│   │   │   ├── layout.tsx      # Root layout
│   │   │   └── page.tsx        # Root → 重導至 locale 首頁
│   │   ├── components/         # 可複用 UI 元件 (跨頁面)
│   │   │   ├── peaks/          # Peaks Tracker 元件
│   │   │   ├── VectorMap/      # MapLibre GL 地圖元件
│   │   │   ├── ContourMap/     # 等高線地圖元件
│   │   │   └── Map/            # Leaflet 地圖元件
│   │   ├── constants/          # 全域常數
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # 工具函式 & 業務邏輯 (純函式，無副作用)
│   │   ├── model/              # TypeScript 型別定義
│   │   ├── store/              # Zustand store slices
│   │   │   ├── app/            # FIT File Viewer store
│   │   │   ├── peaks/          # Peaks Tracker store
│   │   │   ├── demo/           # Demo store
│   │   │   └── utils.ts        # createSelectors 工具
│   │   └── styles/             # 全域樣式 (globals.css, theme.ts, _mantine.scss)
│   ├── next.config.ts
│   ├── eslint.config.mjs
│   ├── postcss.config.mjs
│   ├── vitest.config.mts
│   └── package.json
├── docs/
│   ├── features/               # 功能別說明文件
│   └── plans/                  # 規劃文件
├── .devcontainer/
├── oconf                       # 多環境設定工具腳本
└── CLAUDE.md                   # 本文件
```

**大型元件使用子資料夾結構：**
```
components/
└── HeartRateTrendGraph/
    ├── index.tsx               # 公開匯出點
    └── components/             # 內部子元件
```

---

## 常用指令

> **所有指令必須在 Docker container 內執行**，不可在 host 直接執行。

透過以下方式在 container 內執行指令：
```bash
cd .devcontainer && docker compose exec nodejs bash -c "cd /application/frontend && <command>"
```
範例：
```bash
# 建構
cd .devcontainer && docker compose exec nodejs bash -c "cd /application/frontend && yarn build"
# 啟動 dev server 驗證 runtime（使用 CLAUDE_CODE_DEV_PORT）
cd .devcontainer && docker compose exec -d nodejs bash -c "cd /application/frontend && yarn next dev -p \$CLAUDE_CODE_DEV_PORT"
# 檢查頁面是否有錯誤
# 讀取 port（CLAUDE_CODE_DEV_PORT 定義在 .devcontainer/.env）
curl -s http://localhost:$CLAUDE_CODE_DEV_PORT/ | grep 'data-next-error-message'
# 停止 dev server
cd .devcontainer && docker compose exec nodejs bash -c "kill \$(pgrep -f 'next dev -p')"
# Lint
cd .devcontainer && docker compose exec nodejs bash -c "cd /application/frontend && yarn lint"
# 單元測試
cd .devcontainer && docker compose exec nodejs bash -c "cd /application/frontend && yarn test:unit"
# E2E 測試（使用 CLAUDE_CODE_DEV_PORT）
cd .devcontainer && docker compose exec nodejs bash -c "cd /application/frontend && PLAYWRIGHT_PORT=\$CLAUDE_CODE_DEV_PORT yarn test:e2e"
# 安裝套件（必須在 container 內執行，不可用 ./oconf yarn add 在 host 執行）
cd .devcontainer && docker compose exec nodejs bash -c "cd /application/frontend && yarn add <package>"
cd .devcontainer && docker compose exec nodejs bash -c "cd /application/frontend && yarn add -D <package>"
```

---

## 命名慣例

### 檔案命名
| 類型 | 慣例 | 範例 |
|------|------|------|
| React 元件 | PascalCase | `FitFileUploader.tsx`, `HeartRateDonutChart.tsx` |
| Hooks | camelCase，`use` 開頭 | `useFitDataStore.ts`, `useScreen.ts` |
| Store | `use[Name]Store.ts` | `useFitDataStore.ts` |
| 工具函式 | camelCase | `heartRateZoneAnalyzer.ts`, `converter.ts` |
| 型別定義 | camelCase | `fitParser.ts`, `heartRate.ts` |
| 常數 | camelCase | `fitData.ts`, `map.ts` |

### 程式碼命名
- **元件**：PascalCase function component (`export function ComponentName`)
- **Props 介面**：`interface Props { ... }` 定義在元件上方
- **事件 handler**：`handle[Action]` (e.g., `handleFitFile`)
- **Callback props**：`on[Event]` (e.g., `onFileDrop`, `onSuccess`)
- **Store setters**：`set[Property]` (e.g., `setFitData`, `setFileName`)
- **型別**：PascalCase，複雜型別用 `Type[Name]` 前綴 (e.g., `ParsedFit`)
- **Store 私有變數**：`_store` 下底線前綴

---

## 程式碼慣例與模式

### 元件結構
```typescript
// 1. Props 介面定義在最上面
interface Props {
  className?: string
  onSuccess?: () => void
}

// 2. Named export (非 default export，但 page.tsx 和 layout.tsx 需使用 default export 為少數例外。)
export function ComponentName({ className, onSuccess }: Props) {
  // 3. State
  const [state, setState] = useState(false)

  // 4. Store hooks
  const fitData = useFitDataStore.use.fitData()
  const { setFileName } = useFitDataActions()

  // 5. Handler 函式
  function handleAction() { }

  // 6. JSX return
  return (
    <MantineComponent>
      {/* ... */}
    </MantineComponent>
  )
}
```

### Component 拆分原則
- **每個 `.tsx` 檔案原則上只定義一個 React Component**
- 如需輔助元件，應建立子資料夾並拆成獨立檔案（參考 `HeartRateTrendGraph/components/` 模式）
- **例外**：不對外 export 且 < 20 行的純 UI 小型輔助 component，可與主 component 同檔存放

### Zustand Store 模式
```typescript
// Slice 定義
export interface FitDataSlice {
  fileName: string | undefined
  fitData: ParsedFit | undefined
  actions: {
    setFileName: (name: string) => void
    setFitData: (data: ParsedFit) => void
  }
}

// 使用 createSelectors 增強 store，支援 per-field 訂閱
export const useFitDataStore = createSelectors(useFitDataStoreBase)

// 元件內使用 (只訂閱需要的欄位，避免不必要 re-render)
const fitData = useFitDataStore.use.fitData()
const { setFitData } = useFitDataActions()
```

### Client-Only 元件
瀏覽器限定元件（Leaflet、MapLibre GL）需要 SSR disabled，使用 Next.js dynamic import：
```typescript
const Map = dynamic(() => import('@/components/Map'), { ssr: false })
```

---

## 注意事項

### 樣式系統

**排版原則：**
- 排版（flex, grid, spacing, RWD breakpoint）一律使用 **Tailwind utility class**，不使用 Mantine 的 `Flex`、`Stack`、`Group`
- 有底色或需要視覺分隔的區塊，使用 Mantine 的 `Card`、`Paper` 等容器元件

**樣式客製化優先順序（由高到低）：**
1. **Component-specific props**：優先使用元件本身提供的 props（`color`、`size`、`variant` 等）
2. **Tailwind CSS**：能覆蓋樣式時優先使用；若 specificity 低於 Mantine 預設樣式而無效，則跳過
3. **SCSS modules**：Tailwind 和 component props 都無法解決時，使用 SCSS modules，並透過元件的 `classNames` prop 注入
4. **避免** Mantine 的 `style` / `styles` prop；若不得不用且超過 3–4 個屬性，應抽成獨立的 `.module.scss` 樣式檔
5. **禁止硬編碼色碼於 JSX**（包含 hex、`rgb()`、`hsl()` 等）→ 一律改用 Tailwind class 或 Mantine CSS 變數（例：`className="text-(--mantine-color-dark-2) bg-white/7"`）

**主題變數：**
- 色彩與間距優先使用 Mantine CSS 變數 (`var(--mantine-color-xxx)`)
- Mantine SCSS 變數透過 `src/styles/_mantine.scss` 自動注入（可在 SCSS 中直接使用）

### 環境變數
- `FE_DEV_PORT`：開發伺服器 port
- `FE_SSR_PORT`：production 伺服器 port
- 使用 `@dotenvx/dotenvx` 管理

### 測試
- 測試檔命名：`*.vitest.test.ts` 或 `*.vitest.spec.tsx`
- 環境：jsdom (瀏覽器模擬)

### 匯出方式
- 優先使用 **named export**，避免 default export
- 子資料夾元件從 `index.tsx` 統一匯出

### 'use client' 指令
- 含有互動/狀態/瀏覽器 API 的元件必須加 `'use client'`
- 地圖元件（Leaflet、MapLibre GL）強制 client-only

### 頁面導航（Locale-aware）
專案設定 `localePrefix: 'always'`，所有 URL 都帶有 locale 前綴（如 `/en-US/hiking-trail-planner`）。

**使用 `@/i18n/navigation` 的 locale-aware 版本，不可使用 Next.js 原生版本：**
```typescript
// ✅ 正確
import { Link, useRouter, usePathname } from '@/i18n/navigation'

// ❌ 錯誤 — 不帶 locale，導致導航失效
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
```

路徑本身不需要加 locale 前綴，navigation 會自動加上當前 locale：
```typescript
router.push('/hiking-trail-planner')  // 自動產生 /en-US/hiking-trail-planner
```

---

## 型別路徑別名

```json
// tsconfig.json paths
"@/*" → "./src/*"
```

使用範例：`import { useFitDataStore } from '@/store/app/useFitDataStore'`

---

## Design Context

### Users
Trail enthusiasts of all levels — from casual weekend hikers to regular peak baggers, with a focus on Taiwan's hiking community (百岳 / 100 Peaks). Users review their hike data after returning from the trail, wanting to relive the experience and track their progress. Job to be done: make sense of hike data (heart rate, elevation, GPS tracks) in a way that feels personal and connected to the outdoors — not clinical or corporate.

### Brand Personality
**Three words: Warm. Adventurous. Trustworthy.**

TrailKit feels like a knowledgeable trail companion — welcoming enough for first-timers, capable enough for serious peak-baggers. References: Strava (data clarity and athlete focus) + AllTrails (earthy warmth, trail community feel).

Anti-pattern: cold, clinical dashboards that feel like medical software or enterprise SaaS. No sterile whites, no heavy blues, no density-for-density's-sake.

### Aesthetic Direction
- **Tone**: Earthy and organic in personality; precise and clear where data is displayed
- **Color system**: Yellow (sunlight, energy, Mantine primary) as the brand accent; warm neutrals (Mantine gray/dark) as the foundation
- **Photography / imagery**: Mountain landscapes on landing/marketing surfaces; inside the app, maps provide the visual "nature" element
- **Dark/light modes**: Both fully supported
- **Typography**: Inter (UI text) + Noto Sans TC (zh-TW) + JetBrains Mono (data values)
- **Icons**: Tabler Icons
- **References**: AllTrails (warmth, landing), Strava (data density in-app)

### Design Principles

1. **Outdoorsy soul, data clarity** — TrailKit is a data tool. Charts and stats dominate most screens. The "outdoorsy" personality lives in color palette, tone, and iconography — not in photography competing with data. Prioritize readability.
2. **Clarity under complexity** — Progressive disclosure: show the essential story first, let users dig into details on demand.
3. **Bilingual by default** — en-US and zh-TW are equally important. Never break layouts for longer Chinese text.
4. **Earthy precision** — Warm aesthetics on the surface; precise, reliable data underneath.

### Design System Constraints (Mantine 8.3.x)

**Colors** — Use Mantine tokens only, no raw hex:
- Primary accent: `--mantine-color-yellow-5`
- Surfaces: `--mantine-color-gray-*` (light) / `--mantine-color-dark-*` (dark)
- Semantic text: `--text-emphasis`, `--text-secondary`, `--text-subtitle`, `--text-muted`

**Spacing** — 4px base: `3xs`=4, `2xs`=8, `xs`=10, `sm`=12, `md`=16, `lg`=20, `xl`=24, `2xl`=28, `3xl`=32

**Font sizes** — `xs`=12, `sm`=14, `md`=16, `lg`=18, `xl`=20, `2xl`=24, `3xl`=30, `4xl`=36, `5xl`=48

**Border radius** — `xs`=2, `sm`=4, `md`=8 (default), `lg`=16, `xl`=32

**Available components** — 實作任何 UI 元素前，先查 [docs/mantine-components.md](docs/mantine-components.md) 確認是否有現成元件可用，優先使用 Mantine，不自製。例外：排版（flex、grid、spacing、RWD breakpoint）一律用 Tailwind，不用 Mantine 的 `Flex`、`Stack`、`Group`；文字樣式亦可用 Tailwind。

**Component defaults**: Card padding=`xl` + border; Paper radius=`md` + border; Button primary=`filled` color=`yellow`

> Full design system reference: [.impeccable.md](../.impeccable.md)
