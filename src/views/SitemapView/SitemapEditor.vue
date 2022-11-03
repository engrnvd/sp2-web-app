<script lang="ts" setup>

import { ApmCanvas } from '@/classes/canvas/ApmCanvas'
import { Sitemap } from '@/classes/Sitemap'
import MainLoader from '@/components/common/MainLoader.vue'
import { newSitemapTemplate } from '@/helpers/sitemap-helper'
import { useAppStore } from '@/stores/app.store'
import { update } from '@tweenjs/tween.js'
import { IMPORTED_SITEMAP_KEY } from 'src/constants'
import { Storage } from 'src/helpers/storage-helper'
import AddNewSectionBtn from 'src/views/SitemapView/AddNewSectionBtn.vue'
import Minimap from 'src/views/SitemapView/Minimap.vue'
import PageContentModal from 'src/views/SitemapView/Sidebar/PageContentModal.vue'
import SitemapSidebar from 'src/views/SitemapView/Sidebar/SitemapSidebar.vue'
import SitemapFooter from 'src/views/SitemapView/SitemapFooter.vue'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import AddBlockBtn from './AddBlockBtn.vue'
import AddChildPageBtn from './AddChildPageBtn.vue'
import AddSiblingPageBtn from './AddSiblingPageBtn.vue'
import CollapsePageBtn from './CollapsePageBtn.vue'
import EditedItemInput from './EditedItemInput.vue'
import SelectedItemToolbar from './SelectedItemToolbar.vue'

const app = useAppStore()
const parentEl = ref()
const canvasEl = ref()
const canvas = reactive(new ApmCanvas())
let route = useRoute()

let lastDrawingTime = 0
const draw = (timestamp: number = 1) => {
    if (route.name !== 'sitemap') return

    let sitemap = app.sitemap
    const elapsedMs = timestamp - lastDrawingTime
    const frameInterval = 1000 / 60
    if (elapsedMs > frameInterval) {
        sitemap.draw()
        lastDrawingTime = timestamp
    }

    requestAnimationFrame(draw)
    update()
}

function updateCanvasSize() {
    const rect = parentEl.value.getBoundingClientRect()
    canvas.updateCanvasSize(rect.width, rect.height)
}

onMounted(() => {
    canvas.initialize(canvasEl.value)
    updateCanvasSize()

    let id = route.params.id

    if (!id || id === 'new') {
        setTimeout(() => {
            let data = Storage.getObject(IMPORTED_SITEMAP_KEY) || newSitemapTemplate()
            app.setSitemap(new Sitemap(canvas, data))
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
    <div class="flex-grow-1 d-flex sitemap-container">
        <div ref="parentEl" class="sitemap-editor flex-grow-1">
            <canvas ref="canvasEl"></canvas>

            <template v-if="!app.simpleView && !app.hasDraggedPage">
                <EditedItemInput v-if="canvas.editedItem"/>
                <SelectedItemToolbar v-if="canvas.selectedItem"/>
                <AddBlockBtn v-if="canvas.hoveredItem && app.hasHoveredPage"/>
                <AddChildPageBtn v-if="canvas.hoveredItem && app.hasHoveredPage"/>
                <AddSiblingPageBtn v-if="canvas.hoveredItem && app.hasHoveredPage && !canvas.hoveredItem?.meta?.isRoot"
                                   location="before"/>
                <AddSiblingPageBtn v-if="canvas.hoveredItem && app.hasHoveredPage && !canvas.hoveredItem?.meta?.isRoot"
                                   location="after"/>
                <CollapsePageBtn
                    v-if="canvas.hoveredItem && app.hasHoveredPage && canvas.hoveredItem?.meta?.children?.length"/>
            </template>

            <AddNewSectionBtn v-if="app.canvas"/>

            <SitemapFooter v-if="app.canvas"/>

            <MainLoader v-if="!app.sitemap || app.downloadSitemapReq.loading"/>

            <Minimap v-if="app.canvas && (app.canvas.isBiggerThanViewPort || app.canvas.isTranslated)"/>

            <PageContentModal/>
        </div>
        <SitemapSidebar v-if="app.canvas"/>
    </div>
</template>

<style lang="scss">
.sitemap-container {
    overflow: hidden;
    position: relative;
    --sidebar-width: 240px;

    .sitemap-editor {
        overflow: hidden;
        user-select: none;
        position: relative;
    }

    .apm-minimap {
        right: calc(var(--sidebar-width) + 1em);
    }
}

</style>
