# Icons 資料夾

此資料夾包含的 SVG 圖示是通過 `vite-plugin-svgr` 處理並轉換為 React 組件的。

## vite.config.ts 中 svgr 插件配置

```js
svgrOptions: {
  dimensions: false,
  // 將 fill="#000" 替換為 fill="currentColor"，從而支援單色 icon 通過 CSS 替換顏色
  replaceAttrValues: { '#000': 'currentColor' },
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
  svgoConfig: {
    plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }],
  },
}
```

## 使用方法

此資料夾中的所有圖示都會自動處理並轉換為 React 組件。這些圖示會被格式化為使用 **單色** 的圖示，通過 `currentColor` 控制。你可以使用 CSS 類（例如 Tailwind CSS 類或自訂樣式）來控制圖示的顏色。

### Example

```tsx
import SomeIcon from './icons/some-icon.svg?react';

function ExampleComponent() {
  return <SomeIcon className="h-6 w-6 text-blue-500" />;
}
```

在此範例中，圖示的顏色是由 `text-blue-500` 類控制，這會使用 Tailwind CSS 應用藍色。圖示的尺寸也可以通過 `h-6` 和 `w-6` 類進行控制。

在此範例中，使用 TailwindCSS：

- 圖示的尺寸由 `h-6` 和 `w-6` 類控制。
- 圖示的顏色由 `text-green-500` 類控制。

## 自訂化

默認情況下，所有黑色填充（`#000` 或 `#000000`）的圖示會被替換為 `currentColor`，這使得圖示的顏色可以通過 CSS 動態調整。你可以根據上下文輕鬆調整圖示的顏色，通過設置 CSS 中的 `text-color` 類或直接使用行內樣式。

## 資料夾結構

圖示的資料夾結構如下：

```bash
/icons
  ├── some-icon.svg   # 單色圖示，長寬會被移除、保留 viewbox、會被處理為 currentColor
  ├── another-icon.svg
  └── README.md       # 此說明文件
```
