<script setup lang="ts">
import ApmEditable from '@/components/common/ApmEditable.vue'
import { EditItemPropCommand } from 'src/commands/EditItemPropCommand'
import BorderHorizontalIcon from 'src/material-design-icons/BorderHorizontal.vue'
import TextIcon from 'src/material-design-icons/Text.vue'
import TextBoxOutlineIcon from 'src/material-design-icons/TextBoxOutline.vue'
import { useAppStore } from 'src/stores/app.store'
import SidebarSection from 'src/views/SitemapView/Sidebar/SidebarSection.vue'
import { computed } from 'vue'

const app = useAppStore()
const item = computed(() => app.canvas?.selectedItem)

function update(value) {
    new EditItemPropCommand({
        item: item.value.meta,
        prop: 'name',
        value
    }).execute()
}

</script>

<template>
    <SidebarSection>
        <div class="d-flex gap-2">
            <TextIcon v-if="item.meta._type === 'block'"/>
            <BorderHorizontalIcon v-else-if="item.meta._type === 'section'"/>
            <TextBoxOutlineIcon v-else/>
            <ApmEditable
                class="item-name-editable"
                :model-value="item.meta.name"
                filed-name="name"
                @update:modelValue="update"
                confirm-before-save
            />
        </div>
    </SidebarSection>
</template>

<style lang="scss">
.item-name-editable {
    input {
        font-weight: bold;
    }
}
</style>
