<script lang="ts" setup>
import { sitemapConfig } from 'src/helpers/sitemap-helper'
import { computed } from 'vue'
import { SitemapPage } from 'src/classes/SitemapPage'
import PlusIcon from 'src/material-design-icons/Plus.vue'
import { useAppStore } from 'src/stores/app.store'
import PageHoverBtn from './PageHoverBtn.vue'

const app = useAppStore()

const item = computed(() => app.canvas?.hoveredItem)
const left = computed(() => {
    if (app.hasHorizontalView) return item.value.relCx
    const zoom = app.canvas.zoom.scale
    return item.value.relLeft + sitemapConfig.connection.offsetX * zoom
})
const top = computed(() => item.value.relBottom)

function onClick() {
    const parent: SitemapPage = item.value.meta
    parent.addChild()
}

</script>

<template>
    <PageHoverBtn v-tooltip="'Add child'" class="add-child-page-btn" :left="left" :top="top" @click="onClick">
        <PlusIcon/>
    </PageHoverBtn>
</template>

<style scoped lang="scss">
.add-child-page-btn {
    transform: translateX(-50%) translateY(-50%);
}
</style>
