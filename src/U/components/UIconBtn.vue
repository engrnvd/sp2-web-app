<script lang="ts" setup>
import { defineProps } from 'vue'
import UButton from '@/U/components/UButton.vue'

defineProps({
    tooltip: String,
})
</script>

<template>
    <UButton v-bind="$attrs" icon compact transparent secondary v-tooltip="tooltip">
        <slot/>
    </UButton>
</template>
