<script lang="ts" setup>
import { EditItemPropCommand } from 'src/commands/EditItemPropCommand'
import { useAppStore } from 'src/stores/app.store'
import { computed, ref, watchEffect } from 'vue'

const app = useAppStore()
const inputEl = ref()

const item = computed(() => app.canvas?.editedItem)
const textProp = computed(() => item.value?.meta?._type === 'note' ? 'text' : 'name')
const fontSize = computed(() => item.value.fontSize * app.canvas.zoom.scale)
const color = computed(() => item.value.textColor)
const backgroundColor = computed(() => item.value.fillColor || 'var(--body-bg)')
const styles = computed(() => {
    const zoom = app.canvas.zoom.scale
    let height = item.value.relHeight
    let paddingY = item.value.paddingY
    let top = item.value.relTop
    if (item.value.meta._type === 'page') {
        const headerHeight = item.value.meta.styles.headerHeight
        top += headerHeight * zoom
        paddingY -= headerHeight
        height = (item.value.fontSize + paddingY * 2) * zoom
    }

    return {
        left: item.value.relLeft + item.value.borderWidth * zoom + 'px',
        top: top + 'px',
        width: item.value.relWidth - item.value.borderWidth * 2 * zoom + 'px',
        height: height + 'px',
        paddingInline: (item.value.paddingX * zoom) + 'px',
        paddingBlock: paddingY * zoom + 'px',
        fontSize: fontSize.value + 'px',
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

function setValue(item, prop, value) {
    if (!item) return
    const existingValue = item[prop]
    if (existingValue === value) return close()

    new EditItemPropCommand({ item, prop, value }).execute()

    close()
}

function onEnter(e, item, prop, value) {
    if (item._type !== 'note') setValue(item, prop, value)
}

</script>

<template>
    <textarea
        ref="inputEl"
        :style="styles"
        :value="item.meta[textProp]"
        class="edited-item-input"
        @change="e => setValue(item?.meta, textProp, e.target.value)"
        @keydown.enter="e => onEnter(e, item?.meta, textProp, e.target.value)"
        @keydown.esc="close"
    ></textarea>
</template>

<style lang="scss" scoped>
.edited-item-input {
    box-sizing: border-box;
    position: absolute;
    border: none;
    outline: none;
    overflow: hidden;
    padding-block: 0;

    &::selection {
        background-color: v-bind(color);
        color: v-bind(backgroundColor);
    }
}
</style>
