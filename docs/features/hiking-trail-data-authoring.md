# 步程示意圖 → 路線資料檔 整理規則

> 本文件定義如何把一張登山「步程示意圖」整理成 `frontend/src/constants/hiking-trails/*.ts` 的 `Trail` 資料。
> 目標是讓任何人（或 agent）拿到一張新圖，就能產出與既有資料格式一致的檔案。
> 既有三份資料（南二段、北一段、玉山群峰）已於 2026-10-02 依本規則與圖片重新校正；文中「舊例」指校正前的寫法，僅供理解規則演變。校正時的待辦與判斷見文末附錄。

---

## TODO

- **重裝／輕裝雙時間機制尚未設計**。目前 `TrailEdge` 只有一個 `minutes`，圖上同時標兩種負重時間時只能取其一（規則見第 7 節）。

---

## 1. 資料來源與型別

- **圖片來源**：上河文化《高山百岳地形圖》步程示意圖（G02 玉山群峰、G07 北一段、G17 南二段 等）
  - 檔案放在專案根目錄 `.local/`（已 gitignore，不進版控）
  - 圖上註明「所載步程時間僅供參考」，資料檔沿用圖上數字，不自行估算
- **型別定義**
  - `Trail`、`TrailNode`、`TrailEdge`：`frontend/src/model/hikingTrail.ts`
  - `TrailNodeType`：`frontend/src/constants/hiking-trails/hikingTrail.ts`，允許值 `peak` / `hut` / `camp` / `water-source` / `fork` / `other`
- **欄位總覽**（「實務」欄為本文件要求，可能比型別嚴格）

| 層級 | 欄位 | 型別 | 實務 | 說明 |
|---|---|---|---|---|
| Trail | `id` | 必填 | 必填 | 第 3 節 Trail id |
| Trail | `name` | 必填 | 必填 | `MountainCategory` 的中文值（例：`北一段`），不是圖片標題 |
| Trail | `nameEn` | 選填 | 必填 | 英文慣用名（例：`North First Section`、`Yushan Group`） |
| Trail | `i18nKey` | 必填 | 必填 | `<trail-id>.<trail-id>` |
| TrailNode | `id` | 必填 | 必填 | 第 3 節 Node id |
| TrailNode | `name` | 必填 | 必填 | 第 5 節 |
| TrailNode | `nameEn` | 選填 | 選填 | 不填 |
| TrailNode | `i18nKey` | 必填 | 必填 | 第 4 節 |
| TrailNode | `nodeType` | 選填 | 必填 | 第 6 節 |
| TrailEdge | `from` / `to` | 必填 | 必填 | node id |
| TrailEdge | `minutes` | 必填 | 必填 | 該方向步行分鐘數 |
| TrailEdge | `distance` | 選填 | 不填 | 目前無資料使用 |
| TrailEdge | `note` | 選填 | 條件式 | 第 7 節的特殊情況才填 |

---

## 2. 哪些圖上元素要變成節點

- **建節點的唯一判準：膠囊形地名框**（綠底、橘底、紅框三種），不論它是否畫在公路線上
  - 例：G07 思源埡口畫在 7甲 公路線上，仍是綠框 → 建節點
- **車行節點不建**：膠囊框旁有汽車 icon、或框與框之間以紅色公路線（而非黑色雙箭頭）相連的那一側
  - 例：G02 水里、和社、阿里山、塔塔加遊客中心
  - 車行節點與步道節點之間若有汽車 icon 的分鐘數，不建邊
- **以下都不是節點**
  - 方向註記文字：「往宜蘭」「往梨山」「往天池」
  - 公路旁的步行註記（例：G07「4K 步行約 90 分」）：不建邊，完成回報時列出，由使用者決定是否補
  - 設施 icon：直昇機停機坪
  - 公路路牌（7甲、台20、台21）
  - 接續其他圖的灰色箭頭：「接馬博橫貫」「往秀姑巒山」「接新康山列」
    - 箭頭所指路線之後若另建資料，由那條路線負責建節點
    - 本路線最多在邊界節點加 `note` 註明接續方向

---

## 3. ID 規則

### Trail id（`<trail-id>`）

- **以 `MountainCategory` 的 key 為準**（`frontend/src/constants/peaks.ts`），PascalCase 轉 kebab-case
- **「X段」類加 `-section`**，數字改為英文序數詞
- **key 內含數字者保留數字**
- **圖上路線不在 `MountainCategory` 內時，先新增類別再建資料**

| MountainCategory key | 中文 | trail-id |
|---|---|---|
| `YushanGroup` | 玉山群峰 | `yushan-group` |
| `XueshanGroup` | 雪山群峰 | `xueshan-group` |
| `Wuling4` | 武陵四秀 | `wuling-4` |
| `DabaGroup` | 大霸尖山群 | `daba-group` |
| `HehuanGroup` | 合歡群峰 | `hehuan-group` |
| `QilaiGroup` | 奇萊群峰 | `qilai-group` |
| `NenggaoGroup` | 能高安東軍 | `nenggao-group` |
| `North1` | 北一段 | `north-first-section` |
| `North2` | 北二段 | `north-second-section` |
| `South1` | 南一段 | `south-first-section` |
| `South2` | 南二段 | `south-second-section` |
| `South3` | 南三段 | `south-third-section` |
| `Zhongheng4Spicy` | 中橫四辣 | `zhongheng-4-spicy` |
| `Nanheng3` | 南橫三星 | `nanheng-3` |
| `MaboTraverse` | 馬博橫斷 | `mabo-traverse` |
| `XinkangTraverse` | 新康橫斷 | `xinkang-traverse` |
| `GanzhuowanGroup` | 干卓萬群峰 | `ganzhuowan-group` |
| `Other` | 其他 | 不適用 |

### Node id

格式 `<prefix>_<slug>`，slug 為小寫 kebab-case。

**prefix 三選一，依序判斷**

1. **`mountain_`**：名稱以「山」「峰」結尾，或是某山的三角點（例：`mountain_duojiatun-mountain-survey-point`）
2. **`<trail-id>_`**：預設值（例：`south-second-section_banaiyike-hut`）。以路線為 prefix 的節點連結最不易出錯
3. **`global_`**：只用於**真正跨圖重合**的節點
   - 條件：該實體地點已存在於另一條路線的資料檔，且兩張圖對它前後的連接方式一致
   - 例：東埔溫泉、雲龍瀑布、樂樂山屋、觀高坪、觀高登山服務站同時出現在 G02 與 G17
   - **共用路段被簡化時必須詢問，不得自行決定**：某張圖把另一張圖已有的路段畫得較簡略（例：G17 直接畫「八通關登山口 → 雲龍瀑布 120 分」，G02 中間還有三聖宮、樂樂溫泉岔路）時，列出兩圖差異向使用者詢問該怎麼接，並在完成回報中註明

**slug 組成：`<地名>-<類型後綴>`**

- **地名拼寫**
  - 有通用英文譯名者用通用譯名：`yushan`、`tataka`、`nanhu`、`jiaming`
  - 其餘用漢語拼音，不加聲調
  - 一個地名的音節之間**不加連字號**：`shenmazhen`、`banaiyike`、`dashuiku`（舊例 `mu-gan-saddle`、`da-zhuo-shui-...` 不再沿用）
  - 連字號只用來分隔「地名／方位字／類型後綴／數字」這些獨立成分
- **類型後綴**：取名稱**結尾**的類型詞查第 6 節對照表（同一張表也決定 nodeType）
  - 例：審馬陣山登山口 → 地名「審馬陣山」+ 登山口 → `shenmazhen-mountain-trailhead`
  - 例：南湖大山南峰岔路 → `nanhu-south-peak-fork`
  - 類型詞不在表內時，自選英文並在完成回報列出，讓表可以補
- **地名內部也含類型詞時，每個類型詞都轉成表中英文詞，依圖上詞序排列**
  - 審馬陣山莊岔路口 → `shenmazhen-hut-fork`、陶塞山屋遺址 → `taosai-hut-ruins`、審馬陣山登山口 → `shenmazhen-mountain-trailhead`
- **非方位的修飾字（新／舊／上／下／大／小）併入地名拼音連寫**：新雲稜山莊 → `xinyunleng-hut`、上圈谷 → `shangquangu-cirque`
  - 例外：三角點前的種類修飾詞（水利、森林）省略：多加屯山水利三角點 → `duojiatun-mountain-survey-point`
- **方位字（南／北／東／西／北北／東南／西北）只在修飾「山／峰」時才翻成英文**，修飾其他詞時併入拼音連寫
  - 方位字 + 峰 → 翻英文：南湖大山東峰 → `nanhu-east-peak`、西峰岔路 → `west-peak-fork`、西峰下觀景台 → `west-peak-pavilion`
  - 方位字 + 山名，去掉方位字後仍是一座獨立山名 → 翻英文：南大水窟山 → `south-dashuiku-mountain`、南玉山 → `south-yushan-mountain`
  - 方位字 + 山名，去掉後不是獨立山名 → 整個拼音：南雙頭山 → `nanshuangtou-mountain`、南湖北山 → `nanhu-north-mountain`
  - 方位字修飾非山峰的詞 → 拼音連寫：南湖池山屋 → `nanhuchi-hut`、西北鞍營地 → `xibei-saddle-camp`
  - 複合山名中的「大山」省略：南湖大山 → `nanhu`
- **「主X岔路」類縮寫名稱翻成英文**：主南岔路 → `main-south-fork`、主北岔路 → `main-north-fork`、主東岔路 → `main-east-fork`
- **通用名稱必須加最近地標消歧**
  - 「三岔路口」「四岔路口」「岔路口」「登山口」「水源」這類名稱在同一路線會重複
  - 消歧詞放在最前面：`heishui-fork`（黑水塘旁的三岔路口）、`north-peak-fork`（北峰下解說牌旁的三岔路口）、`yun-peak-east-peak-fork-camp`（雲峰東峰三岔路口營地）
- **含數字的名稱保持圖上詞序**，小數點改連字號，`.0` 保留；數字本身已可識別，不再加地標消歧
  - 「6.8K登山口」→ `6-8k-trailhead`、「4.8K岔路口」→ `4-8k-fork`、「指標2.2K岔路口」→ `signpost-2-2k-fork`、「指標1.0K」→ `signpost-1-0k`
  - 舊例 `trailhead-6-7k` 詞序顛倒且數字與圖不符，不再沿用
- **唯一性**
  - 同一路線內 id 唯一
  - `mountain_` / `global_` 跨路線時，id、`name`、`nodeType` 必須與既有檔完全相同。合併路線時以 id 去重、後者覆蓋（`app/[locale]/hiking-trail-planner/[planId]/page.tsx`），不一致會靜默蓋掉
  - 新增前先 `grep` 既有資料檔確認
  - `global_` 的 `name` 以先建立的那份資料為準；新圖文字不同（例：「樂山屋」vs「樂樂山屋」）時沿用既有 name，並在出入清單記錄

---

## 4. i18nKey 規則

- **格式 `<namespace>.<slug>`**，slug 與 id 的 `_` 之後完全相同
- **namespace 對應 prefix**

| id prefix | i18nKey namespace | 例 |
|---|---|---|
| `mountain_` | `mountain.` | `mountain.batongguan-mountain` |
| `global_` | `global.` | `global.dongpu-spring` |
| `<trail-id>_` | `<trail-id>.` | `south-second-section.lulu-hut` |

- **Trail 本身**：`<trail-id>.<trail-id>`（例：`south-second-section.south-second-section`）
- **現況**：這些 key 是預留的，`frontend/messages/*.json` 尚未建立對應 namespace，也沒有元件讀取 `i18nKey`
  - 唯一實際使用的翻譯是 `hiking-trail-planner.startFromPlan.trailNames.<trail-id>`（見第 9 節）

---

## 5. name

- **節點 `name` 照抄圖上文字**，只做兩件事
  - 去掉括號註記：「南湖池山屋（廢棄）」→ `南湖池山屋`。`TrailNode` 沒有 `note` 欄位，括號資訊直接捨棄，但在完成回報列出
  - 去掉空白
- **`global_` 節點例外**，沿用既有資料的 name（見第 3 節）
- **Trail 層級**：`name` 用 `MountainCategory` 中文值，`nameEn` 用英文慣用名（見第 1 節欄位表）

---

## 6. 類型對照表與 nodeType

**判斷步驟**

1. **橘底框 → `peak`**，不再往下看
2. **紅框 → `hut`**，不再往下看
3. **綠框：取名稱結尾的類型詞查下表**，得到 slug 後綴與 nodeType
   - 「結尾」是指名稱最後出現的類型詞。「大水池登山口」結尾是登山口（不是池），「審馬陣山莊岔路口」結尾是岔路口（不是山莊）
   - 類型詞是山／峰／三角點，但該節點在圖上連接 3 個以上相鄰節點 → 改為 `fork`（山頭同時是主要岔路時）
4. **綠框且沒有類型詞**：連接 3 個以上相鄰節點 → `fork`，否則 `other`
   - 「相鄰節點數」以圖上黑色雙箭頭相連的節點計，不含方向註記與接續箭頭

| 名稱結尾類型詞 | slug 後綴 | nodeType | 例 |
|---|---|---|---|
| 山 | `-mountain` | `peak` | `tafen-mountain` |
| 峰 | `-peak` | `peak` | `yun-peak` |
| 三角點 | `-survey-point` | `peak` | `duojiatun-mountain-survey-point` |
| 山屋、山莊、避難山屋 | `-hut` | `hut` | `lulu-hut` |
| 服務站、工作站 | `-station` | `hut` | `guangao-station` |
| 管理站、檢查哨 | `-station` | `other` | |
| 獵寮 | `-hunting-hut` | `camp` | |
| 營地 | `-camp` | `camp` | `rhododendron-camp` |
| 草原 | `-meadow` | `camp` | `batongguan-meadow` |
| 遺址、舊址 | `-ruins` | `camp` | |
| 瀑布 | `-fall` | `water-source` | `yunlong-fall` |
| 池、塘 | `-pond` | `water-source` | `tafen-pond` |
| 湖 | `-lake` | `water-source` | `jiaming-lake` |
| 溪 | `-river` | `water-source` | `laonong-river` |
| 水源 | `-water-source` | `water-source` | |
| 岔路、岔路口、三岔路口、四岔路口 | `-fork` | `fork` | `xinkang-mountain-fork` |
| 登山口 | `-trailhead` | `fork` | `shenmazhen-mountain-trailhead` |
| 鞍部 | `-saddle` | `fork` | `mugan-saddle` |
| 埡口 | `-pass` | `other` | `siyuan-pass` |
| 坪 | `-ping` | 依步驟 4 | `guangao-ping`（`fork`，三向） |
| 停車場 | `-parking` | `other` | `tataka-parking` |
| 溫泉 | `-spring` | `other` | `dongpu-spring` |
| 部落 | `-tribe` | `other` | |
| 亭、觀景台 | `-pavilion` | `other` | |
| 斷崖、峭壁 | `-cliff` | `other` | |
| 圈谷 | `-cirque` | `other` | `shangquangu-cirque`（舊例 `upper-cirque`） |
| 解說牌 | `-sign` | `other` | |

- **id prefix 與 nodeType 獨立判斷**：prefix 看名稱結尾是否為山／峰（第 3 節），nodeType 看本節步驟。一座山頭可以是 `mountain_` 但 `fork`

---

## 7. 步行時間與邊

- **每對相鄰節點建立兩條有向邊**，`from`/`to` 互換
  - `buildTrailAdjacencyList`（`frontend/src/lib/trailGraph.ts`）不會自動補反向邊，缺一邊就會算不出路徑
- **讀數規則：數字跟著箭頭頭部走**
  - 每個分鐘數緊鄰一個箭頭頭部，該數字就是「箭頭所指方向」的時間
  - **不可**用「上坡一定比較久」反推，一律看箭頭
- **三種排列的判讀慣例**（上河圖例一致如此，仍以實際箭頭頭部為準）

| 排列 | 慣例 |
|---|---|
| 水平雙箭頭 | 上方數字＝向右箭頭、下方數字＝向左箭頭 |
| 垂直雙箭頭 | 左側數字＝朝上箭頭、右側數字＝朝下箭頭 |
| 斜向雙箭頭 | 無固定慣例，必須裁切放大看箭頭頭部 |

- **看不清或方向沒把握時**：先裁切該區域放大再判讀；仍不確定就在該邊加 `note: '方向待確認'`，並在完成回報列出，不要猜
- **重裝／輕裝並列時一律取重裝**
  - 例：G17 秀姑巒山南登山口 ↔ 秀姑巒山 標「重:60分／輕:30分」→ `minutes: 60`
  - 原因：`TrailEdge` 只有單一 `minutes`，尚無同時保留兩種負重時間的機制（見開頭 TODO）
  - 在該邊加 `note: '輕裝 30 分'` 保留原始資訊
  - 完成回報時主動列出本路線哪些邊採用了重裝值
- **圖上只標一個方向時**：兩個方向都填該數字，並加 `note: '圖僅標單向'`
- **捷徑邊與繞行路徑並存時兩者都建**
  - 例：G17 觀高坪 ↔ 八通關草原 直達 65/75 分，與經西峰岔路的路徑並存
  - 不要為了省節點把中間節點合併掉

---

## 8. 資料檔排版慣例

- **檔名 camelCase**：`southSecondSection.ts`，匯出 `export const southSecondSection: Trail`
- **主線的選法**
  - 主線＝圖上從起點出發、排版上貫穿整張圖的那一排節點（上河圖以排版呈現主線）
  - 環狀路網（例：G07 木杆鞍部 → 南湖溪山屋 → 中央尖溪山屋 → 南峰岔路 繞回主線）：取圖上排版靠主排的一側為主線，另一側視為支線，在其分岔點之後列出
- **nodes 依主線行進順序排列**
  - 支線（山頭來回、山屋岔路、環線另一側）緊接在其分岔點之後
  - 支線內還有支線時採深度優先：先列完整條支線（含子支線），再回到主線
  - 用 `// --- 區域名稱 ---` 註解分段
- **edges 依同樣順序**
  - 每對邊前加 `// A <-> B` 註解
  - **第一條邊必須是路線起點那一段**：`components/TrailGraph/TrailGraph.tsx` 以 `edges[0]` 作為 Cytoscape 佈局錨點
- **每條 edge 三行寫法**，不留尾端空白

```typescript
// 塔芬池 <-> 轆轆山登山口
{
  from: 'south-second-section_tafen-pond',
  to: 'south-second-section_lulu-trailhead',
  minutes: 235
},
{
  from: 'south-second-section_lulu-trailhead',
  to: 'south-second-section_tafen-pond',
  minutes: 185
},
```

- **節點範例**

```typescript
{
  id: 'mountain_tafen-mountain',
  name: '塔芬山',
  i18nKey: 'mountain.tafen-mountain',
  nodeType: 'peak'
},
```

---

## 9. 新增路線檢查清單

1. **建立資料檔** `frontend/src/constants/hiking-trails/<camelCase>.ts`
2. **註冊路線**：加入 `frontend/src/constants/hikingTrails.ts` 的 `HIKING_TRAILS` 陣列
3. **路線名稱翻譯**：`frontend/messages/en-US.json` 與 `zh-TW.json` 的 `hiking-trail-planner.startFromPlan.trailNames.<trail-id>` 各加一筆
4. **positions 座標**：需另建 `positions/<trail-id>-positions.ts` 並在 `positions/index.ts` 註冊
   - 座標為手動微調，撰寫方式不在本文件範圍
5. **驗證**（皆在 Docker container 內執行，指令見 `CLAUDE.md`）
   - `yarn lint`、`yarn test:unit`（含 `src/constants/hikingTrails.vitest.test.ts` 的資料完整性檢查）
   - 啟動 dev server，進 `/hiking-trail-planner` 選該路線，確認路網圖可渲染
6. **自我檢查**
   - 所有 edge 的 `from`/`to` 都存在於 `nodes`
   - 每條邊都有反向邊
   - `global_` / `mountain_` 的 id、name、nodeType 與既有檔一致
7. **完成回報必列事項**
   - 採用重裝值的邊、圖僅標單向的邊、方向待確認的邊
   - 共用路段被簡化、待使用者決定如何銜接的項目
   - 公路步行註記、括號註記等被捨棄的資訊
   - 第 6 節對照表沒有的類型詞與你自選的後綴

---

## 附錄：2026-10-02 校正紀錄

三份資料檔已依 G02／G07／G17 逐節點、逐邊重新整理，並讓所有 id 符合第 3、6 節規則（未保留舊 id 相容性）。以下是校正時留下的判斷與待辦。

- **待辦：positions 手動微調**
  - 新增節點只放在相鄰節點附近的 80 倍數格點，間距偏大。玉山群峰的八通關古道段（古道崩斷岔路、溪水營地、西峰岔路、八通關山西峰、三岔路口、八通關山、八通關山登山口、樂樂溫泉岔路）與南二段新增的 14 個節點都需要重排
- **待辦：公路步行註記**
  - G07「4K 步行約 90 分」（思源埡口 ↔ 勝光登山口 沿公路）未建邊，待決定是否補
- **採用重裝值的邊**：南二段 秀姑巒山 → 秀姑巒山南登山口，重 60／輕 30，取 60 並加 `note`
- **捷徑邊**：南二段 觀高坪 ↔ 八通關草原 65/75（稜線捷徑，只在 G17 出現），與經西峰岔路的路徑並存
- **共用路段**：八通關古道（東埔溫泉 → 八通關山登山口）以 G02 詳細版建為 `global_` 節點，南二段與玉山群峰共用；G17 的簡化直連邊（120/105、275/215、105/80）因逐段加總完全相同而不另建
- **孤立節點**：南二段 埡口山莊 在圖上沒有任何分鐘數連線，是無邊節點
- **捨棄的圖上資訊**：車行節點（水里、和社、阿里山、塔塔加遊客中心）、直昇機停機坪、公路路牌、方向註記、接續箭頭、「（廢棄）」括號註記
- **由整理者自選、可再議的 id**
  - 南二段：`pass-hut`（埡口山莊）、`xiangyang-forest-recreation-area`、`lindao-trailhead`、`xibei-saddle-nanshuang-pond-camp`、`xiuguluan-mountain-south-trailhead`、`banaiyike-fork`／`heishui-fork`／`north-peak-fork`（三處三岔路口）、`rhododendron-fork`（四岔路口）
  - 北一段：`beishan-mountain-trailhead`、`shangquangu-fork`（四岔路口）、`hunting-hut-fork`（獵寮岔路）、`dazhuoshuinan-river-fork`；中央尖沿用 `chungyangjian` 慣用拼法
  - 玉山群峰：`da-cliff`（大峭壁）、`datieshan`（大鐵杉）、`monroe-pavilion`（孟祿亭，視為通用譯名）、`yuan-peak-fork`／`yushan-south-peak-fork`／`2k-fork`（三處岔路口）
- **nodeType 依表修正的既有節點**：陶塞山屋遺址 hut→camp、石洞獵寮 water-source→camp、指標1.0K fork→other、三叉峰 fork→peak（照圖重接後只連兩個節點）、上東埔停車場 fork→other
- **完整性測試**：`frontend/src/constants/hikingTrails.vitest.test.ts` 檢查 id 前綴、i18nKey、邊的端點與反向邊、positions 對應、跨檔共用節點一致、範例行程連通；新增或修改資料後執行 `yarn test:unit`
