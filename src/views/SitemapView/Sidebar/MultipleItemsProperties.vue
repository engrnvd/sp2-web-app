<script setup lang="ts">
import CheckboxMultipleBlankOutlineIcon from 'src/material-design-icons/CheckboxMultipleBlankOutline.vue'
import { useAppStore } from 'src/stores/app.store'
import OverallColorSelector from 'src/views/SitemapView/OverallColorSelector.vue'
import SidebarSection from 'src/views/SitemapView/Sidebar/SidebarSection.vue'
import { computed } from 'vue'

const app = useAppStore()
const selectionColors = computed(() => new Set(Array.from(app.canvas.selection).map(i => i.meta.color)))

</script>

<template>
    <SidebarSection>
        <div class="d-flex gap-2">
            <CheckboxMultipleBlankOutlineIcon/>
            {{ app.canvas.selection.size }} items selected
        </div>
    </SidebarSection>
    <SidebarSection title="Selection Colors">
        <OverallColorSelector style="max-width: 17em" :colors="selectionColors"/>
    </SidebarSection>
</template>
