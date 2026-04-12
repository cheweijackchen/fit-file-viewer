# Hiking Trail Design Map

- 設計檔: `design/pages/hiking-trail.pen`
- 最後更新: 2026-04-12

---

## 功能概覽

Trail Planner 讓使用者規劃多日登山行程。首頁（Landing）讓用戶開始或繼續行程；Trail Selection 選擇路線並預覽合併地圖；Main 畫面分為左側欄（行程管理）、Trail Graph 路線圖、Day Builder 逐步建構當天路線。

---

## Frames

| Frame 名稱               | 描述                                         |
|--------------------------|----------------------------------------------|
| Landing — Empty          | 空白首頁：tagline、Start New Trip CTA、三個功能亮點 |
| Landing — Has Trips      | 已有行程首頁：左側行程列表 + 右側行程預覽        |
| Trail Selection          | 路線多選 + 即時合併 Trail Graph 預覽            |
| Main — Graph Expanded    | 主規劃畫面，Trail Graph 展開（預設）            |
| Main — Graph Collapsed   | 主規劃畫面，Trail Graph 收合為細條             |
| E-01 Strip Variants      | TODAY'S ROUTE 時間條四種時長狀態示意            |

---

## 區塊地圖

### Landing — Empty

**頂部導覽** (`nav`)

| 你會說...       | Node Name  | 說明                    |
|----------------|------------|-------------------------|
| 導覽列整體      | `nav`      | 64px 頂部列              |
| Logo 區         | `navLeft`  | TrailKit logo + icon     |
| 右側按鈕區      | `navRight` | "+ New Trip" 按鈕        |

**主要內容** (`hero`)

| 你會說...         | Node Name    | 說明                           |
|------------------|--------------|--------------------------------|
| 主標題            | (text in `hero`) | "Plan Your Mountain Journey" |
| 副標題            | (text in `hero`) | 兩行說明文字                  |
| CTA 按鈕列        | `ctaRow`     | "Start New Trip" 按鈕容器      |
| 功能亮點區        | `featureRow` | 三個 feature highlight 橫排    |

---

### Landing — Has Trips

**頂部導覽** (`nav2`)

| 你會說...   | Node Name | 說明        |
|------------|-----------|-------------|
| 導覽列整體  | `nav2`    | 64px 頂部列  |

**左欄 — 行程列表** (`leftCol`)

| 你會說...                    | Node Name                        | 說明                           |
|-----------------------------|----------------------------------|--------------------------------|
| 左欄整體                     | `leftCol`                        | 420px 寬                       |
| 標題區（Your Trips）          | `leftTop`                        | "Your Trips" + 件數小字        |
| 行程列表容器                  | `tripList`                       | 所有行程項目的容器              |
| 第 N 個行程項目               | `tr1` / `tr2` / `tr3`            | 含名稱列 + meta 列             |
| 行程名稱列                   | `tr1top` / `tr2top` / `tr3top`   | 名稱 + Edit 按鈕               |
| 行程 meta（路線/天數/日期）    | `tr1meta` / ...                  | 小字說明                        |
| 新增行程按鈕                  | `newTripBtn`                     | "+ New Trip" 文字按鈕          |

**右欄 — 行程預覽** (`rightCol`)

| 你會說...                          | Node Name        | 說明                              |
|------------------------------------|------------------|-----------------------------------|
| 右欄整體                           | `rightCol`       | padding 40px                      |
| 預覽卡片整體                        | `previewCard`    | 圓角卡片                          |
| 預覽標題列（行程名 + badge）         | `previewHdr`     | 行程名稱 + 狀態 badge（天數）      |
| "ROUTE PREVIEW" 標籤               | (text in `previewCard`) | 全大寫區塊標籤             |
| 預覽主體容器                        | `graphPreview`   | 含 summaryRow + 行程預覽表        |
| 時間摘要列（總時間 / 加權時間）       | `summaryRow`     | 兩個並排卡片：總時間 + ×0.9 時間  |
| 總時間卡                            | `card1`          | 顯示 XXh XXm 原始總時間           |
| 加權時間卡                          | `card2`          | 顯示 × 0.9 後的時間               |
| 行程預覽表（trip preview table）    | `tbl`            | 含 header + 各 Day 行（r1-r8）    |
| 表格 header 列                     | `hdr` (in tbl)   | # / 路線 / 行走時間 / 加權時間    |
| 各 Day 列                          | `r1`–`r8` (in tbl) | 每天：Day N + 路線 + 兩欄時間   |

---

### Trail Selection

**頂部導覽** (`tsNav`)

| 你會說...    | Node Name    | 說明              |
|-------------|--------------|-------------------|
| 導覽列整體   | `tsNav`      | 64px 頂部列        |
| 左側 logo   | `tsNavLeft`  | TrailKit logo      |
| 右側返回     | `tsNavRight` | "← Back" 按鈕      |

**左欄 — 路線選擇** (`tsLeft`)

| 你會說...              | Node Name          | 說明                                       |
|-----------------------|--------------------|--------------------------------------------|
| 左欄整體               | `tsLeft`           | 380px 寬                                   |
| 標題區                 | `tsLeftHdr`        | "Select Routes" 標題 + 說明文字            |
| 搜尋欄                 | `searchBox`        | 含 `searchInner`（icon + placeholder）     |
| 路線列表容器            | `routeList`        | 所有路線項目的容器                          |
| 第 N 條路線列           | `r1`–`r5`          | checkbox + 路線名稱 + node 數 / km         |
| 路線 checkbox（選中）   | `chk1`             | 填滿樣式，表示已選                          |
| 路線 checkbox（未選）   | `chk2`–`chk5`      | 空心邊框                                   |
| 路線資訊區              | `r1info`–`r5info`  | 路線名稱 + 節點數 / 公里數                  |
| 底部確認列              | `tsBottom`         | "N routes selected" + "Start Planning"    |
| Start Planning 按鈕    | `startBtn`         | 主要 CTA 按鈕                              |

**右欄 — 路線預覽** (`tsRight`)

| 你會說...              | Node Name            | 說明                                       |
|-----------------------|----------------------|--------------------------------------------|
| 右欄整體               | `tsRight`            | padding 28px                               |
| 預覽卡片整體            | `previewArea`        | 圓角卡片，含所有預覽內容                    |
| 路線 badge + 副標題    | `routeHeader`        | 路線 chip 列（`routeChips`）+ 起終點文字   |
| 路線 chip 列           | `routeChips`         | 顯示已選路線的 badge 群                     |
| 時間統計列             | `routeStats`         | 原始時間 + 分隔線 + 加權時間               |
| 原始時間               | `statRaw`            | 顯示 XXh XXm 原始總時間                     |
| 加權時間               | `statWeighted`       | 顯示 × 0.9 加權時間                         |
| Trail Graph 預覽區     | `trailGraphSection`  | "TRAIL GRAPH PREVIEW" 標籤 + 節點 chip 列  |
| 節點 chip 列           | `gp1`                | 節點 chip 橫排（依類型以不同樣式區分）      |

---

### Main — Graph Expanded

**頂部導覽** (`mNav`)

| 你會說...       | Node Name    | 說明                         |
|----------------|--------------|------------------------------|
| 導覽列整體      | `mNav`       | 56px 頂部列                   |
| 左側 logo 區    | `mNavL`      | "Trail Planner" logo          |
| 右側行程 badge  | `mNavBadge`  | 顯示行程名稱（例：南二段規劃）  |

**左側欄** (`mSidebar`, 240px 寬)

| 你會說...                  | Node Name                       | 說明                          |
|---------------------------|---------------------------------|-------------------------------|
| 側欄整體                   | `mSidebar`                      | 240px 寬                      |
| 側欄頂部（行程名 + 路線）   | `mSbHdr`                        | 含 `mSbTitle` + `routeMgmt`   |
| 行程名稱列                 | `mSbTitle`                      | 行程名稱文字 + 收合按鈕        |
| 側欄收合按鈕               | `collapseBtn` (in `mSbTitle`)   | 收合側欄的按鈕                 |
| 路線管理列                 | `routeMgmt`                     | 路線 chip + "+ Add Route" 按鈕 |
| 路線 chip                  | `routeChip`                     | 已選路線的 chip                |
| 新增路線按鈕               | `addRouteBtn`                   | 空心 chip "+ Add Route"        |
| PACE 控制列                | `paceRow`                       | "PACE" 標籤 + 數值調整控制     |
| PACE 調整器                | `paceCtrl`                      | "-" + "× 0.9" + "+" 按鈕組    |
| 減少 PACE 按鈕             | `minusBtn`                      | 圓形 "-" 按鈕                  |
| 增加 PACE 按鈕             | `plusBtn`                       | 圓形 "+" 按鈕                  |
| DAYS 列表容器              | `dayListArea`                   | 所有 Day 項目 + Add Day 按鈕   |
| Day 1 列（已完成）         | `day1row`                       | 勾選圖示 + "Day 1"             |
| Day 2 列（已完成）         | `day2row`                       | 勾選圖示 + "Day 2"             |
| Day 3 列（編輯中）         | `day3row`                       | 圓點圖示 + "Day 3"，強調樣式   |
| Day 4 列（空白）           | `day4row`                       | 空心圓 + "Day 4"，次要樣式     |
| 新增 Day 按鈕              | `addDayBtn`                     | "+ Add Day" 文字列             |

**Day 列項目狀態**

| 狀態         | 視覺                    | Node                      |
|-------------|------------------------|---------------------------|
| 已完成       | 勾選圖示                | `day1row` / `day2row`     |
| 目前編輯中   | 強調樣式 + 圓點圖示     | `day3row`                 |
| 空白未編輯   | 次要樣式 + 空心圓       | `day4row`                 |

**右側主區 — Trail Graph** (`graphPanel`)

| 你會說...             | Node Name      | 說明                                      |
|----------------------|----------------|-------------------------------------------|
| Trail Graph 面板整體  | `graphPanel`   | 圓角卡片，高 300px                         |
| Graph 標題列          | `gpHdr`        | "Trail Graph" + "Collapse" 按鈕           |
| Collapse 按鈕         | `collapseG`    | 收合 Trail Graph 的按鈕                    |
| 色碼圖例              | `gpLegend`     | 節點類型樣式說明（lgA–lgE）                |
| 第一排節點            | `gpR1`         | 主路節點 chip 橫排（gn1–gn6）              |
| 第二排節點            | `gpR2`         | 支路節點 chip 橫排（gn2a–gn2e）            |
| 節點 chip（一般）     | `gn1`–`gn6` 等 | 依類型以不同樣式呈現的節點 chip            |
| 當前路線高亮節點      | 強調樣式 chip（帶框線）| 例：`gn5`（目前所在節點）          |

**右側主區 — Day Builder** (`dayBuilder`)

| 你會說...               | Node Name                    | 說明                                       |
|------------------------|------------------------------|--------------------------------------------|
| Day Builder 面板整體    | `dayBuilder`                 | 圓角卡片，填滿剩餘高度                      |
| Day Builder 標題        | `dbHdr`                      | "Build Trail — Day N" 標題列               |
| Starting Point 整體列  | `startRow`                   | 標籤 + 下拉選單                             |
| Starting Point 下拉     | `dropdown`                   | 顯示目前起點節點名稱的下拉選單              |
| TODAY'S ROUTE 時間條    | `routeSummary`               | 節點路徑條 + 右側時間（E-01 元件）          |
| 路徑節點列             | `pathRow` (in `routeSummary`) | 已走節點 chip 橫排（帶箭頭）               |
| 右側原始時間            | (text in `rightMain`)        | 粗體大字，依時長等級有不同樣式              |
| 右側加權時間            | (text in `rightMain`)        | 次要小字 "× 0.9 = Xh XXm"                 |
| CURRENT NODE 卡片       | `curCard`                    | 強調大卡，顯示當前節點名稱 + 類型 badge     |
| 節點類型 badge          | `forkBadge`                  | 顯示 "fork" / "peak" / "hut" 等            |
| 兩欄選項區              | `b2TwoCol`                   | 左（往回走）+ 右（繼續走）並排             |
| 往回走欄                | `b2Left`                     | 標籤 + 前一節點卡（淡化樣式）              |
| 往回走標籤              | `b2LeftLabel`                | "← 往回走"                                 |
| 往回走節點卡            | `b2BackCard`                 | 淡化樣式 (opacity 0.8)，節點名稱 + 類型·時間 |
| 繼續走欄                | `b2Right`                    | 標籤 + 可選節點卡列表                      |
| 繼續走標籤              | `b2RightLabel`               | "繼續走 →"                                 |
| 繼續走節點卡（第 1 個）  | `b2Fwd1`                     | 主要樣式（帶框線），節點名稱 + 類型·時間    |
| 繼續走節點卡（第 2 個）  | `b2Fwd2`                     | 主要樣式（帶框線），節點名稱 + 類型·時間    |
| Undo 列                 | `undoRow`                    | "↩ Undo last step" 文字連結                |
| 完成路線按鈕            | `finishBtn`                  | 44px 主要按鈕                              |

---

### Main — Graph Collapsed

與 Main — Graph Expanded 結構相同，差異如下：

| 你會說...          | 差異                                           |
|-------------------|------------------------------------------------|
| Trail Graph 面板   | 收合為細條（顯示路線名稱 + "Expand" 按鈕）     |
| Day Builder 面板   | 填滿 Trail Graph 原本佔用的高度               |

節點命名沿用 Main — Graph Expanded 的所有名稱。

---

### E-01 Strip Variants

此 Frame 展示 `routeSummary`（TODAY'S ROUTE 時間條）在四種行程時長下的視覺狀態。

**圖例** (`legend`)

| 狀態名稱    | 時長區間 | 時間數字顏色 |
|-----------|---------|------------|
| Easy      | < 5h    | 深綠        |
| Normal    | 5–7h    | 暗黃        |
| Long      | 7–9h    | 橙色        |
| Exhausting| > 9h    | 紅色        |

**四個狀態 strip**

| 你會說...           | Node Name          | 說明        |
|--------------------|--------------------|-------------|
| Easy 狀態條         | `strip-easy`       | < 5h 的示意 |
| Normal 狀態條       | `strip-normal`     | 5–7h 的示意 |
| Long 狀態條         | `strip-long`       | 7–9h 的示意 |
| Exhausting 狀態條   | `strip-exhausting` | > 9h 的示意 |

每個 strip 內部結構（以 strip-easy 為例）：

| 你會說...      | Node Name    | 說明                                |
|--------------|--------------|-------------------------------------|
| 左側節點路徑  | `leftCol1`   | "TODAY'S ROUTE" 標籤 + 節點 chip 列 |
| 右側時間欄    | `rightCol1`  | 原始時間（大字）+ 加權時間（小字）   |

---

## 通用元件

| 你會說...           | Node Name      | 出現位置                             |
|--------------------|----------------|--------------------------------------|
| TODAY'S ROUTE 條    | `routeSummary` | Day Builder 內、E-01 Strip Variants  |
| Starting Point 下拉 | `dropdown`     | Day Builder `startRow`               |
| Pace 調整控制       | `paceCtrl`     | 左側欄 `paceRow`                     |
| 完成路線按鈕        | `finishBtn`    | Day Builder 底部                     |
