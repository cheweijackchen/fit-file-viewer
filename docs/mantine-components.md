# Mantine v8.3.18 元件開發快速查詢指南

本指南由 Mantine 核心框架專家編撰，旨在為開發者提供 v8.3.18 版本元件庫與擴展生態系的完整架構圖譜，協助您精確選用合適的技術方案。

## 1. 核心元件庫 (@mantine/core)

`@mantine/core` 是框架的基石，所有元件皆具備高度可自定義性與無障礙支持。

### 1.1 Layout (佈局)

| 元件名稱 | 用途說明 |
| --- | --- |
| AppShell | 建構應用程式的整體佈局架構（含 Header、Navbar、Aside 等區域）。 |
| AspectRatio | 將內容（如影片或圖片）維持在特定的寬高比例。 |
| Center | 透過 Flexbox 將內容在其容器中水平與垂直居中。 |
| Container | 將內容水平限制在響應式的最大寬度內，並置中排列。 |
| Flex | 基於 Flexbox 的基礎容器，用於靈活控制子元素的排列與對齊。 |
| Grid | 基於 Flexbox 的響應式網格系統，支援欄位比例與間距配置。 |
| Group | 基於 Flexbox 的水平排列元件，內建間隔控制與對齊選項。 |
| SimpleGrid | 響應式的網格佈局，使用 CSS Grid 實作，適合等寬欄位。 |
| Space | 在元件之間增加精確的垂直或水平間隔。 |
| Stack | 基於 Flexbox 的垂直排列元件，簡化縱向佈局的間距管理。 |

### 1.2 Inputs (輸入)

| 元件名稱 | 用途說明 |
| --- | --- |
| AngleSlider | 用於選取角度數值的圓形旋轉滑桿。 |
| Checkbox | 支援單選、多選及不確定狀態的核取方塊。 |
| Chip | 具備選取狀態的標籤按鈕，常用於過濾器或單選情境。 |
| ColorInput | 結合顏色預覽與彈出式選色器的輸入欄位。 |
| ColorPicker | 完整的顏色選取面板，支援多種色彩格式。 |
| Fieldset | 將相關輸入元件進行邏輯分組，並加上標題與樣式。 |
| FileInput | 專為檔案上傳設計的輸入元件。 |
| Input | 基礎輸入欄位元件，為所有進階輸入元件的底層封裝。 |
| JsonInput | 提供 JSON 語法驗證的多行文字輸入區域。 |
| NativeSelect | 使用瀏覽器原生樣式的下拉選單，適合移動端優化。 |
| NumberInput | 數值專用輸入欄，支援步進控制與精確格式化。 |
| PasswordInput | 密碼專用欄位，內建顯示/隱藏切換功能。 |
| PinInput | 用於輸入驗證碼或 PIN 碼的獨立格狀輸入元件。 |
| Radio | 用於從多個選項中選取單一值的單選按鈕。 |
| RangeSlider | 支援選取數值區間的雙節點滑桿。 |
| Rating | 視覺化的星級評分元件。 |
| SegmentedControl | 線性分段切換控制項，適合在少數選項間快速切換。 |
| Slider | 標準的數值選擇滑桿。 |
| Switch | 切換布林狀態的開關控制項。 |
| Textarea | 支援自動調整高度的多行文字輸入區域。 |
| TextInput | 最常用的標準單行文字輸入欄位。 |

### 1.3 Combobox (組合框)

| 元件名稱 | 用途說明 |
| --- | --- |
| Autocomplete | 帶有動態建議選項清單的文字輸入元件。 |
| Combobox | 元件庫底層 API 框架，用於建構自定義下拉選單與組合輸入。 |
| MultiSelect | 支援多項選取、搜尋與標籤顯示的下拉選單。 |
| Pill | 用於顯示選中項目的藥丸狀標籤元件。 |
| PillsInput | 專為 Pill 元件設計的輸入容器，支援複雜的選取邏輯。 |
| Select | 支援搜尋與單一選取的進階下拉選單。 |
| TagsInput | 允許使用者自由輸入或從清單選取多個標籤。 |

### 1.4 Buttons (按鈕)

| 元件名稱 | 用途說明 |
| --- | --- |
| ActionIcon | 以圖示為核心的小型按鈕，適合精簡操作。 |
| Button | 執行主要操作的標準按鈕。 |
| CloseButton | 預設關閉圖示的按鈕，用於關閉彈窗或提示訊息。 |
| CopyButton | 封裝了「點擊複製」邏輯的輔助按鈕元件。 |
| FileButton | 觸發原生檔案選取對話框的隱形按鈕。 |
| UnstyledButton | 移除所有預設樣式的重設按鈕，用於開發完全自定義的交互元件。 |

### 1.5 Navigation (導覽)

| 元件名稱 | 用途說明 |
| --- | --- |
| Anchor | 繼承主題樣式的超連結元件。 |
| Breadcrumbs | 顯示當前頁面在層級結構中位置的麵包屑導覽。 |
| Burger | 經典的漢堡選單圖示按鈕，內建展開動畫。 |
| NavLink | 垂直導覽連結，支援巢狀層級、Icon 標記與選取狀態。 |
| Pagination | 用於長清單的進階分頁控制系統。 |
| Stepper | 引導使用者完成多步驟流程的進度導覽。 |
| TableOfContents | 自動生成或手動定義的頁面內容目錄。 |
| Tabs | 透過分頁標籤在不同內容視圖間切換。 |
| Tree | 呈現階層式數據結構（如資料夾目錄）的樹狀導覽。 |

### 1.6 Feedback (回饋)

| 元件名稱 | 用途說明 |
| --- | --- |
| Alert | 顯示需要使用者關注的重要提示或警告資訊。 |
| Loader | 提供多種樣式的載入中動畫效果。 |
| Notification | 顯示包含標題、描述與 Icon 的即時通知訊息。 |
| Progress | 標準的線性進度條。 |
| RingProgress | 圓環狀的進度或比例展示元件。 |
| SemiCircleProgress | 半圓形的進度指示元件。 |
| Skeleton | 內容加載期間的預留位置（骨架屏），降低視覺跳動。 |

### 1.7 Overlays (疊加層)

| 元件名稱 | 用途說明 |
| --- | --- |
| Affix | 將元素固定在頁面視窗的特定座標位置（如回到頂部按鈕）。 |
| Dialog | 顯示在螢幕邊角的非模態對話方塊。 |
| Drawer | 從螢幕側邊滑出的覆蓋面板。 |
| FloatingIndicator | 在一組元素上方滑動的視覺選取指示器。 |
| HoverCard | 滑鼠懸停時顯示的豐富資訊卡片。 |
| LoadingOverlay | 在指定容器上方覆蓋載入動畫與遮罩層。 |
| Menu | 點擊觸發的彈出式操作選單。 |
| Modal | 傳統的居中模態對話視窗。 |
| Overlay | 覆蓋在父容器上方的深色或模糊塗層。 |
| Popover | 在錨點元素周圍彈出的自定義內容面板。 |
| Tooltip | 懸停時顯示的簡短文字提示。 |

### 1.8 Data display (數據展示)

| 元件名稱 | 用途說明 |
| --- | --- |
| Accordion | 節省空間的可摺疊內容區塊組。 |
| Avatar | 用於顯示使用者圖像、縮寫或預設圖示。 |
| BackgroundImage | 具備樣式控制功能的背景圖片容器。 |
| Badge | 用於強調狀態或類別的小型徽章。 |
| Card | 將相關內容組織在具備邊框或陰影的獨立容器中。 |
| ColorSwatch | 展示單一顏色的圓形或方塊預覽。 |
| Image | 支援佔位符、錯誤處理與比例控制的增強型圖片元件。 |
| Indicator | 在元素角落顯示的小型點狀或數值通知。 |
| Kbd | 顯示鍵盤快速鍵的專屬樣式元件。 |
| NumberFormatter | 格式化顯示數值數據（如貨幣、千分位、百分比）。 |
| Spoiler | 自動隱藏溢出內容，並提供「顯示更多」切換功能。 |
| ThemeIcon | 帶有主題色彩背景的圖示容器。 |
| Timeline | 按時間順序展示事件或狀態列表。 |

### 1.9 Typography (排版)

| 元件名稱 | 用途說明 |
| --- | --- |
| Blockquote | 具備主題樣式的引言內容區塊。 |
| Code | 顯示行內或區塊程式碼片段。 |
| Highlight | 在一段文字中動態高亮顯示指定的關鍵字。 |
| List | 提供有序或無序清單樣式。 |
| Mark | 為文字背景加上醒目的高亮標註色。 |
| Table | 構建標準數據表格的元件組。 |
| Text | 基礎文字元件，集中控制字級、行高、顏色與粗細。 |
| Title | 基於 h1-h6 的語義化標題元件。 |
| Typography | 即 TypographyStylesProvider，用於對 HTML 或 Markdown 渲染內容進行全局樣式化。 |

### 1.10 Miscellaneous (其他)

| 元件名稱 | 用途說明 |
| --- | --- |
| Box | 最基礎的多態 (Polymorphic) 元件，支援所有 Mantine 樣式屬性。 |
| Collapse | 帶有高度變換動畫的內容展開與摺疊容器。 |
| Divider | 水平或垂直的分隔線，可添加標籤文字。 |
| FocusTrap | 將鍵盤焦點鎖定在特定區域，強化模態元件的無障礙體驗。 |
| Paper | 具備邊距、圓角與陰影的白色背景容器（基礎區塊）。 |
| Portal | 將元件渲染到父元件 DOM 結構之外（如 body 末端）。 |
| ScrollArea | 提供跨瀏覽器一致樣式的自定義滾動條區域。 |
| Transition | 為元件的進入與離開提供平滑的 CSS 動畫過場。 |
| VisuallyHidden | 在視覺上隱藏元素，但保留給螢幕閱讀器讀取。 |

--------------------------------------------------------------------------------

## 2. 官方擴充功能 (@mantine/*)

官方擴充套件由核心團隊維護，提供特定領域的高階功能。

| 套件名稱 | 功能描述 |
| --- | --- |
| @mantine/dates | **完整日期/時間處理：** 包含 MiniCalendar, Calendar, DateTimePicker, DatePicker, DatePickerInput, DateInput, MonthPicker, MonthPickerInput, YearPicker, YearPickerInput, TimeInput, TimePicker, TimeGrid, TimeValue。 |
| @mantine/charts | **數據視覺化：** 基於 recharts 實作，支援 AreaChart, BarChart, LineChart, CompositeChart, DonutChart, PieChart, FunnelChart, RadarChart, ScatterChart, BubbleChart, RadialBarChart, Sparkline, Heatmap。 |
| @mantine/notifications | 全局通知系統管理，支援動態更新、佇列與自定義樣式。 |
| @mantine/code-highlight | 整合語法高亮功能的程式碼展示元件。 |
| @mantine/spotlight | 提供中心化搜尋控制台（如 Ctrl + K 功能導航）。 |
| @mantine/carousel | 基於 embla-carousel 的高效能輪播元件。 |
| @mantine/dropzone | 支援拖拽上傳檔案的互動區域。 |
| @mantine/modals | 命令式彈窗管理模組，簡化複雜彈窗的邏輯處理。 |
| @mantine/tiptap | 基於 Tiptap 的現代化富文本編輯器。 |
| @mantine/nprogress | 頁面頂部的導覽進度條，常用於路由切換回饋。 |

--------------------------------------------------------------------------------

## 3. 社群擴充元件 (Community Extensions)

社群擴充元件由社群成員維護，更新頻率獨立於官方核心庫。

| 元件名稱 | 詳細功能描述 |
| --- | --- |
| BlockNote | 基於塊狀結構（Block-based）的現代富文本編輯器。 |
| ContextMenu | 靈活的滑鼠右鍵選單元件。 |
| DataTable | **無依賴 (Dependency-free)** 的輕量級數據表格元件。 |
| MantineReactTable | 基於 TanStack Table 實作的企業級強大數據表格。 |
| BorderAnimate | 提供光束、發光等豐富的邊框動畫樣式。 |
| Clock | 模擬類比時鐘元件。 |
| Compare | 支援滑動對比兩張圖片的元件。 |
| Flip | 實現內容正反面翻轉的動畫元件。 |
| JsonTree | 具備語法高亮與點擊展開功能的互動式 JSON 樹狀查看器。 |
| Led | 用於狀態回饋或儀表板的 LED 指示燈元件。 |
| ListViewTable | 模擬 Finder 風格的清單檢視，支援欄位重排與縮放。 |
| Marquee | 自動滾動的跑馬燈內容元件。 |
| Mask | 隨游標移動的聚光燈遮罩特效元件。 |
| Onboarding | 產品功能導覽與步驟教學元件。 |
| Parallax | 視差滾動效果容器。 |
| Picker | 具備動畫效果的選取器（適用於色彩、日期、表情符號等）。 |
| QrCode | 高度可自定義的 QR Code 產生元件。 |
| Reflection | 為圖片或內容添加倒影視覺效果。 |
| RingsProgress | 多層環狀進度指示元件。 |
| Scene | 裝飾用背景元件，支援漸層、點陣、發光與噪點效果。 |
| SelectStepper | 循環切換選項的步進控制元件。 |
| Spinner | 基於 SVG 的多樣化載入動畫元件。 |
| SplitPane | 可由使用者拖曳調整大小的分隔面板容器。 |
| TextAnimate | 多種文字進入與變換動畫效果。 |
| Window | 具備拖拽、縮放與標題列功能的視窗化元件。 |
| Mantine Form Builder | 視覺化的表單建構器與渲染引擎。 |
| Mantine Choropleth Map | 用於 GeoJson 數據的面量圖（地圖視覺化）元件。 |
| Lightbox | 基於 @mantine/carousel 構建的全螢幕圖片燈箱元件。 |
