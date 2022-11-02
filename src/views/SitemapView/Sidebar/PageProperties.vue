<script setup lang="ts">
import { EditItemPropCommand } from 'src/commands/EditItemPropCommand'
import ApmEditable from 'src/components/common/ApmEditable.vue'
import FileDocumentIcon from 'src/material-design-icons/FileDocument.vue'
import FormatTitleIcon from 'src/material-design-icons/FormatTitle.vue'
import LinkVariantIcon from 'src/material-design-icons/LinkVariant.vue'
import { useAppStore } from 'src/stores/app.store'
import ItemColorSection from 'src/views/SitemapView/Sidebar/ItemColorSection.vue'
import ItemNameEditable from 'src/views/SitemapView/Sidebar/ItemNameEditable.vue'
import SidebarSection from 'src/views/SitemapView/Sidebar/SidebarSection.vue'
import { computed } from 'vue'

const app = useAppStore()
const item = computed(() => app.canvas?.selectedItem)
const page = computed(() => app.canvas?.selectedItem?.meta)

function updateProp(prop, value) {
    new EditItemPropCommand({ item: page.value, prop, value }).execute()
}

</script>

<template>
    <SidebarSection>
        <div class="d-flex gap-2">
            <FileDocumentIcon/>
            <ItemNameEditable/>
        </div>
    </SidebarSection>

    <ItemColorSection/>

    <SidebarSection title="Link">
        <div class="d-flex gap-2">
            <LinkVariantIcon/>
            <ApmEditable
                :model-value="page.link"
                filed-name="link"
                @update:modelValue="v => updateProp('link', v)"
                confirm-before-save
            />
        </div>
    </SidebarSection>

    <SidebarSection title="Title Tag">
        <div class="d-flex gap-2">
            <FormatTitleIcon/>
            <ApmEditable
                :model-value="page.titleTag"
                filed-name="titleTag"
                @update:modelValue="v => updateProp('titleTag', v)"
                confirm-before-save
            />
        </div>
    </SidebarSection>

    <SidebarSection title="Meta Description">
        <ApmEditable
            type="textarea"
            class="w100 flex-column meta-editable"
            :model-value="page.metaDesc"
            filed-name="metaDesc"
            @update:modelValue="v => updateProp('metaDesc', v)"
            confirm-before-save
        />
    </SidebarSection>
</template>

<style lang="scss">
.meta-editable {
    position: relative;

    .apm-editable-btns {
        position: absolute;
        top: -2.5em;
        right: 0;
    }
}
</style>
