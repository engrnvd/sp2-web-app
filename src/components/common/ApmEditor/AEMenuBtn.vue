<script lang="ts" setup>
import { defineProps } from 'vue'

const props = withDefaults(defineProps<{
    active: boolean,
}>(), {
    active: false,
})

</script>

<template>
    <div class="ae-menu-btn all-center" :class="{active}">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.ae-menu-btn {
    --size: 1.25em;
    width: var(--size);
    height: var(--size);
    cursor: pointer;
    border-radius: 0.25em;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    &:active {
        background-color: rgba(0, 0, 0, 0.2);
    }

    &.active {
        background-color: rgba(0, 0, 0, 0.25);
    }
}
</style>
