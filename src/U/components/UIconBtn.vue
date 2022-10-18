<script lang="ts" setup>
import UButton from '@/U/components/UButton.vue'
import { defineProps } from 'vue'

defineProps({
    tooltip: String,
})
</script>

<template>
    <UButton v-tooltip="tooltip" compact icon secondary transparent v-bind="{...$props, ...$attrs}">
        <slot/>
    </UButton>
</template>
