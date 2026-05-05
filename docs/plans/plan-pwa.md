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
