<script lang="ts" setup>
import { SitemapSection } from 'src/classes/SitemapSection'
import { AddSectionCommand } from 'src/commands/AddSectionCommand'
import { cssFontSize } from 'src/helpers/misc'
import { defaultPage } from 'src/helpers/sitemap-helper'
import PlusIcon from 'src/material-design-icons/Plus.vue'
import { useAppStore } from 'src/stores/app.store'
import UButton from 'src/U/components/UButton.vue'
import { computed } from 'vue'

const app = useAppStore()
const canvas = app.canvas
const fontSize = cssFontSize()
const left = computed(() => canvas.width / 2 + canvas.origin.x)
const top = computed(() => canvas.maxY + canvas.origin.y + fontSize * 5)

function addSection() {
    const section = new SitemapSection(app.sitemap, {
        name: 'Section ' + (app.sitemap.sections.length + 1),
        children: [defaultPage()]
    })

    new AddSectionCommand({ section }).execute()

    app.canvas.setEditedItem(section.ci)
    app.canvas.setSelectedItem(section.ci)
}

</script>

<template>
    <UButton class="add-new-section-btn" compact secondary transparent @click="addSection">
        <PlusIcon/>
        New Section
    </UButton>
</template>

<style scoped lang="scss">
.add-new-section-btn {
    position: absolute;
    transform: translateX(-50%);
    left: v-bind("left+'px'");
    top: v-bind("top+'px'");
}
</style>
