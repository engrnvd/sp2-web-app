<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
    modelValue: String,
    label: String,
    helpText: String,
    errors: { type: Array, default: () => [] },
    type: {
        type: String,
        default: 'text'
    },
})

defineEmits(['update:modelValue'])

</script>

<template>
    <div class="u-input-container" :class="{'has-error': errors.length}">
        <div class="u-form-group">
            <input
                class="u-input"
                :type="type"
                :placeholder="label"
                :value="modelValue"
                @input="e => $emit('update:modelValue', e.target.value)">
            <label v-if="label">{{ label }}</label>
        </div>
        <div class="help-text text-small p-2" v-for="error in errors">
            {{ error }}
        </div>
        <div class="help-text text-small p-2" v-if="helpText">{{ helpText }}</div>
    </div>
</template>

<style scoped lang="scss">
$uInputPadding: 0.75em;
.u-input-container {
    --u-input-color: var(--primary);
    --u-input-text-color: var(--main-text-color);
    --u-input-border-color: var(--border-color);

    &.has-error {
        --u-input-color: var(--danger);
        --u-input-text-color: var(--danger);
        --u-input-border-color: var(--danger);
    }

    color: var(--u-input-text-color);

    .u-form-group {
        position: relative;

        .u-input {
            border: 2px solid var(--u-input-border-color);
            border-radius: var(--border-radius);
            height: var(--form-element-height);
            padding: $uInputPadding;
            outline: none;
            background-color: var(--bg);
            transition: border-color 0.2s ease-out;
            color: var(--u-input-text-color);
            width: 100%;

            &::placeholder {
                color: transparent;
            }

            &:focus {
                border-color: var(--u-input-color);

                & + label {
                    color: var(--u-input-color);
                }
            }

            &:focus, :not(&:placeholder-shown) {
                & + label {
                    transform: translateY(-1.6em) scale(0.8);
                    background-color: var(--bg);
                    display: inline-block;
                    padding-inline: 0.25em;
                }
            }
        }

        label {
            position: absolute;
            top: 50%;
            left: $uInputPadding;
            transform: translateY(-50%);
            transition: transform 0.2s ease-out;
            transform-origin: 0 0;
            pointer-events: none;
            font-weight: normal;
        }
    }

    .help-text {

    }
}

</style>
