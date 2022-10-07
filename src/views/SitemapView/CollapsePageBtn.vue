<script lang="ts" setup>
import { computed } from 'vue'
import { SitemapPage } from '../../classes/SitemapPage'
import ChevronDownIcon from '../../material-design-icons/ChevronDown.vue'
import ChevronUpIcon from '../../material-design-icons/ChevronUp.vue'
import { useAppStore } from '../../stores/app.store'
import PageHoverBtn from './PageHoverBtn.vue'

const app = useAppStore()
const item = computed(() => app.canvas?.hoveredItem)

const left = computed(() => item.value.relLeft)
const top = computed(() => item.value.relBottom)

function onClick() {
    const page: SitemapPage = item.value.meta
    page.toggleCollapse()
}

</script>

<template>
    <PageHoverBtn class="collapse-page-btn" :left="left" :top="top" @click="onClick">
        <ChevronUpIcon v-if="!item.meta.collapsed"/>
        <ChevronDownIcon v-else/>
    </PageHoverBtn>
</template>

<style scoped lang="scss">
.collapse-page-btn {
    transform: translateX(-50%) translateY(-25%);
}
</style>
