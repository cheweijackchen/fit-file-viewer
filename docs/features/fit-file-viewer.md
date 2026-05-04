# FIT File Viewer

## 功能概述

解析 Garmin FIT 與 GPX 檔案，在瀏覽器端顯示心率區間、海拔曲線、GPS 軌跡地圖與詳細記錄。所有解析皆在客戶端完成，不上傳任何資料。

- **路由**：`/fit-file-viewer`

---

## 關鍵檔案

### Pages
- `app/fit-file-viewer/page.tsx` — 主頁面
- `app/fit-file-viewer/layout.tsx` — 頁面 layout
- `app/fit-file-viewer/components/Banner.tsx` — 說明橫幅
- `app/fit-file-viewer/components/SummarySection.tsx` — 活動摘要區塊

### Components
- `components/FitFileUploader.tsx` — FIT 檔案拖放上傳
- `components/GpxFileUploader.tsx` — GPX 檔案上傳
- `components/FitTrackMap/FitTrackMap.tsx` — Leaflet 軌跡地圖（含距離標記）
- `components/HeartRateZoneCard.tsx` — 心率區間甜甜圈圖
- `components/HeartRateTrendGraph/` — 心率時間序列折線圖
- `components/AltitudeTrendCard/` — 海拔曲線圖
- `components/RecordsCard/` — 可搜尋的記錄資料表

### Store
- `store/app/fitDataSlice.ts` — Slice 定義（`fileName`, `fitData`）
- `store/app/useFitDataStore.ts` — 使用 `createSelectors` 增強的 store

### Models
- `model/fitParser.ts` — `fit-file-parser` 型別修正（見下方注意事項）
- `model/heartRate.ts` — 心率相關型別
- `model/map.ts` — 地圖資料型別

### Constants
- `constants/fitData.ts` — FIT 資料常數
- `constants/heartRate.ts` — 心率區間定義

### Hooks
- `hooks/useFitDataSummary.ts` — 計算活動摘要統計
- `hooks/useGpxParser.ts` — 解析 GPX 檔案
- `hooks/useTrackFitBounds.ts` — 由軌跡計算地圖邊界

### Lib
- `lib/fitDataFormatter.ts` — 格式化 FIT 資料供顯示用
- `lib/heartRateZoneAnalyzer.ts` — 分析心率區間分佈
- `lib/elevationUtils.ts` — 海拔計算工具
- `lib/converter.ts` — 單位換算

---

## 注意事項

### 客戶端解析（重要）
- 所有解析在**客戶端**完成，絕對不要改成 server-side 處理
- 這是產品的核心隱私承諾，不可妥協

### `fit-file-parser` 型別修正
`fit-file-parser` v2.1.0 的 `timestamp` 欄位型別宣告為 `string`，實際回傳 `Date`。已在 `model/fitParser.ts` 以 `Omit` + 重新定義的方式修正：

```typescript
// model/fitParser.ts
export type ParsedRecord = Omit<OriginalRecord, 'timestamp'> & { timestamp: Date }
```

新增或修改與 `fit-file-parser` 型別相關的程式碼時，優先參考 `model/fitParser.ts` 的現有修正模式。

### 大型檔案降採樣
大型 FIT 檔（記錄點過多）需先以 `downsample` 函式庫降採樣，再傳給圖表元件，避免渲染效能問題。

### 地圖（Leaflet）
- `FitTrackMap` 為 client-only，須透過 `dynamic(() => ..., { ssr: false })` 載入
- 詳見 [Trail Map](trail-map.md) 了解 Leaflet 與 MapLibre GL 的差異
