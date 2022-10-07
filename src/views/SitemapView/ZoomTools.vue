<script lang="ts" setup>

import MinusIcon from '../../material-design-icons/Minus.vue'
import PlusIcon from '../../material-design-icons/Plus.vue'
import { useAppStore } from '../../stores/app.store'

const app = useAppStore()

</script>

<template>
    <div class="zoom-tools all-center gap-2 px-2">
        <a href="" @click.prevent="app.canvas.zoomOut()">
            <MinusIcon/>
        </a>
        <a href="" @click.prevent="app.canvas.setZoom(1)" style="min-width: 3rem; text-align: center">
            {{ Math.round(app.canvas.zoom.scale * 100) }}%
        </a>
        <a href="" @click.prevent="app.canvas.zoomIn()">
            <PlusIcon/>
        </a>
    </div>
</template>

<style scoped lang="scss">
</style>
