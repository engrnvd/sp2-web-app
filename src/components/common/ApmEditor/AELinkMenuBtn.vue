<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import AEMenuBtn from 'src/components/common/ApmEditor/AEMenuBtn.vue'
import CheckIcon from 'src/material-design-icons/Check.vue'
import LinkVariantIcon from 'src/material-design-icons/LinkVariant.vue'
import LinkVariantRemoveIcon from 'src/material-design-icons/LinkVariantRemove.vue'
import UIconBtn from 'src/U/components/UIconBtn.vue'
import UInput from 'src/U/components/UInput.vue'
import { useOutsideClick } from 'src/U/composables/useOutsideClick'
import { defineProps, reactive, ref } from 'vue'

const props = withDefaults(defineProps<{
    editor?: Editor,
}>(), {
    editor: null,
})

const state = reactive({
    url: '',
    showForm: false,
})
const formEl = ref()

function handleLinkClick(e) {
    const editor = props.editor
    state.url = editor.getAttributes('link').href || ''
    state.showForm = true
}

function removeLink() {
    props.editor.chain().focus().extendMarkRange('link').unsetLink().run()
    state.showForm = false
}

function setUrl() {
    const editor = props.editor
    let url = state.url

    if (!url.match(/^http/)) url = 'http://' + url

    if (url === '') {
        removeLink()
        return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    state.showForm = false
}

useOutsideClick(formEl, () => {
    state.showForm = false
})

</script>

<template>
    <div class="ae-link-menu-btn">
        <form @submit.prevent="setUrl" ref="formEl" v-show="state.showForm"
              class="p-2 url-input d-flex gap-2 align-items-center shadow-0">
            <UInput class="flex-grow-1" v-model="state.url"/>
            <UIconBtn :secondary="false" @click="setUrl" transparent>
                <CheckIcon/>
            </UIconBtn>
            <UIconBtn transparent secondary @click.prevent.stop="removeLink" v-if="editor.getAttributes('link').href">
                <LinkVariantRemoveIcon/>
            </UIconBtn>
        </form>
        <AEMenuBtn
            :active="editor.isActive('link')"
            :class="{disabled: editor.isEmpty}"
            @click.prevent.stop="handleLinkClick">
            <LinkVariantIcon/>
        </AEMenuBtn>
    </div>
</template>

<style scoped lang="scss">
.ae-link-menu-btn {
    position: relative;

    .url-input {
        position: absolute;
        left: 0;
        top: 120%;
        min-width: 20em;
        background-color: var(--bg);
        border-radius: 0.5em;

        --form-element-height: 2.25em;

        .u-btn {
            min-width: 0;
        }
    }
}
</style>
