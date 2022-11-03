<script lang="ts" setup>
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { TextAlign } from '@tiptap/extension-text-align'
import { Underline } from '@tiptap/extension-underline'
import { StarterKit } from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import ApmEditorMenu from 'src/components/common/ApmEditor/ApmEditorMenu.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
    modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const editor = ref(null)

onMounted(() => {
    editor.value = new Editor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                protocols: ['ftp', 'mailto'],
                openOnClick: true,
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            })
        ],
        content: props.modelValue,
        onUpdate: () => {
            emit('update:modelValue', editor.value.getHTML())
        },
        autofocus: true,
    })
})

onBeforeUnmount(() => {
    editor.value.destroy()
})

defineExpose({ editor })
</script>


<template>
    <div class="apm-editor">
        <ApmEditorMenu :editor="editor" v-if="editor"/>
        <EditorContent class="apm-editor-content" v-if="editor" :editor="editor"/>
    </div>
</template>

<style lang="scss">
.apm-editor {
    position: relative;
    --menu-height: 3em;
    overflow: hidden;

    .apm-editor-menu {
        position: absolute;
        height: var(--menu-height);
        z-index: 1;
        width: 100%;
        box-shadow: var(--shadow-0);
    }

    .ProseMirror {
        border: var(--u-input-border-width) solid var(--border-color);
        border-radius: var(--form-element-border-radius);
        padding: var(--menu-height) 1em 1em;
        min-height: 10em;
        transition: border-color 0.5s ease-out;

        &:focus {
            outline: none;
        }

        a:hover {
            cursor: pointer;
        }

        img {
            &.ProseMirror-selectednode {
                outline: 2px solid var(--primary);
            }
        }
    }
}
</style>
