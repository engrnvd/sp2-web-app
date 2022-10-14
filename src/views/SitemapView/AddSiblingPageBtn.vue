<script lang="ts" setup>
import { computed } from 'vue'
import { SitemapPage } from 'src/classes/SitemapPage'
import PlusIcon from '../../material-design-icons/Plus.vue'
import { useAppStore } from 'src/stores/app.store'
import PageHoverBtn from './PageHoverBtn.vue'

const props = withDefaults(defineProps<{
    location: 'before' | 'after',
}>(), {
    location: 'after',
})

const app = useAppStore()
const item = computed(() => app.canvas?.hoveredItem)
const left = computed(() => app.hasHorizontalView && props.location === 'before' ? item.value.relLeft : item.value.relRight)
const top = computed(() => app.hasHorizontalView ? item.value.relCy : (props.location === 'after' ? item.value.relBottom : item.value.relTop))

function onClick() {
    const page: SitemapPage = item.value.meta
    page.addSibling(props.location)
}

</script>

<template>
    <PageHoverBtn v-tooltip="`Add page ${location}`" class="add-sibling-page-btn" :left="left" :top="top"
                  @click="onClick">
        <PlusIcon/>
    </PageHoverBtn>
</template>

<style scoped lang="scss">
.add-sibling-page-btn {
    transform: translateX(-50%) translateY(-50%);
}
</style>
