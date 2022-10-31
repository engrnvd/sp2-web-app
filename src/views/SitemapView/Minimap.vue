<script lang="ts" setup>
import { useAppStore } from '@/stores/app.store.js'
import { SitemapBlock } from 'src/classes/SitemapBlock'
import { SitemapPage } from 'src/classes/SitemapPage'
import { onMounted, reactive, ref } from 'vue'

const app = useAppStore()
const canvasEl = ref()

const config = reactive({
    height: 0,
    width: 100,
    ratio: 1,
    ctx: null,
    vp: { x: 0, y: 0, w: 0, h: 0 },
    lastDrawingTime: 0,
})

onMounted(() => {
    requestAnimationFrame(draw)
})

function onMinimapClick(e) {
    let canvas = app.sitemap.canvas
    const vp = config.vp
    let x = e.offsetX - vp.w / 2
    let y = e.offsetY - vp.h / 2
    canvas.updateOrigin(-x / config.ratio - canvas.minX, -y / config.ratio - canvas.minY, () => {
    })
}

function drawPage(ctx: CanvasRenderingContext2D, item: SitemapPage | SitemapBlock) {
    let canvas = app.canvas
    ctx.textBaseline = 'top'

    const left = item.ci.left - canvas.minX
    const top = item.ci.top - canvas.minY
    const x = Math.round(left * config.ratio)
    const y = Math.round(top * config.ratio)
    const w = Math.round(item.ci.width * config.ratio)
    let h = Math.round(item.ci.height * config.ratio)

    if (item instanceof SitemapPage) {
        ctx.lineWidth = 0.5
        ctx.strokeStyle = item.color || '#333'
        ctx.strokeRect(x, y, w, h)
    } else {
        ctx.fillStyle = item.color || '#333'
        ctx.fillRect(x, y, w, h)
    }

    if (item instanceof SitemapPage) {
        if (item.children) item.children.forEach(ch => drawPage(ctx, ch))
        if (item.blocks) item.blocks.forEach(ch => drawPage(ctx, ch))
    }
}

function draw(timestamp) {
    let canvas = app.canvas
    const elapsed = timestamp - config.lastDrawingTime
    const frameInterval = 1000 / 60

    if (elapsed > frameInterval) {
        if (!canvas || !canvasEl.value) return

        if (!config.ctx) config.ctx = canvasEl.value.getContext('2d')

        let ctx: CanvasRenderingContext2D = config.ctx
        const maxH = Math.max(canvas.maxY - canvas.minY, canvas.height)
        const maxW = Math.max(canvas.maxX - canvas.minX, canvas.width)
        let height, width

        if (maxH > maxW) {
            height = Math.round(Math.min(maxH * 0.09, canvas.height * 0.9))
            config.ratio = height / maxH
            width = Math.round(maxW * config.ratio)

            if (height !== config.height) config.height = height
            if (width !== config.width) config.width = width
        } else {
            width = Math.round(Math.min(maxW * 0.09, canvas.width * 0.9))
            config.ratio = width / maxW
            height = Math.round(maxH * config.ratio)

            if (width !== config.width) config.width = width
            if (height !== config.height) config.height = height
        }

        ctx.save()
        ctx.clearRect(0, 0, config.width, config.height)

        // viewport
        const vp = config.vp
        vp.x = (-canvas.origin.x - canvas.minX) * config.ratio
        vp.y = (-canvas.origin.y - canvas.minY) * config.ratio
        vp.w = canvas.width * config.ratio
        vp.h = canvas.height * config.ratio

        ctx.fillStyle = 'rgba(255, 255, 255)'
        ctx.fillRect(vp.x, vp.y, vp.w, vp.h)

        ctx.scale(canvas.zoom.scale, canvas.zoom.scale)

        for (const page of app.sitemap.tree) drawPage(ctx, page)

        ctx.restore()

        config.lastDrawingTime = timestamp
    }

    requestAnimationFrame(draw)
}

</script>

<template>
    <canvas
        ref="canvasEl"
        :height="config.height"
        :width="config.width"
        class="apm-minimap shadow-0"
        @click.prevent.stop="onMinimapClick"
        @mousedown.stop=""
        @mouseup.stop="">
    </canvas>
</template>

<style lang="scss">
.apm-minimap {
    --m-border-color: #bdcad5;
    position: fixed;
    right: 1em;
    bottom: 3em;
    background-color: var(--m-border-color);
    z-index: 99;
    cursor: initial;
    overflow: hidden;
    border: 1px solid var(--m-border-color);
}
</style>
