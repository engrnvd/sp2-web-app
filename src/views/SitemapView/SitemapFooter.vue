<script lang="ts" setup>
import OverallColorSelector from 'src/views/SitemapView/OverallColorSelector.vue'
import UndoRedoBtns from './UndoRedoBtns.vue'
import ZoomTools from './ZoomTools.vue'
</script>

<template>
    <div class="sitemap-footer d-flex align-items-center gap-2 p-3">
        <OverallColorSelector/>
        <div class="flex-grow-1"></div>
        <UndoRedoBtns/>
        <ZoomTools/>
    </div>
</template>

<style scoped lang="scss">
.sitemap-footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
