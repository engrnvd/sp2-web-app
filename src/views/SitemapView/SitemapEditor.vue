<script lang="ts" setup>

import { update } from '@tweenjs/tween.js'
import Minimap from 'src/views/SitemapView/Minimap.vue'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { ApmCanvas } from '@/classes/canvas/ApmCanvas'
import { Sitemap } from '@/classes/Sitemap'
import MainLoader from '@/components/common/MainLoader.vue'
import { newSitemapTemplate } from '@/helpers/sitemap-helper'
import { useAppStore } from '@/stores/app.store'
import { useRoute } from 'vue-router'
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
let route = useRoute()

let lastDrawingTime = 0
const draw = (timestamp: number = 1) => {
    const elapsedMs = timestamp - lastDrawingTime
    const frameInterval = 1000 / 60
    if (elapsedMs > frameInterval) {
        app.sitemap.draw()
        lastDrawingTime = timestamp
    }

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

    let id = route.params.id

    if (!id || id === 'new') {
        setTimeout(() => {
            app.setSitemap(new Sitemap(canvas, newSitemapTemplate()))
            draw()
        }, 100)
    } else if (app.sitemap?.id !== id) {
        app.sitemapReq.url = `sitemaps/${id}`
        app.sitemapReq.send().then(d => {
            app.setSitemap(new Sitemap(canvas, app.sitemapReq.data))
            draw()
        })
    }

    window.addEventListener('resize', updateCanvasSize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateCanvasSize)
})

</script>

<template>
    <div class="sitemap-editor flex-grow-1" ref="parentEl">
        <canvas ref="canvasEl"></canvas>

        <EditedItemInput v-if="canvas.editedItem"/>
        <SelectedItemToolbar v-if="canvas.selectedItem"/>
        <AddBlockBtn v-if="canvas.hoveredItem && app.hasHoveredPage"/>
        <AddChildPageBtn v-if="canvas.hoveredItem && app.hasHoveredPage"/>
        <AddSiblingPageBtn location="before"
                           v-if="canvas.hoveredItem && app.hasHoveredPage && !canvas.hoveredItem?.meta?.isRoot"/>
        <AddSiblingPageBtn location="after"
                           v-if="canvas.hoveredItem && app.hasHoveredPage && !canvas.hoveredItem?.meta?.isRoot"/>
        <CollapsePageBtn v-if="canvas.hoveredItem && app.hasHoveredPage && canvas.hoveredItem?.meta?.children?.length"/>

        <SitemapFooter v-if="app.canvas"/>

        <MainLoader v-if="!app.sitemap"/>

        <Minimap v-if="app.canvas && app.canvas.isBiggerThanViewPort"/>
    </div>
</template>

<style scoped lang="scss">

.sitemap-editor {
    overflow: hidden;
    user-select: none;
    position: relative;
}

</style>
