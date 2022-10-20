<script setup lang="ts">
import UDropdown from '@/U/components/UDropdown.vue'
import { defineProps } from 'vue'

// props
const props = defineProps({
    modelValue: String,
    colors: {
        type: Array,
        default: () => [
            '#e66e63', '#f47ea2', '#f48a68', '#c2915d',
            '#d25ae6', '#a37cf2', '#7086f9', '#2196f3',
            '#03a9f4', '#00b3a1', '#4caf50', '#83b337',
            '#c6c127', '#d8b330', '#adb5bd', '#83a1b0',
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
