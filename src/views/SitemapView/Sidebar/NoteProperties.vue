<script setup lang="ts">
import { EditItemPropCommand } from 'src/commands/EditItemPropCommand'
import ApmEditable from 'src/components/common/ApmEditable.vue'
import NoteOutlineIcon from 'src/material-design-icons/NoteOutline.vue'
import { useAppStore } from 'src/stores/app.store'
import ItemColorSection from 'src/views/SitemapView/Sidebar/ItemColorSection.vue'
import SidebarSection from 'src/views/SitemapView/Sidebar/SidebarSection.vue'
import { computed } from 'vue'

const app = useAppStore()
const note = computed(() => app.canvas?.selectedItem?.meta)

function updateProp(prop, value) {
    new EditItemPropCommand({ item: note.value, prop, value }).execute()
}
</script>

<template>
    <SidebarSection>
        <template #header>
            <div class="d-flex gap-2 align-items-center">
                <NoteOutlineIcon/>
                Text
            </div>
        </template>
        <ApmEditable
            type="textarea"
            class="w100 flex-column text-editable"
            :model-value="note.text"
            filed-name="text"
            @update:modelValue="v => updateProp('text', v)"
            confirm-before-save
        />
    </SidebarSection>

    <ItemColorSection/>
</template>
