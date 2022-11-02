<script setup lang="ts">
import ApmEditable from 'src/components/common/ApmEditable.vue'
import ArrowCollapseIcon from 'src/material-design-icons/ArrowCollapse.vue'
import FileTreeIcon from 'src/material-design-icons/FileTree.vue'
import LanIcon from 'src/material-design-icons/Lan.vue'
import SitemapIcon from 'src/material-design-icons/Sitemap.vue'
import { useAppStore } from 'src/stores/app.store'
import UIconBtn from 'src/U/components/UIconBtn.vue'
import USwitch from 'src/U/components/USwitch.vue'
import OverallColorSelector from 'src/views/SitemapView/OverallColorSelector.vue'
import SidebarSection from 'src/views/SitemapView/Sidebar/SidebarSection.vue'

const app = useAppStore()
</script>

<template>
    <SidebarSection>
        <div class="d-flex gap-2">
            <SitemapIcon/>
            <ApmEditable
                class="item-name-editable"
                v-model="app.sitemap.name"
                :url="`sitemaps/${app.sitemap.id}`"
                filed-name="name"
                @update:modelValue="e => app.updateSitemapInListing()"
                confirm-before-save
            />
        </div>
    </SidebarSection>
    <SidebarSection title="Project Colors">
        <OverallColorSelector/>
    </SidebarSection>
    <SidebarSection>
        <div class="d-flex gap-4 align-items-center font-weight-bold">
            <ArrowCollapseIcon/>
            <div class="flex-grow-1">Simple View</div>
            <USwitch v-model="app.simpleView"/>
        </div>
    </SidebarSection>
    <SidebarSection>
        <div class="d-flex gap-4 align-items-center">
            <LanIcon/>
            <div class="flex-grow-1 font-weight-bold">Layout</div>
            <UIconBtn flat :transparent="!app.hasHorizontalView" @click="app.sitemapView = 'Horizontal'">
                <SitemapIcon/>
            </UIconBtn>
            <UIconBtn flat :transparent="app.hasHorizontalView" @click="app.sitemapView = 'Vertical'">
                <FileTreeIcon/>
            </UIconBtn>
        </div>
    </SidebarSection>
</template>

<style lang="scss">

</style>
