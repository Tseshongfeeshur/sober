# 更新日志

## 0.7.2 (2024-12-02)

- 修复：TextField 在 Edge 浏览器中显示清除按钮和密码显示按钮。
- 新增：Page 组件新增 `change` 事件，在模式改变时触发，新增 `isDark` 只读属性，返回是否为暗色模式。

## 0.7.1 (2024-11-30)

- 修复：Carousel 高度问题已修复，现在它会根据宽度自适应高度。
- 支持：Icon 的 src 属性支持加载其他类型图像。
- 新增：FAB 新增 `hidden` 属性，用于隐藏 FAB。

## 0.7.0 (2024-11-28)

- 修改：Snackbar 的静态方法 `show` 变更为 `builder`。
- 修改：BottomSheet 的静态方法 `show` 变更为 `builder`。
- 修改：Dialog 的静态方法 `show` 变更为 `builder`。
- 重写：Carousel 进行了重写，现在它有全新的属性和外观。
- 新增：Icon 新增 `src` 属性和相关事件，用于加载 svg 图标。
- 修复：修复 Table 宽度问题，Table 现在默认支持滚动。