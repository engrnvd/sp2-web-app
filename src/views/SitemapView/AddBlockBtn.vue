<script lang="ts" setup>
import { SitemapPage } from 'src/classes/SitemapPage'
import { defaultBlock } from 'src/helpers/sitemap-helper'
import { useAppStore } from 'src/stores/app.store'
import { computed } from 'vue'
import PlusIcon from '../../material-design-icons/Plus.vue'
import UButton from '../../U/components/UButton.vue'

const app = useAppStore()
const item = computed(() => app.canvas?.hoveredItem)
const page = computed(() => app.canvas?.hoveredItem?.meta)

const style = computed(() => {
    const height = item.value.meta.styles.blockHeight
    const zoom = app.canvas.zoom.scale
    return {
        left: item.value.relLeft + (item.value.paddingX) * zoom + 'px',
        top: item.value.relBottom - (height + item.value.paddingY - item.value.meta.styles.headerHeight + item.value.meta.styles.blockGap * 2) * zoom + 'px',
        width: item.value.relWidth - (item.value.paddingX * 2) * zoom + 'px',
        height: height * zoom + 'px',
    }
})

function onClick() {
    const page: SitemapPage = item.value.meta
    const block = page.addBlock(defaultBlock())
    app.canvas.setEditedItem(block.ci)
}

</script>

<template>
    <UButton
        :style="style" class="add-block-btn page-hover-btn"
        flat
        secondary
        @click="onClick"
    >
        <PlusIcon/>
    </UButton>
</template>

<style lang="scss" scoped>
.add-block-btn {
    min-width: 0;
    background-color: var(--secondary-darker);
    border-radius: 0;
}
</style>
