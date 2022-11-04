<script lang="ts" setup>
import { useAppStore } from 'src/stores/app.store'
import BlockProperties from 'src/views/SitemapView/Sidebar/BlockProperties.vue'
import MultipleItemsProperties from 'src/views/SitemapView/Sidebar/MultipleItemsProperties.vue'
import NoteProperties from 'src/views/SitemapView/Sidebar/NoteProperties.vue'
import PageProperties from 'src/views/SitemapView/Sidebar/PageProperties.vue'
import ProjectProperties from 'src/views/SitemapView/Sidebar/ProjectProperties.vue'
import SectionProperties from 'src/views/SitemapView/Sidebar/SectionProperties.vue'

const app = useAppStore()

</script>

<template>
    <div class="sitemap-sidebar text-small">
        <MultipleItemsProperties v-if="app.canvas.selection.size > 0"/>
        <PageProperties v-else-if="app.canvas.selectedItem?.meta?._type === 'page'"/>
        <BlockProperties v-else-if="app.canvas.selectedItem?.meta?._type === 'block'"/>
        <SectionProperties v-else-if="app.canvas.selectedItem?.meta?._type === 'section'"/>
        <NoteProperties v-else-if="app.canvas.selectedItem?.meta?._type === 'note'"/>
        <ProjectProperties v-else/>
    </div>
</template>

<style lang="scss">
.sitemap-sidebar {
    min-width: var(--sidebar-width);
    background-color: var(--bg);
    border-left: 1px solid var(--border-color);
    flex-shrink: 0;

    .material-design-icon {
        font-size: 1rem;
    }
}
</style>
