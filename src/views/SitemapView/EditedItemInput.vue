<script lang="ts" setup>
import { EditItemNameCommand } from 'src/commands/EditItemNameCommand'
import { DebounceFn } from 'src/helpers/misc'
import { useAppStore } from 'src/stores/app.store'
import { computed, ref, watchEffect } from 'vue'

const changeFn = new DebounceFn(100)
const app = useAppStore()
const inputEl = ref()

const item = computed(() => app.canvas?.editedItem)
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
    setTimeout(() => inputEl.value.setSelectionRange(0, item.value.meta.name.length))
})

function close() {
    return app.canvas.setEditedItem(null)
}

function onChange(e) {
    changeFn.run(() => {
        const existingValue = item.value.meta.name
        const newValue = e.target.value
        if (existingValue === newValue) return close()

        new EditItemNameCommand({ item: item.value.meta, value: newValue }).execute()

        setTimeout(close)
    })
}

</script>

<template>
    <input
        ref="inputEl"
        :style="styles"
        :value="item.meta.name"
        class="edited-item-input"
        @change="onChange"
        @keydown.enter="onChange"
        @keydown.esc="close"
    />
</template>

<style lang="scss" scoped>
.edited-item-input {
    position: absolute;
    border: none;
    outline: none;
    padding-block: 0;
    line-height: 0;

    &::selection {
        background-color: v-bind(color);
        color: v-bind(backgroundColor);
    }
}
</style>
