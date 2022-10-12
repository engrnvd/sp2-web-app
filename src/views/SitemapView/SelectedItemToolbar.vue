<script lang="ts" setup>
import { computed, nextTick, ref, watch, watchEffect } from 'vue'
import { SitemapBlock } from '../../classes/SitemapBlock'
import { SitemapPage } from '../../classes/SitemapPage'
import { DeleteItemCommand } from '../../commands/DeleteItemCommand'
import { DuplicateItemCommand } from '../../commands/DuplicateItemCommand'
import { EditItemPropCommand } from '../../commands/EditItemPropCommand'
import { cssFontSize } from '../../helpers/misc'
import AddBlockIcon from '../../material-design-icons/AddBlock.vue'
import ContentDuplicateIcon from '../../material-design-icons/ContentDuplicate.vue'
import DeleteOutlineIcon from '../../material-design-icons/DeleteOutline.vue'
import LinkVariantIcon from '../../material-design-icons/LinkVariant.vue'
import { useAppStore } from 'src/stores/app.store'
import UColorPicker from '../../U/components/UColorPicker.vue'

const app = useAppStore()
const toolbarEl = ref()
const left = ref(0)

const height = cssFontSize() * 2.25
const item = computed(() => app.canvas?.selectedItem)
const top = computed(() => item.value.relTop - height - 5)
const width = computed(() => item.value.relWidth)

watchEffect(async () => {
    let _left = item.value.relLeft
    await nextTick() // wait for dom update
    if (toolbarEl?.value) {
        const rect = toolbarEl.value?.getBoundingClientRect()
        _left = _left + (width.value - rect.width) / 2
    }
    left.value = _left
})

function addBlock() {
    let block: SitemapBlock
    if (item.value.meta._type === 'page') {
        let page: SitemapPage = item.value.meta
        block = page.addBlock()
    } else if (item.value.meta._type === 'block') {
        let currentBlock: SitemapBlock = item.value.meta
        let page: SitemapPage = currentBlock.page
        block = page.addBlockAt(page.blocks.indexOf(currentBlock) + 1)
    }

    app.canvas.setSelectedItem(block.ci)
    app.canvas.setEditedItem(block.ci)
}

function changeColor(color) {
    if (color === item.value.meta.color) return
    new EditItemPropCommand({ item: item.value.meta, prop: 'color', value: color }).execute()
}

function deleteItem() {
    new DeleteItemCommand({ item: item.value.meta }).execute()
    app.canvas.setSelectedItem(null)
    app.canvas.setEditedItem(null)
    app.canvas.setHoveredItem(null)
}

function duplicateItem() {
    const command = new DuplicateItemCommand({ item: item.value.meta })
    command.execute()
    app.canvas.setSelectedItem(command.clonedItem.ci)
}

</script>

<template>
    <div class="page-hover-toolbar all-center gap-2"
         ref="toolbarEl"
         :style="{
            left: `${left}px`,
            top: `${top}px`,
            height: `${height}px`,
            borderRadius: `${height / 2}px`,
            minWidth: `${width}px`
         }"
    >
        <a href="" @click.prevent="addBlock" v-tooltip="'Add Block'">
            <AddBlockIcon/>
        </a>

        <UColorPicker
            v-tooltip="'Color'"
            :model-value="item.meta.color"
            @update:model-value="changeColor"
        />

        <a href="" v-tooltip="'Link'">
            <LinkVariantIcon/>
        </a>

        <a href="" v-if="!item.meta.isRoot" @click.prevent="duplicateItem" v-tooltip="'Duplicate'">
            <ContentDuplicateIcon/>
        </a>

        <div class="separator" v-if="!item.meta.isRoot"></div>

        <a href="" class="text-danger" v-tooltip="'Delete'" v-if="!item.meta.isRoot" @click.prevent="deleteItem">
            <DeleteOutlineIcon/>
        </a>
    </div>
</template>

<style scoped lang="scss">

.page-hover-toolbar {
    position: absolute;
    padding-inline: 1em;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-0);
    background-color: var(--bg);
    font-size: 1.25em;
    z-index: 1;

    a {
        height: 1em;
    }
}

</style>
