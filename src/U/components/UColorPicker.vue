<script setup lang="ts">
import { useOutsideClick } from '@/U/composables/useOutsideClick'
import { defineProps, ref } from 'vue'

// props
const props = defineProps({
    modelValue: String,
    showToggleBtn: { type: Boolean, default: false },
    pickerPosition: String,
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

// state
const showColorPicker = ref(false)
const el = ref()

// methods
function closeColorPicker() {
    if (props.showToggleBtn) showColorPicker.value = false
}

function selectColor(color) {
    emit('update:modelValue', color)
}

useOutsideClick(el, closeColorPicker)

</script>

<template>
    <div class="apm-color-picker" ref="el">
        <a class="color-selector"
           v-if="showToggleBtn"
           href="#"
           @click.stop="showColorPicker = !showColorPicker"
           :style="{backgroundColor: modelValue || '#adb5bd'}">
        </a>
        <div :class="`color-picker ${pickerPosition}`" v-if="showColorPicker || !showToggleBtn">
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
    </div>
</template>

<style scoped lang="scss">
.apm-color-picker {
    --size: 1em;
    position: relative;
    max-width: var(--size);
}

.color-selector {
    display: inline-block;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    line-height: 1;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

.color-picker {
    position: absolute;
    top: calc(100% + 0.5em);
    width: 12.5rem;
    padding: 1em;
    background-color: var(--bg);
    border-radius: 0.5em;
    z-index: 10;
    box-shadow: var(--shadow-1);

    &.left {
        right: 0;
    }
}

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
</style>
