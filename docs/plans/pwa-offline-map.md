# PWA 離線地圖設計筆記

## 背景

TrailKit 使用 MapLibre GL JS 渲染向量地圖。登山場景需要離線地圖支援，使用者往往在無訊號的山區才是最需要地圖的時候。

---

## 技術方案：PMTiles + OPFS

### 為什麼選向量圖磚

向量圖磚（MVT 格式）只儲存幾何資料，由 MapLibre 在本地渲染成圖像，體積遠小於柵格圖磚：

- 台灣全島向量圖磚：**約 150–300MB**（視最大 zoom level 而定）
- 同等柵格圖磚：數 GB

### PMTiles 格式

PMTiles 將一個區域的所有圖磚打包成單一檔案，透過 HTTP Range Request 按需讀取，也可完整下載後存在本地使用。

MapLibre GL JS 透過 `pmtiles` 套件支援 PMTiles 協定：

```typescript
import { Protocol } from 'pmtiles'

const p = new Protocol()
maplibregl.addProtocol('pmtiles', p.tile.bind(p))

map.addSource('base', {
  type: 'vector',
  url: 'pmtiles://https://cdn.example.com/taiwan.pmtiles',
})
```

### 完整離線包組成

光有圖磚資料不夠，向量圖磚需要搭配渲染資源才能顯示：

| 檔案 | 大小 | 說明 |
|------|------|------|
| `taiwan.pmtiles` | ~200MB | 向量幾何資料（路線、地名、地形） |
| Style JSON | ~50KB | 渲染規則（顏色、線寬、層級） |
| Glyphs（字體） | ~10MB | 標籤文字點陣字型 |
| Sprites | ~1MB | 地圖圖示 spritesheet |

Protomaps 的 [basemaps](https://github.com/protomaps/basemaps) 提供可自行 host 的 Style + Glyphs + Sprites 完整套件。

### 儲存機制：OPFS

**Origin Private File System (OPFS)** 是瀏覽器提供的沙箱檔案系統，支援大型二進位檔案的隨機存取：

- 容量通常為磁碟空間的 50%，200MB 完全沒問題
- 讀寫速度比 IndexedDB 快（支援 Range Read，符合 PMTiles 讀取模式）
- 瀏覽器支援：Chrome 86+、Safari 15.2+、Firefox 111+

```typescript
// 下載並存入 OPFS
const root = await navigator.storage.getDirectory()
const fileHandle = await root.getFileHandle('taiwan.pmtiles', { create: true })
const writable = await fileHandle.createWritable()
const response = await fetch('https://cdn.example.com/taiwan.pmtiles')
await response.body!.pipeTo(writable)

// 從 OPFS 建立 PMTiles source
import { FileSource, PMTiles } from 'pmtiles'
const file = await fileHandle.getFile()
const source = new FileSource(file)
const tiles = new PMTiles(source)
```

---

## 免費資料來源

| 資源 | 說明 |
|------|------|
| [Protomaps Build](https://app.protomaps.com/downloads/osm) | 可選台灣區域下載，完全免費 |
| [OpenFreeMap](https://openfreemap.org/) | 無需 API Key，OSM 向量圖磚 |
| [MapTiler](https://www.maptiler.com/) | 免費 75k 圖磚/月，支援 PMTiles 下載 |
| [NLSC 國土測繪中心](https://maps.nlsc.gov.tw/) | 台灣政府地形圖，含等高線，WMTS 協定，完全免費 |

從 planet 裁切台灣區域：

```bash
npx pmtiles extract \
  https://build.protomaps.com/20240101.pmtiles \
  taiwan.pmtiles \
  --bbox="119.9,21.8,122.1,25.4"
```

---

## UX 設計：下載介面方案比較

### 方案 A：預定義區域清單（推薦優先實作）

後端預先切好幾個區域的 PMTiles 檔案，UI 呈現為設定頁或 Modal 中的 Card 清單。

```
┌─────────────────────────────────────┐
│ 離線地圖下載                         │
├──────────────────────┬──────────────┤
│ 北台灣               │ 45MB  [下載] │
│ 中台灣               │ 60MB  [下載] │
│ 南台灣               │ 50MB  [下載] │
│ 東台灣               │ 40MB  [下載] │
└──────────────────────┴──────────────┘
```

- 優點：架構最簡單，CDN 靜態托管，不需即時 extract
- 缺點：無法自訂範圍，粒度固定
- 適合情境：台灣百岳，熱門路線集中在幾個山區

### 方案 B：地圖框選範圍

在地圖上疊一個可拖拉的矩形，即時顯示預估下載大小，確認後下載。

- 優點：彈性最高
- 缺點：需要額外的框選 UI 元件，複雜度高，需後端支援即時 extract 或前端計算 tile list
- 適合情境：進階使用者、不規則區域需求

### 方案 C：以路線為單位下載

選取一條路線，自動下載路線 buffer 範圍內的圖磚（例如路線左右各 5km）。

- 優點：最貼近登山使用情境（行前下載當天路線）
- 缺點：需要路線功能先完整，計算 buffer tile list 有一定複雜度
- 適合情境：Hiking Trail Planner 路線規劃功能成熟後疊加

---

## 建議實作順序

1. **方案 A**：實作預定義區域下載，驗證 OPFS 存取 + PMTiles FileSource 整合
2. **方案 C**：Hiking Trail Planner 路線功能穩定後，加入「下載此路線地圖」
3. **方案 B**：依需求決定是否實作

---

## 整體架構流程

```
使用者點「下載台灣北部地圖」
  ↓
fetch taiwan-north.pmtiles（含進度條）
  ↓
儲存到 OPFS
  ↓
MapLibre 切換 source 為 FileSource（讀 OPFS）
  ↓
完全離線渲染，無需網路請求
```
