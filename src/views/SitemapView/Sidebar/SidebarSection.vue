<script lang="ts" setup>
defineProps({
    title: String,
})
</script>

<template>
    <div class="sidebar-section px-3 py-3">
        <div class="header mb-3" v-if="title || $slots.header">
            <slot name="header">{{ title }}</slot>
        </div>
        <div class="body">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss">
.sidebar-section {
    border-bottom: 1px solid var(--border-color);

    .header {
        font-weight: bold;
    }

    .apm-editable {
        input {
            padding: 0.25em 0.5em;
            min-width: 7ch;
        }
    }
}
</style>
