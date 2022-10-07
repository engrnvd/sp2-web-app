<script lang="ts" setup>

import UndoRedoBtns from './UndoRedoBtns.vue'
import ZoomTools from './ZoomTools.vue'
</script>

<template>
    <div class="sitemap-footer d-flex align-items-center gap-2 p-3">
        <UndoRedoBtns/>
        <ZoomTools/>
    </div>
</template>

<style scoped lang="scss">

.sitemap-footer {
    position: absolute;
    right: 0;
    bottom: 0;
}

</style>
