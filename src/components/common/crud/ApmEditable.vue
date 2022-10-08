<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
    type: {
        type: String,
        default: 'text',
    },
    field: {
        type: String,
        required: true,
    },
    modelValue: {
        required: true,
    },
    saveOnChange: {
        type: Boolean,
        default: false,
    },
    url: String,
    checkboxLabel: String, // for checkbox only
    ddOptionsUrl: String, // for select only
    ddOptions: Array, // for select only (will be preferred over ddOptionsUrl)
    ddValueField: String, // for select only
    ddLabelField: String, // for select only
    charLimit: [String, Number], // for textarea only
})

</script>

<template>
    <div>
        {{ modelValue }}
    </div>
</template>

<style scoped lang="scss">
</style>
