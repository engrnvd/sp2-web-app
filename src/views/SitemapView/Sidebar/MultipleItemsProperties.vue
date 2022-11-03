<script setup lang="ts">
import CheckboxMultipleBlankOutlineIcon from 'src/material-design-icons/CheckboxMultipleBlankOutline.vue'
import { useAppStore } from 'src/stores/app.store'
import SidebarSection from 'src/views/SitemapView/Sidebar/SidebarSection.vue'

const app = useAppStore()
</script>

<template>
    <SidebarSection>
        <div class="d-flex gap-2">
            <CheckboxMultipleBlankOutlineIcon/>
            {{ app.canvas.selection.size }} items selected
        </div>
    </SidebarSection>
    <!--    <ItemColorSection/>-->
</template>
