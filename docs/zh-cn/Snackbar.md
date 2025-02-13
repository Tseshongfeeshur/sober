# Snackbar

提示框。

```html preview
<s-snackbar>
  <s-button slot="trigger"> 提示 </s-button>
  Message
</s-snackbar>
```

使用插槽。

```html preview
<s-snackbar>
  <s-button slot="trigger"> 提示 </s-button>
  <s-icon type="light_mode" slot="icon"></s-icon>
  Message
  <s-button type="text" slot="action"> 关闭 </s-button>
</s-snackbar>
```

错误框。

```html preview
<s-snackbar type="error">
  <s-button slot="trigger" type="filled-tonal"> 错误 </s-button>
  Message
</s-snackbar>
```

> 注意：该组件使用了 fixed 定位，在该组件的祖先元素中，应当避免**同时**出现滚动和[层叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)。

---

## 属性


| 名称     | 类型               | 默认值 | 是否同步 | 介绍    |
| -------- | ----------------- | ------ | ------- | ------- |
| type     | basic, error      | filled | 是      | 样式    |
| duration | number            | 4000   | 否      | 持续时间 |
| align    | auto, top, bottom | auto   | 是      | 位置    |

---

## 事件

| 名称      | 参数   | 冒泡 | 可取消 | 介绍                |
| --------- |------ |------|------ |-------------------- |
| show      | Event | 否   | 是    | `扩展` 显示时触发     |
| showed    | Event | 否   | 否    | `扩展` 显示完成后触发 |
| dismiss   | Event | 否   | 是    | `扩展` 隐藏时触发     |
| dismissed | Event | 否   | 否    | `扩展` 隐藏完成后触发 |

---

## 插槽

| 名称    | 介绍     |
| ------- | ------- |
| trigger | 触发器   |
| icon    | 图标     |
| action  | 操作按钮 |

---

## 原型

```ts
interface Options {
  root?: Element //插入的目标元素，默认为 document.body 下第一个 s-page
  icon?: string | Element //图标，支持元素和 HTML 字符串
  text?: string //文本
  type?: 'basic' | 'error' //提示框类型
  duration?: number //持续时间
  //操作按钮
  action?: string | {
    text: string
    click: (event: MouseEvent) => unknown
  }
}

class Snackbar extends HTMLElement {
  static readonly builder(options: string | Options): Dialog //动态创建提示框
  readonly show(): void //显示提示框
  readonly dismiss(): void //隐藏提示框
} 
```

---

## CSS 变量

| 名称                         | 介绍                  |
| ---------------------------- | --------------------- |
| --s-color-inverse-surface    | 提示框背景颜色         |
| --s-color-inverse-on-surface | 提示框文本颜色         |
| --s-color-inverse-primary    | 提示框按钮颜色         |
| --s-color-error              | 错误提示框背景颜色      |
| --s-color-on-error           | 错误提示框文本/按钮颜色 |
| --s-elevation-level3         | 提示框阴影             |