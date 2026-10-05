# Peaks Tracker

## 功能概述

台灣百岳追蹤器。使用者可勾選已完攀的山峰，查看進度統計，並在地圖上瀏覽各峰位置。

- **路由**：`/peaks`

---

## 關鍵檔案

### Pages
- `app/peaks/page.tsx` — 主頁面
- `app/peaks/layout.tsx` — 頁面 layout

### Components
`components/peaks/` 下所有元件：

| 元件 | 說明 |
|------|------|
| `PeaksMap.tsx` | Leaflet 地圖，顯示百岳位置 |
| `PeaksChecklist.tsx` | 百岳勾選清單（依群峰分組） |
| `PeaksProgressDialog.tsx` | 進度對話框，可分享完攀統計 |
| `PeakMarkersLayer.tsx` | 地圖上的單一山峰標記 layer |
| `PeakCategoryMarkersLayer.tsx` | 地圖上的群峰分類標記 layer |
| `PeaksProgress.tsx` | 進度顯示（總覽） |
| `PeaksProgressGrid.tsx` | 各群峰進度格狀顯示 |
| `PeaksSearchInput.tsx` | 山峰搜尋輸入框 |
| `PeaksActionBar.tsx` | 動作列（篩選、分享按鈕等） |
| `PeaksHeader.tsx` | 頁面頭部 |

其他共用元件：
- `components/BottomSheet/` — Mobile 底部抽屜（Peaks Tracker 在手機用此呈現側邊資訊）

### Store
- `store/peaks/peaksSlice.ts` — Slice 定義（已勾選山峰集合）
- `store/peaks/usePeaksStore.ts` — 使用 `createSelectors` 增強的 store

### Constants
- `constants/peaks.ts` — **台灣百岳完整資料**（19KB）：含所有山峰名稱、座標、所屬群峰
- `constants/hikingCompanions.ts` — 登山夥伴資料（8.7KB）
- `constants/hikerTitles.ts` — 登山者成就稱號（9.4KB）

### Lib
- `lib/peakGrouper.ts` — 依群峰分組山峰資料

---

## 版面模式

| 裝置 | 呈現方式 |
|------|---------|
| Mobile | 地圖全螢幕，清單 / 進度透過 `BottomSheet` 展開 |
| Desktop | 地圖 + 側邊清單面板並排 |

RWD 切換使用 `hooks/useScreen.ts` 偵測螢幕寬度。

---

## 注意事項

### 百岳資料
`constants/peaks.ts` 包含所有百岳的完整資料，**不要在其他地方重複定義山峰資料**。如需新增或修改山峰資訊，統一在此檔案修改。

### 地圖（Leaflet）
`PeaksMap` 為 client-only，須透過 `dynamic(() => ..., { ssr: false })` 載入。與 FIT File Viewer 的 `FitTrackMap` 同樣使用 Leaflet，但為獨立元件。
