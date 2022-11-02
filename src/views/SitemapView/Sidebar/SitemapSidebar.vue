<script lang="ts" setup>
import { useAppStore } from 'src/stores/app.store'
import PageProperties from 'src/views/SitemapView/Sidebar/PageProperties.vue'
import ProjectProperties from 'src/views/SitemapView/Sidebar/ProjectProperties.vue'

const app = useAppStore()

</script>

<template>
    <div class="sitemap-sidebar text-small">
        <PageProperties v-if="app.canvas.selectedItem?.meta?._type === 'page'"/>
        <ProjectProperties v-else/>
    </div>
</template>

<style lang="scss">
.sitemap-sidebar {
    min-width: var(--sidebar-width);
    background-color: var(--bg);
    border-left: 1px solid var(--border-color);
    flex-shrink: 0;
}
</style>
