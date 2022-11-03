<script lang="ts" setup>
import { defineProps } from 'vue'

const props = withDefaults(defineProps<{
    active?: boolean,
}>(), {
    active: false,
})

const emit = defineEmits(['click'])
</script>

<template>
    <a href="" @click.prevent="e => emit('click', e)" class="ae-menu-btn all-center" :class="{active}">
        <slot></slot>
    </a>
</template>

<style scoped lang="scss">
.ae-menu-btn {
    --size: 1.25em;
    width: var(--size);
    height: var(--size);
    cursor: pointer;
    border-radius: 0.25em;
    color: var(--main-text-color);

    &:hover:not(.disabled) {
        background-color: rgba(0, 0, 0, 0.1);
    }

    &:active:not(.disabled) {
        background-color: rgba(0, 0, 0, 0.2);
    }

    &.active {
        background-color: var(--primary-lighter);
        color: var(--primary);
    }
}
</style>
