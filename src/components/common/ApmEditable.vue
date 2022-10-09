<script lang="ts" setup>
import { FetchRequest } from 'src/helpers/fetch-request'
import { toFormData } from 'src/helpers/misc'
import AlertCircleIcon from 'src/material-design-icons/AlertCircle.vue'
import CheckIcon from 'src/material-design-icons/Check.vue'
import CheckCircleIcon from 'src/material-design-icons/CheckCircle.vue'
import CloseIcon from 'src/material-design-icons/Close.vue'
import UIconBtn from 'src/U/components/UIconBtn.vue'
import ULoading from 'src/U/components/ULoading.vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'

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
function updateWidth() {
    inputEl.value.style.width = `${_value.value.toString().length}ch`
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
    })
}

function cancel() {
    _value.value = props.modelValue
    inputEl.value.blur()
}

</script>

<template>
    <div ref="el" class="apm-editable d-flex align-items-center gap-2">
        <slot :value="_value">
            <input :type="type" v-model="_value"/>
        </slot>
        <ULoading v-if="req.loading"/>
        <AlertCircleIcon v-if="req.error" class="text-danger" v-tooltip="req.error"/>
        <CheckCircleIcon v-if="req.loaded && !req.error" class="text-success" v-tooltip="`Saved`"/>
        <template v-if="confirmBeforeSave && hasChanged">
            <UIconBtn success @click="ok">
                <CheckIcon/>
            </UIconBtn>
            <UIconBtn @click="cancel">
                <CloseIcon/>
            </UIconBtn>
        </template>
    </div>
</template>

<style lang="scss">
.apm-editable {
    width: fit-content;

    input {
        box-sizing: content-box;
        min-width: 2ch;
        padding: 0.5em 1em;
        border: 1px solid transparent;
        background-color: transparent;
        flex-grow: 1;
        border-radius: var(--border-radius);
        outline: none;

        &:hover, &:focus {
            border-color: var(--primary);
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
}
</style>
