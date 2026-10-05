# Trail Map

## 功能概述

基於 MapLibre GL 的向量地圖，支援地形切換、衛星影像、等高線顯示，以及 GPX/FIT 軌跡的動態播放。

- **路由（目前為 demo）**：
  - `/demo/demo-vector-map` — 向量地圖 + 地形 + 軌跡播放
  - `/demo/demo-contour-map` — 等高線地圖

---

## 關鍵檔案

### Components

`components/VectorMap/`（共 16 個檔案）：

| 元件 | 說明 |
|------|------|
| `MapView.tsx` | MapLibre GL 主地圖容器 |
| `TrackLayer.tsx` | 軌跡線條 layer |
| `WaypointsLayer.tsx` | 航點標記 layer |
| `PlaybackBar.tsx` | 軌跡播放控制列 |
| `TerrainToggle.tsx` | 地形 3D 開關 |
| `MapOptionsPanel.tsx` | 地圖選項面板 |
| `MapControlPanel.tsx` | 地圖控制按鈕 |

`components/ContourMap/` — 等高線地圖元件

### Constants
- `constants/vectorMap.ts` — MapLibre GL 地圖設定（tile sources、layer 樣式等）
- `constants/map.ts` — 共用地圖常數（也供 Leaflet 使用）

### Lib
- `lib/baseMap.ts` — 底圖 tile / layer 設定
- `lib/geoUtils.ts` — 地理計算工具
- `lib/gpxToGeoJson.ts` — GPX 轉 GeoJSON（供 MapLibre GL layer 使用）

### Hooks
- `hooks/useTrackPlayback.ts` — 軌跡動畫播放邏輯
- `hooks/useMapInstance.ts` — MapLibre GL map instance 管理

---

## 注意事項

### Client-Only（重要）
MapLibre GL 僅能在瀏覽器執行。所有 `VectorMap` 與 `ContourMap` 元件：
- 必須加 `'use client'` 指令，**或**
- 透過 `dynamic(() => ..., { ssr: false })` 在父層載入

### 兩套地圖系統
專案中存在兩套完全獨立的地圖系統，**不要混用**：

| 系統 | 套件 | 用於 |
|------|------|------|
| Leaflet | `leaflet` + `react-leaflet` | FIT File Viewer (`FitTrackMap`)、Peaks Tracker (`PeaksMap`) |
| MapLibre GL | `maplibre-gl` | Trail Map (`VectorMap`、`ContourMap`) |

兩者的 API、元件結構、layer 管理方式完全不同，修改時請確認操作的是哪個系統。
