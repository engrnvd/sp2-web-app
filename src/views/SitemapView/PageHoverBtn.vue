<script lang="ts" setup>
import { defineProps } from 'vue'
import UButton from '../../U/components/UButton.vue'

defineProps({
    left: Number,
    top: Number,
})

</script>

<template>
    <UButton
        class="page-hover-btn"
        compact icon
        :style="{left: `${left}px`, top: `${top}px`}"
    >
        <slot></slot>
    </UButton>
</template>

<style lang="scss">
@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.page-hover-btn {
    position: absolute;
    animation: fade-in 0.25s ease-out;
    --form-element-height: 1.25rem !important;
}
</style>
