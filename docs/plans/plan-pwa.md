# PWA 可行性評估與方案規劃

> 初步構想，尚未決定實作方向。

## 背景

TrailKit 目前有四個工具：FIT File Viewer、Peaks Tracker、Trail Map、Hiking Trail Planner。
評估是否以 PWA 形式讓用戶可安裝使用，並討論各方案的可行性。

---

## 技術前提

### 現有架構對 PWA 的影響

- 四個工具的 `page.tsx` 全部為 `'use client'`，地圖元件為 `ssr: false`
- 幾乎是純 client-side rendering，符合 PWA 的架構需求
- 已使用 `idb-keyval`（IndexedDB），hiking plan 資料天然 offline 友好
- 無需 offline 的 server API call，快取策略相對簡單
- 目前零 PWA 基礎設施（無 manifest、無 service worker）

### 主要技術挑戰

- `maplibre-gl`、`leaflet`、`cytoscape` 體積大，初次安裝下載量不小
- 地圖磚（map tiles）來自外部服務，不建議快取，需設計合適策略
- locale prefix（`/en-US/`、`/zh-TW/`）讓 scope 設計較複雜
- iOS Safari PWA 支援弱：無 background sync、儲存可能被 evict

---

## 方案比較

### 方案 A：統一 TrailKit PWA（一個安裝點）

安裝整個 TrailKit，四個工具都包含在內。

**優點**
- 實作最簡單，一個 manifest + 一個 service worker
- locale routing 的 scope 問題最小，直接設在 `/`
- 工具間 navigation 不中斷

**缺點**
- 用戶可能只想要特定工具，卻要裝整個 app
- 安裝後的視覺體驗仍像「網站」，不像獨立工具

---

### 方案 B：四個獨立 PWA（各自有安裝點）

每個工具有自己的 manifest，scope 鎖定在該工具路由。

**優點**
- 用戶可以只安裝需要的工具
- 搭配 `display-mode: standalone` 隱藏 AppHeader / AppFooter，視覺上完全像獨立 app
- 四個工具使用情境差異夠大，分開安裝是有意義的

**缺點**
- locale prefix 讓 scope 複雜（需要 `/*/peaks/` 或 `/en-US/peaks/` 擇一）
- 四套 manifest 需要維護
- 瀏覽器行為因廠商而異（iOS Safari 最不可預期）
- 同一 origin 的多個 PWA，需要小心 service worker scope 不重疊

---

### 方案 B 的 Locale Scope 策略分析

由於專案採用 `localePrefix: 'always'`，實際路由為 `/en-US/peaks/`、`/zh-TW/peaks/`，scope 設計有以下選項：

#### 策略一：Root scope `/`

```json
{ "scope": "/", "start_url": "/en-US/peaks/" }
```

- 語言切換完全正常，standalone 不中斷
- **問題**：同一 origin 只能有一個 SW 控制 root scope，四個工具的 SW 會互相覆蓋，退化成方案 A 行為

#### 策略二：Locale-specific scope（如 `/en-US/peaks/`）

```json
{ "scope": "/en-US/peaks/", "start_url": "/en-US/peaks/" }
```

- 四個工具 SW 完全隔離，互不影響
- **語言切換的影響**：
  - 切換後 URL 變為 `/zh-TW/peaks/`，已在 scope 外，該頁面不受任何 SW 控制
  - **功能面不受影響**：app 是 client-side rendering，JS 邏輯、IndexedDB、地圖、FIT 解析皆在 JS runtime，與 SW 無關
  - **Offline 快取**：切換後的語言頁面不在快取內，只有安裝時的語言有離線保護
  - **Standalone 外觀破版**：這才是主要風險。Chrome 可能顯示網址列退出全螢幕，iOS Safari 高機率跳出 home screen app 改用 Safari 開啟

#### 策略三：各語言版本作為獨立 App

每個語言的頁面 link 對應語言的 manifest，用戶安裝時選擇語言，安裝後不提供語言切換：

```
/en-US/peaks/ → link manifest-peaks-en.json (scope: /en-US/peaks/)
/zh-TW/peaks/ → link manifest-peaks-zh.json (scope: /zh-TW/peaks/)
```

- **優點**：scope 清晰，standalone 永不中斷，語言切換問題完全消除
- **前提**：standalone 模式下必須隱藏語言切換器，否則用戶點了仍會出 scope

  ```scss
  @media (display-mode: standalone) {
    .languageSwitcher { display: none; }
  }
  ```

- **代價**：4 工具 × 2 語言 = 8 個 manifest；若用戶主要使用單一語言（如台灣用戶幾乎全用 zh-TW），可只做 zh-TW 版 PWA，複雜度降回 4 個

---

### 方案 C：統一 PWA + Shortcuts（折衷）

一個安裝點，manifest 加上 `shortcuts` 指向各工具。

**優點**
- 安裝一次，快速進入各工具
- 技術複雜度低，scope 管理最簡單
- 搭配 `display-mode: standalone` 隱藏 header/footer

**缺點**
- 仍是「一個 app 裝全部」的心智模型
- shortcuts 在部分平台顯示不佳

---

## AppHeader / AppFooter 隱藏方案

PWA 以 `display: "standalone"` 模式啟動時，瀏覽器會設定 `display-mode: standalone`。
可用 CSS media query 或 JS hook 條件性隱藏 header/footer：

```scss
@media (display-mode: standalone) {
  .appHeader,
  .appFooter {
    display: none;
  }
}
```

或 React hook：

```typescript
function usePWAMode() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(display-mode: standalone)').matches
}
```

---

## 推薦工具

| 工具 | 說明 |
|------|------|
| **Serwist** | Workbox fork，對 Next.js App Router 支援較好，推薦優先評估 |
| `next-pwa` | 較老牌，但對 App Router 支援停滯 |
| 手寫 Service Worker | 彈性最高，但維護成本大 |

---

## 待決定

- [ ] 採用方案 A / B / C？
- [ ] locale scope 策略：scope 設在 root `/` 還是 locale-specific path？
- [ ] 是否先從單一工具 pilot？若是，優先哪個工具？
- [ ] 地圖磚快取策略（或直接不快取，要求 online）

---

## Verification Steps (實作時)

1. 確認 manifest 在各目標路由的 `<head>` 正確 link
2. Lighthouse PWA audit 通過（installability checklist）
3. 在 Chrome DevTools Application tab 驗證 service worker 正確註冊
4. 測試 standalone 模式下 AppHeader / AppFooter 是否隱藏
5. iOS Safari 安裝測試（行為最不可預期，需手動驗證）
