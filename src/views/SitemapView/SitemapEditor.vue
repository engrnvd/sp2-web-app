<script lang="ts" setup>

import { update } from '@tweenjs/tween.js'
import { onMounted, reactive, ref } from 'vue'
import { ApmCanvas } from '@/classes/canvas/ApmCanvas'
import { Sitemap } from '@/classes/Sitemap'
import MainLoader from '@/components/common/MainLoader.vue'
import { newSitemapTemplate } from '@/helpers/sitemap-helper'
import { useAppStore } from '@/stores/app.store'
import AddBlockBtn from './AddBlockBtn.vue'
import AddChildPageBtn from './AddChildPageBtn.vue'
import AddSiblingPageBtn from './AddSiblingPageBtn.vue'
import CollapsePageBtn from './CollapsePageBtn.vue'
import EditedItemInput from './EditedItemInput.vue'
import SelectedItemToolbar from './SelectedItemToolbar.vue'
import SitemapFooter from './SitemapFooter.vue'

const app = useAppStore()
const parentEl = ref()
const canvasEl = ref()
const canvas = reactive(new ApmCanvas())

const draw = () => {
    app.sitemap.draw()
    requestAnimationFrame(draw)
    update()
}

function updateCanvasSize() {
    const rect = parentEl.value.getBoundingClientRect()
    canvas.initialize(canvasEl.value)
    canvas.updateCanvasSize(rect.width, rect.height)
}

onMounted(() => {
    updateCanvasSize()

    setTimeout(() => {
        app.setSitemap(new Sitemap(canvas, newSitemapTemplate()))
        draw()
    }, 300)

    window.addEventListener('resize', updateCanvasSize)
})

</script>

<template>
    <div class="sitemap-editor flex-grow-1" ref="parentEl">
        <canvas ref="canvasEl"></canvas>

        <EditedItemInput v-if="canvas.editedItem"/>
        <SelectedItemToolbar v-if="canvas.selectedItem"/>
        <AddBlockBtn v-if="canvas.hoveredItem && app.hasHoveredPage"/>
        <AddChildPageBtn v-if="canvas.hoveredItem && app.hasHoveredPage"/>
        <AddSiblingPageBtn v-if="canvas.hoveredItem && app.hasHoveredPage && !canvas.hoveredItem?.meta?.isRoot"/>
        <CollapsePageBtn v-if="canvas.hoveredItem && app.hasHoveredPage && canvas.hoveredItem?.meta?.children?.length"/>

        <SitemapFooter v-if="app.canvas"/>

        <MainLoader v-if="!app.sitemap"/>
    </div>
</template>

<style scoped lang="scss">

.sitemap-editor {
    overflow: hidden;
    user-select: none;
    position: relative;
}

</style>
