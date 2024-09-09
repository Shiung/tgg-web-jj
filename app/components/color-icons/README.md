# color-icons 資料夾

此資料夾包含了**複雜**或**多色**的 SVG 圖示文件，這些圖標通過 `@svgr/cli` 轉換為 React 組件。這些圖標可能包含多種顏色、陰影效果、漸變等，需要特別的處理，與單色圖標不同。

## 使用方法

我們使用 `@svgr/cli` 將這些 SVG 圖標轉換為 React 組件，以便可以在 React 應用中方便使用。

### 轉換命令

在轉換這些 SVG 圖標時，我們使用以下命令：

```bash
pnpm dlx @svgr/cli \
  --out-dir app/components/color-icons/ \
  --filename-case kebab \
  --typescript \
  --ext tsx \
  --jsx-runtime automatic \
  app/components/color-icons/svg/*
```

```bash
--no-index \
--no-dimensions \
--svgo-config '{ "plugins": [ { "name": "preset-default", "params": { "overrides": { "removeViewBox": false } } } ] }' \
```
