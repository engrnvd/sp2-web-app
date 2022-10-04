import { createApp, defineComponent } from 'vue'

export function useDynamicComponent(Component: any) {
  const wrapper = document.createElement('div')
  // @ts-ignore
  document.body.appendChild(wrapper)
  return createApp(defineComponent({ extends: Component })).mount(wrapper)
}
