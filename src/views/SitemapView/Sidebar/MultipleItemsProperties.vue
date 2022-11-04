<script setup lang="ts">
import { DeleteMultipleItemsCommand } from 'src/commands/DeleteMultipleItemsCommand'
import CheckboxMultipleBlankOutlineIcon from 'src/material-design-icons/CheckboxMultipleBlankOutline.vue'
import DeleteOutlineIcon from 'src/material-design-icons/DeleteOutline.vue'
import { useAppStore } from 'src/stores/app.store'
import OverallColorSelector from 'src/views/SitemapView/OverallColorSelector.vue'
import SidebarSection from 'src/views/SitemapView/Sidebar/SidebarSection.vue'
import { computed } from 'vue'

const app = useAppStore()
const selectionColors = computed(() => new Set(Array.from(app.canvas.selection).map(i => i.meta.color)))


function deleteItems() {
    new DeleteMultipleItemsCommand({ items: app.canvas.selection }).execute()
    app.canvas.resetSelection()
}
</script>

<template>
    <SidebarSection>
        <div class="d-flex gap-2 align-items-center">
            <CheckboxMultipleBlankOutlineIcon/>
            {{ app.canvas.selection.size }} items selected
        </div>
    </SidebarSection>

    <SidebarSection title="Selection Colors">
        <OverallColorSelector style="max-width: 17em" :colors="selectionColors"/>
    </SidebarSection>

    <SidebarSection class="has-hover" v-ripple @click="deleteItems">
        <div class="d-flex text-danger align-items-center gap-4">
            <DeleteOutlineIcon/>
            <div class="font-weight-bold">Delete {{ app.canvas.selection.size }} items</div>
        </div>
    </SidebarSection>
</template>
