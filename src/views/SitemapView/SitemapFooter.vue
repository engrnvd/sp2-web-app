<script lang="ts" setup>
import ViewToggleBtn from 'src/components/layout/header/ViewToggleBtn.vue'
import OverallColorSelector from 'src/views/SitemapView/OverallColorSelector.vue'
import SimpleViewToggleBtn from 'src/views/SitemapView/SimpleViewToggleBtn.vue'
import UndoRedoBtns from './UndoRedoBtns.vue'
import ZoomTools from './ZoomTools.vue'</script>

<template>
    <div class="sitemap-footer d-flex align-items-center gap-2 p-3">
        <OverallColorSelector/>
        <div class="flex-grow-1"></div>
        <UndoRedoBtns/>
        <ZoomTools/>
        <SimpleViewToggleBtn/>
        <ViewToggleBtn/>
    </div>
</template>

<style lang="scss" scoped>
.sitemap-footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
