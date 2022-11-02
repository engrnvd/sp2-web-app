<script lang="ts" setup>
import { _getInputTextSize } from 'src/helpers/dom-helper'
import { FetchRequest } from 'src/helpers/fetch-request'
import AlertCircleIcon from 'src/material-design-icons/AlertCircle.vue'
import CheckIcon from 'src/material-design-icons/Check.vue'
import CheckCircleIcon from 'src/material-design-icons/CheckCircle.vue'
import CloseIcon from 'src/material-design-icons/Close.vue'
import UIconBtn from 'src/U/components/UIconBtn.vue'
import ULoading from 'src/U/components/ULoading.vue'
import UTextarea from 'src/U/components/UTextarea.vue'
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'

const props = defineProps({
    modelValue: {},
    type: { default: 'text' },
    confirmBeforeSave: { type: Boolean, default: false },
    url: String,
    filedName: String,
})
const emit = defineEmits(['update:modelValue'])

// state
let _value: any = ref(null)
let el = ref()
let req = reactive(new FetchRequest(props.url, 'PUT').withProps({
    delay: 500,
    delayFirstRequest: true,
}))
let showSuccessIcon = ref(false)

// computed
let inputEl = computed(() => el.value.querySelector('input, select'))
let hasChanged = computed(() => _value.value !== props.modelValue)

// mounted + watch
onMounted(() => {
    _value.value = props.modelValue
})

watch(() => props.modelValue, (v) => {
    _value.value = props.type === 'checkbox' ? !!v : v
})

watch(_value, () => {
    updateWidth()
    if (!props.confirmBeforeSave) ok()
})

// methods
async function updateWidth() {
    if (!inputEl.value) return
    await nextTick()
    let w = _getInputTextSize(inputEl.value)
    inputEl.value.style.width = `${w}px`
}

function ok() {
    if (!hasChanged.value) return

    if (!props.url || !props.filedName) {
        emit('update:modelValue', _value.value)
        return
    }

    req.url = props.url
    req.send({
        body: JSON.stringify({
            name: props.filedName,
            value: _value.value
        })
    }).then(res => {
        emit('update:modelValue', _value.value)
        showSuccessIcon.value = true
        setTimeout(() => showSuccessIcon.value = false, 1000)
    })
}

function cancel() {
    _value.value = props.modelValue
    req.error = ''
    req.loaded = false
    if (inputEl.value) inputEl.value.blur()
}

</script>

<template>
    <div ref="el" class="apm-editable d-flex align-items-center gap-2">
        <slot :value="_value">
            <UTextarea v-if="type === 'textarea'" v-model="_value" placeholder="not set"/>
            <input v-else :type="type" v-model="_value" placeholder="not set"/>
        </slot>
        <ULoading v-if="req.loading"/>
        <AlertCircleIcon v-if="req.error" class="text-danger" v-tooltip="req.error"/>
        <Transition name="fade">
            <CheckCircleIcon v-if="showSuccessIcon" class="text-success" v-tooltip="`Saved`"/>
        </Transition>
        <div class="d-flex gap-2 apm-editable-btns" v-if="confirmBeforeSave && hasChanged && !req.loading">
            <UIconBtn success @click="ok">
                <CheckIcon/>
            </UIconBtn>
            <UIconBtn @click="cancel">
                <CloseIcon/>
            </UIconBtn>
        </div>
    </div>
</template>

<style lang="scss">
.apm-editable {
    width: fit-content;

    input {
        color: var(--main-text-color);
        box-sizing: content-box;
        min-width: 2ch;
        padding: 0.5em 1em;
        border: 1px solid transparent;
        background-color: transparent;
        flex-grow: 1;
        border-radius: var(--border-radius);
        outline: none;

        &:hover {
            border-color: var(--border-color) !important;
        }

        &:focus {
            border-color: var(--primary) !important;
        }

        &[type=checkbox], &[type=radio] {
            width: 1em;
            max-width: 1em;
            border: none;
        }

        &[type=color] {
            --color-input-size: 2em;
            padding: 0;
            width: var(--color-input-size);
            height: var(--color-input-size);
            min-height: var(--color-input-size);
            max-width: var(--color-input-size);
        }
    }

    .u-input-container {
        width: 100%;

        .u-input {
            border-width: 1px;
        }
    }

    .apm-editable-btns {
        .u-btn {
            --form-element-height: 1.5rem;
        }
    }
}
</style>
