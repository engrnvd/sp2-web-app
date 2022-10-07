<script setup lang="ts">
import UDropdown from '@/U/components/UDropdown.vue'
import { defineProps } from 'vue'

// props
const props = defineProps({
    modelValue: String,
    colors: {
        type: Array,
        default: () => [
            '#888888', '#adb5bd', '#f44335', '#e91e63',
            '#9c27b0', '#6739b7', '#3f51b5', '#2196f3',
            '#03a9f4', '#00b3a1', '#4caf50', '#8bc34b',
            '#cddc38', '#ffeb3a', '#ffc108', '#ff9801',
            '#ff5723', '#795548', '#9d9e9d', '#607d8b',
        ]
    }
})

// event
const emit = defineEmits(['update:modelValue'])

// methods
function selectColor(color) {
    emit('update:modelValue', color)
}

</script>

<template>
    <UDropdown class="apm-color-picker" v-bind="$attrs">
        <a class="apc-button"
           href="#"
           :style="{backgroundColor: modelValue || '#adb5bd'}">
        </a>
        <template #content>
            <div class="apc-dropdown">
                <div class="color-list mb-3">
                    <div class="color-item"
                         v-for="color in colors" :key="color"
                         :style="{backgroundColor: color}"
                         :class="{selected: color === modelValue}"
                         @click="selectColor(color)"
                    ></div>
                </div>
                <input
                    class="color-input"
                    type="color"
                    :value="modelValue || '#adb5bd'"
                    @input="e => selectColor(e.target.value)"
                >
            </div>
        </template>
    </UDropdown>
</template>

<style scoped lang="scss">
.apm-color-picker {
    --size: 1em;
    max-width: var(--size);

    .apc-button {
        display: inline-block;
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        line-height: 1;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    }

    .apc-dropdown {
        width: 12.5rem;
        padding: 1em;

        .color-input {
            width: 100%;
        }

        .color-list {
            display: flex;
            flex-wrap: wrap;
            gap: 1em;

            .color-item {
                width: 1.5rem;
                height: 1.5rem;
                border-radius: 50%;
                cursor: pointer;
                transition: transform 0.15s ease-out;
                position: relative;

                &:hover {
                    transform: scale(1.25);
                }

                &.selected {
                    &::before {
                        content: '';
                        position: absolute;
                        width: calc(100% + 4px);
                        height: calc(100% + 4px);
                        left: 50%;
                        top: 50%;
                        transform: translateX(-50%) translateY(-50%);
                        border-radius: 50%;
                        border: 2px solid #777;
                    }
                }
            }
        }
    }

}

</style>
