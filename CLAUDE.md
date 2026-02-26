# CLAUDE.md — FIT File Viewer

> 給 Claude Code 的專案說明文件。每次進入對話時自動載入。

---

## 專案概述

**FIT File Viewer** 是一個完全在瀏覽器端解析 Garmin FIT 檔案的隱私優先運動數據視覺化工具。包含於地圖上顯示 FIT 和 GPX 軌跡的功能。

- 前端目錄：`frontend/`
- 目前框架：Next.js 16 (App Router) + React 19
- 主分支：`master`

---

## 技術棧

| 類別 | 套件 / 版本 |
|------|-------------|
| 框架 | Next.js 16.1.1, React 19.2.3 |
| 語言 | TypeScript 5 (strict mode) |
| UI 元件 | Mantine 8.3.x (core, charts, dropzone, hooks 等) |
| 圖表 | Recharts 3 (透過 @mantine/charts), Leaflet 1.9 + react-leaflet 5 |
| 狀態管理 | Zustand 5.0.9 (搭配自製 createSelectors 工具) |
| 樣式 | Tailwind CSS 4 + SCSS (sass-embedded) + Mantine 主題 |
| 圖示 | @tabler/icons-react 3 |
| 資料處理 | fit-file-parser 2.1, downsample 1.4, dayjs 1.11 |
| 建構工具 | Turbopack (Next.js 內建) |
| Linter | ESLint 9 (flat config) + @stylistic/eslint-plugin |
| 測試 | Vitest 4 + @testing-library/react |
| 工具 | clsx, @dotenvx/dotenvx |

---

## 資料夾結構

```
fit-file-viewer/
├── frontend/                   # 前端應用程式根目錄
│   ├── src/
│   │   ├── app/                # Next.js App Router (pages / layouts)
│   │   │   ├── components/     # App 層級 layout 元件 (AppHeader, AppFooter…)
│   │   │   ├── demo/           # 元件 demo 頁面
│   │   │   ├── styles/         # App 層級樣式
│   │   │   ├── layout.tsx      # Root layout
│   │   │   └── page.tsx        # Home page
│   │   ├── components/         # 可複用 UI 元件 (跨頁面)
│   │   ├── constants/          # 全域常數 (fitData, heartRate, map, units)
│   │   ├── hooks/              # Custom React hooks (useScreen, useFitDataSummary…)
│   │   ├── lib/                # 工具函式 & 業務邏輯 (純函式，無副作用)
│   │   ├── model/              # TypeScript 型別定義
│   │   ├── store/              # Zustand store slices
│   │   │   ├── app/            # 主 store (fitDataSlice, useFitDataStore)
│   │   │   ├── demo/           # Demo store
│   │   │   └── utils.ts        # createSelectors 工具
│   │   └── styles/             # 全域樣式 (globals.css, theme.ts, _mantine.scss)
│   ├── next.config.ts
│   ├── eslint.config.mjs
│   ├── postcss.config.mjs
│   ├── vitest.config.mts
│   └── package.json
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

> 所有指令在 `frontend/` 目錄下執行。

```bash
npm run dev         # 啟動開發伺服器 (port 由 $FE_DEV_PORT 控制)
npm run build       # 建構 production bundle
npm start           # 啟動 production 伺服器 (port 由 $FE_SSR_PORT 控制)
npm run lint        # 執行 ESLint 檢查
npm run test:unit   # 執行 Vitest 單元測試
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
Map 元件需要 SSR disabled，使用 Next.js dynamic import：
```typescript
const Map = dynamic(() => import('@/components/Map'), { ssr: false })
```

### 型別修正模式
第三方套件 (`fit-file-parser`) 的型別錯誤使用 `Omit` + 重新定義修正：
```typescript
// model/fitParser.ts
export type ParsedRecord = Omit<OriginalRecord, 'timestamp'> & { timestamp: Date }
```

---

## ESLint 規則摘要

- **分號**：不使用 (`@stylistic/semi: never`)
- **引號**：單引號 (`quotes: single`)
- **大括號**：所有控制語句必須有 (`curly: all`)
- **Type imports**：必須使用 `import type` 的 inline style
  ```typescript
  import { type ParsedFit, doSomething } from './fitParser'
  ```
- **Import 排序**：index → builtin → external → internal → sibling/parent (字母升冪)
- **JSX Props 排序**：shorthand first，callbacks last，key/ref 保留優先
- **不使用的變數**：error (`@typescript-eslint/no-unused-vars`)
- **物件大括號間距**：必須有空格 (`{ key: value }`)

---

## 注意事項

### FIT 檔案解析
- 所有解析在 **客戶端** 完成，絕對不要改成 server-side 處理
- `fit-file-parser` v2.1.0 的 `timestamp` 型別不正確，已在 `model/fitParser.ts` 修正
- 大型 FIT 檔需用 `downsample` 函式庫降採樣再傳給圖表

### 樣式系統

**排版原則：**
- 排版（flex, grid, spacing, RWD breakpoint）一律使用 **Tailwind utility class**，不使用 Mantine 的 `Flex`、`Stack`、`Group`
- 有底色或需要視覺分隔的區塊，使用 Mantine 的 `Card`、`Paper` 等容器元件

**樣式客製化優先順序（由高到低）：**
1. **Component-specific props**：優先使用元件本身提供的 props（`color`、`size`、`variant` 等）
2. **Tailwind CSS**：能覆蓋樣式時優先使用；若 specificity 低於 Mantine 預設樣式而無效，則跳過
3. **SCSS modules**：Tailwind 和 component props 都無法解決時，使用 SCSS modules，並透過元件的 `classNames` prop 注入
4. **避免** Mantine 的 `style` / `styles` prop；若不得不用且超過 3–4 個屬性，應抽成獨立的 `.module.scss` 樣式檔

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
- Map 相關元件因為 Leaflet 強制 client-only

---

## 型別路徑別名

```json
// tsconfig.json paths
"@/*" → "./src/*"
```

使用範例：`import { useFitDataStore } from '@/store/app/useFitDataStore'`
