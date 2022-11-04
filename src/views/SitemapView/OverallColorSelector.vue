<script lang="ts" setup>
import { ReplaceColorCommand } from 'src/commands/ReplaceColorCommand'
import { useAppStore } from 'src/stores/app.store'
import UColorPicker from 'src/U/components/UColorPicker.vue'

const props = withDefaults(defineProps<{
    colors: string[] | Set<string>,
}>(), {
    colors: () => []
})

const app = useAppStore()

function onChange(color, newColor) {
    new ReplaceColorCommand({ color, newColor }).execute()
}
</script>

<template>
    <div class="overall-color-selector d-flex align-items-center gap-2 flex-wrap">
        <UColorPicker
            left
            v-for="color in colors"
            :key="color"
            :model-value="color"
            @update:modelValue="c => onChange(color, c)"
        />
    </div>
</template>
