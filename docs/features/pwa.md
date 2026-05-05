# PWA

## 現況

目前僅 **Hiking Trail Planner** 已作為 PWA 試點實作完成。其餘三個工具（FIT File Viewer、Peaks Tracker、Trail Map）尚未接入 PWA。

已完成的基礎設施：
- Serwist service worker（單一 `sw.js`，覆蓋整個 origin）
- Hiking Trail Planner 的 locale-aware manifest（`en-US`、`zh-TW` 各一份）
- Standalone 模式下隱藏 AppHeader / AppFooter 的 CSS

---

## 架構決策

### 方案選擇：各工具獨立 PWA（方案 B）

捨棄「統一 TrailKit PWA（方案 A）」與「統一 PWA + Shortcuts（方案 C）」，採用各工具各自有獨立 manifest 與安裝點的方案 B。

原因：四個工具使用情境差異大，分開安裝對用戶有意義；搭配 standalone 模式可隱藏 AppHeader / AppFooter，視覺上更接近獨立 app。

### Locale Scope 策略：各語言版本為獨立 App（策略三）

每個語言版本各自有獨立 manifest，scope 鎖定在 `/{locale}/{tool}/`。安裝後不提供語言切換——**standalone 模式下必須隱藏語言切換器**，避免用戶導航至 scope 外。

捨棄「Scope 設在 root `/`（策略一）」是因為同一 origin 只能有一個 root scope SW，四個工具的 SW 會互相覆蓋，退化成方案 A。捨棄「單一 locale scope（策略二）」是因為語言切換後 URL 超出 scope，iOS Safari 高機率跳出 home screen app 改用 Safari 開啟。

### Service Worker 工具：Serwist

採用 `@serwist/next`（Workbox fork），對 Next.js App Router 支援較 `next-pwa` 更好。

> **注意**：Serwist 在 `NODE_ENV === 'development'` 時自動停用 service worker。若要驗證 SW 行為，必須執行 production build（`yarn build && yarn start`），在 dev server 上看不到 SW 效果。

---

## Standalone 外觀處理

使用 CSS media query 偵測 standalone 模式，隱藏 AppHeader / AppFooter 並修正 Mantine AppShell 的 header offset：

```css
/* src/styles/globals.css */
@media (display-mode: standalone) {
  .app-header,
  .app-footer {
    display: none !important;
  }

  .mantine-AppShell-root {
    --app-shell-header-height: 0px !important;
    --app-shell-header-offset: 0px !important;
  }
}
```

這段 CSS 寫在全域樣式，對所有工具生效——只要工具的 manifest 設定了 `"display": "standalone"`，安裝後開啟時 header/footer 就會自動隱藏。

---

## Manifest 結構

每個工具 × 每個語言對應一份 manifest，命名規則為 `{tool}-{locale}.json`，存放於 `public/manifests/`。scope 與 start_url 均鎖定在 `/{locale}/{tool}/`：

```json
{
  "scope": "/en-US/hiking-trail-planner/",
  "start_url": "/en-US/hiking-trail-planner/"
}
```

manifest 透過工具的 `layout.tsx` 在 `generateMetadata` 中動態注入，同時設定 `appleWebApp`（iOS 安裝支援）：

```typescript
// app/[locale]/hiking-trail-planner/layout.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    manifest: `/manifests/hiking-${locale}.json`,
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: locale === 'zh-TW' ? '登山行程規劃' : 'Hiking Trail Planner',
    },
  }
}
```

---

## 擴充其他工具的注意事項

為下一個工具接入 PWA 時，需完成以下步驟：

1. **圖示**：準備 `icon-192.png`、`icon-512.png`、`icon-maskable-192.png`、`icon-maskable-512.png`，放入 `public/icons/{tool-name}/`
2. **Manifest**：建立 `public/manifests/{tool}-en-US.json` 與 `public/manifests/{tool}-zh-TW.json`，scope 設為 `/{locale}/{tool}/`，**不可設為 root `/`**（否則 SW 會與其他工具的 SW 互相覆蓋）
3. **layout.tsx**：在工具的 `layout.tsx` 新增 `generateMetadata`，動態注入對應 locale 的 manifest 路徑與 `appleWebApp` 設定
4. **語言切換器**：在 standalone 模式下隱藏語言切換元件（避免用戶導航至 scope 外，破壞 standalone 外觀）
