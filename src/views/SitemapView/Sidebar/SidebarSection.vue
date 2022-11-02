<script lang="ts" setup>
defineProps({
    title: String,
})
</script>

<template>
    <div class="sidebar-section px-3 py-3">
        <slot name="header">
            <div class="header mb-3" v-if="title">{{ title }}</div>
        </slot>
        <div class="body">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.sidebar-section {
    border-bottom: 1px solid var(--border-color);

    .header {
        font-weight: bold;
    }
}
</style>
