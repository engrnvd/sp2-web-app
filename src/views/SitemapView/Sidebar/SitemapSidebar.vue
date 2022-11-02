<script lang="ts" setup>
import { useAppStore } from 'src/stores/app.store'
import ProjectProperties from 'src/views/SitemapView/Sidebar/ProjectProperties.vue'

const app = useAppStore()

</script>

<template>
    <div class="sitemap-sidebar text-small">
        <ProjectProperties/>
    </div>
</template>

<style lang="scss">
.sitemap-sidebar {
    width: var(--sidebar-width);
    background-color: var(--bg);
    border-left: 1px solid var(--border-color);
    flex-shrink: 0;
}
</style>
