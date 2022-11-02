<script lang="ts" setup>
import UndoRedoBtns from './UndoRedoBtns.vue'
import ZoomTools from './ZoomTools.vue'</script>

<template>
    <div class="sitemap-footer d-flex align-items-center gap-2 py-2 px-4">
        <div class="flex-grow-1"></div>
        <UndoRedoBtns/>
        <ZoomTools/>
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
