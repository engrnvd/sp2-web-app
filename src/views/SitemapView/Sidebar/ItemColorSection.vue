<script setup lang="ts">
import { EditItemPropCommand } from '@/commands/EditItemPropCommand.js'
import { useAppStore } from '@/stores/app.store.js'
import PaletteIcon from 'src/material-design-icons/Palette.vue'
import UColorPicker from 'src/U/components/UColorPicker.vue'
import SidebarSection from 'src/views/SitemapView/Sidebar/SidebarSection.vue'
import { computed } from 'vue'

const app = useAppStore()
const item = computed(() => app.canvas?.selectedItem)
const page = computed(() => app.canvas?.selectedItem?.meta)

function changeColor(color) {
    if (color === item.value.meta.color) return
    new EditItemPropCommand({ item: item.value.meta, prop: 'color', value: color }).execute()
}
</script>


<template>
    <SidebarSection>
        <div class="d-flex gap-4 align-items-center">
            <PaletteIcon/>
            <div class="flex-grow-1 font-weight-bold">Color</div>
            <UColorPicker
                left
                :model-value="page.color"
                @update:model-value="changeColor"
            />
        </div>
    </SidebarSection>
</template>
