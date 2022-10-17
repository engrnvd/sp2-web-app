<script lang="ts" setup>
import UChip from 'src/U/components/UChip.vue'
import UInput from 'src/U/components/UInput.vue'
import { inputEmits, inputProps } from 'src/U/helpers/input-helper'
import { computed, defineProps } from 'vue'

const props = defineProps({
    ...inputProps,
    choices: { type: Array, default: () => [] }
})
const emit = defineEmits([...inputEmits])

const _value = computed({
    get: () => props.modelValue || [],
    set: v => emit('update:modelValue', v)
})

function isSelected(choice) {
    return _value.value.includes(choice)
}

function onClick(choice) {
    if (isSelected(choice)) {
        _value.value = _value.value.filter(c => c !== choice)
    } else {
        _value.value = [..._value.value, choice]
    }
}

</script>

<template>
    <UInput v-bind="$props" class="u-choices">
        <div v-if="label" class="u-choices-label mb-2 text-small">{{ label }}</div>
        <div class="choices-list d-flex align-items-center gap-2">
            <UChip
                v-for="choice in choices"
                @click="onClick(choice)"
                :color="isSelected(choice) ? 'primary' : ''">
                {{ choice }}
            </UChip>
        </div>
    </UInput>
</template>

