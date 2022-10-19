<script lang="ts" setup>
import { EditItemPropCommand } from 'src/commands/EditItemPropCommand'
import { DebounceFn } from 'src/helpers/misc'
import { useAppStore } from 'src/stores/app.store'
import { computed, ref, watchEffect } from 'vue'

const changeFn = new DebounceFn(100)
const app = useAppStore()
const inputEl = ref()

const item = computed(() => app.canvas?.editedItem)
const textProp = computed(() => item.value.meta._type === 'note' ? 'text' : 'name')
const fontSize = computed(() => item.value.fontSize * app.canvas.zoom.scale)
const color = computed(() => item.value.textColor)
const backgroundColor = computed(() => item.value.fillColor || 'var(--body-bg)')
const styles = computed(() => {
    let height = fontSize.value
    let paddingY = item.value.paddingY
    if (item.value.meta._type === 'page') paddingY -= item.value.meta.styles.headerHeight
    height += paddingY * 2 * app.canvas.zoom.scale
    const zoom = app.canvas.zoom.scale

    return {
        left: item.value.relLeft + item.value.borderWidth * zoom + 'px',
        top: item.value.relTop + (item.value.meta._type === 'page' ? item.value.meta.styles.headerHeight * zoom : 0) + 'px',
        width: item.value.relWidth - item.value.borderWidth * 2 * zoom + 'px',
        paddingInline: (item.value.paddingX * zoom) + 'px',
        paddingBlock: (item.value.paddingY * zoom) + 'px',
        fontSize: fontSize.value + 'px',
        height: height + 'px',
        backgroundColor: backgroundColor.value,
        color: color.value,
        fontWeight: item.value.textBold ? 'bold' : 'normal',
    }
})

watchEffect(() => {
    if (!item.value || !inputEl.value) return
    inputEl.value.focus()
    setTimeout(() => inputEl.value.setSelectionRange(0, item.value.meta[textProp.value].length))
})

function close() {
    return app.canvas.setEditedItem(null)
}

function onChange(e) {
    changeFn.run(() => {
        const existingValue = item.value.meta[textProp.value]
        const newValue = e.target.value
        if (existingValue === newValue) return close()

        new EditItemPropCommand({ item: item.value.meta, prop: textProp.value, value: newValue }).execute()

        setTimeout(close)
    })
}

</script>

<template>
    <textarea
        ref="inputEl"
        :style="styles"
        :value="item.meta[textProp]"
        class="edited-item-input"
        @change="onChange"
        @keydown.enter="onChange"
        @keydown.esc="close"
    ></textarea>
</template>

<style lang="scss" scoped>
.edited-item-input {
    position: absolute;
    border: none;
    outline: none;

    &::selection {
        background-color: v-bind(color);
        color: v-bind(backgroundColor);
    }
}
</style>
