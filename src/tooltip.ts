import { useElement, JSXAttributes } from './core/element.js'
import { getStackingContext } from './core/utils/getStackingContext.js'
import { device } from './core/utils/device.js'
import { Theme } from './page.js'

const name = 's-tooltip'
const props = {
}

const style = /*css*/`
:host{
  display: inline-flex;
  vertical-align: middle;
}
.container{
  position: fixed;
  left: 0;
  top: 100%;
  z-index: var(--z-index, 1);
  background: var(--s-color-inverse-surface, ${Theme.colorInverseSurface});
  color: var(--s-color-inverse-on-surface, ${Theme.colorInverseOnSurface});
  font-size: .875rem;
  font-weight: 400;
  padding: 6px 8px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: .85;
  filter: opacity(0);
  transition: filter .1s ease-out;
  pointer-events: none;
  --z-index: var(--z-index, 1);
}
.container.show{
  filter: opacity(1);
}
slot[name=trigger]{
  display: block;
}
::slotted(img){
  display: block;
  border-radius: 4px;
  margin: 2px 0;
}
::slotted([slot=trigger]){
  margin: 0;
}
`

const template = /*html*/`
<slot name="trigger" part="trigger"></slot>
<div class="container" part="container">
  <slot></slot>
</div>
`

export class Tooltip extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const trigger = shadowRoot.querySelector('slot[name=trigger]') as HTMLSlotElement
    const container = shadowRoot.querySelector('.container') as HTMLDivElement
    const state = { timer: 0 }
    const show = (align: 'bottom' | 'top' = 'bottom') => {
      if (!this.isConnected || container.classList.contains('show')) return
      const rect = trigger.getBoundingClientRect()
      const stackingContext = getStackingContext(shadowRoot)
      const gap = 4
      const cWidth = container.offsetWidth
      const cHeight = container.offsetHeight
      const position = {
        top: {
          top: rect.top - gap - cHeight,
          bottom: rect.top + trigger.offsetHeight + gap
        }[align],
        left: rect.left - ((cWidth - rect.width) / 2),
      }
      //left
      if (position.left < 0) {
        position.left = rect.left
      }
      //right
      if (position.left + cWidth > innerWidth) {
        position.left = rect.left + rect.width - cWidth
      }
      //top
      if (position.top + cHeight > innerHeight) {
        position.top = rect.top - gap - cHeight
      }
      //bottom
      if (position.top < 0) {
        position.top = rect.top + trigger.offsetHeight + gap
      }
      container.setAttribute('style', `left: ${position.left - stackingContext.left}px;top: ${position.top - stackingContext.top}px`)
      container.classList.add('show')
    }
    const dismiss = () => {
      if (!this.isConnected || !container.classList.contains('show')) return
      container.classList.remove('show')
    }
    const transitionEnd = () => {
      if (container.classList.contains('show')) return
      container.removeAttribute('style')
    }
    const touchShow = () => {
      clearTimeout(state.timer)
      state.timer = setTimeout(() => show('top'), 600)
    }
    const touchDismiss = () => {
      clearTimeout(state.timer)
      dismiss()
    }
    trigger.addEventListener('wheel', dismiss, { passive: true })
    trigger.addEventListener('mouseover', () => !device.touched && show(), { passive: true })
    trigger.addEventListener('mouseleave', () => !device.touched && dismiss(), { passive: true })
    trigger.addEventListener('touchstart', touchShow, { passive: true })
    trigger.addEventListener('touchend', touchDismiss, { passive: true })
    container.addEventListener('transitionend', transitionEnd)
    return {
      expose: { show, dismiss }
    }
  }
}) { }

Tooltip.define(name)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & JSXAttributes
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Tooltip
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}