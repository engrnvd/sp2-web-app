<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import { EditItemNameCommand } from '../../commands/EditItemNameCommand'
import { cssVar, DebounceFn } from '../../helpers/misc'
import { useAppStore } from '../../stores/app.store'

const changeFn = new DebounceFn(100)
const app = useAppStore()
const inputEl = ref()

const item = computed(() => app.canvas?.editedItem)
const fontSize = computed(() => item.value.fontSize * app.canvas.zoom.scale)
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
        borderRadius: (item.value.borderRadius[0] * zoom) + 'px',
        height: height + 'px',
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
        class="edited-item-input"
        :value="item.meta.name"
        :style="styles"
        @change="onChange"
        @keydown.enter="onChange"
        @keydown.esc="close"
    />
</template>

<style scoped lang="scss">

.edited-item-input {
    position: absolute;
    border: none;
    outline: none;
    box-shadow: var(--shadow-raised);
    z-index: 2;
}

</style>
