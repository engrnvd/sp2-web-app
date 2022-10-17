<script lang="ts" setup>
import CheckboxBlankOutlineIcon from 'src/material-design-icons/CheckboxBlankOutline.vue'
import CheckboxMarkedIcon from 'src/material-design-icons/CheckboxMarked.vue'
import UButton from 'src/U/components/UButton.vue'
import UInput from 'src/U/components/UInput.vue'
import { inputEmits, inputProps } from 'src/U/helpers/input-helper'
import { computed, defineProps } from 'vue'

const props = defineProps({
    ...inputProps
})

const emit = defineEmits([...inputEmits])

const _value = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v)
})

</script>

<template>
    <UInput v-bind="$props" class="u-checkbox">
        <UButton
            transparent icon secondary
            @click.prevent="_value = !_value">
            <div class="icon d-flex align-items-center">
                <CheckboxMarkedIcon v-if="_value"/>
                <CheckboxBlankOutlineIcon v-else/>
            </div>
        </UButton>
        {{ label }}
    </UInput>
</template>

<style lang="scss">

.u-checkbox {
    .u-form-group {
        display: flex;
        align-items: center;
        gap: 0.25em;
    }

    .u-btn {
        .icon {
            color: var(--u-input-color);
            font-size: 1.125em;
        }
    }
}

</style>
