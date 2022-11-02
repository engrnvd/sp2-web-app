<script lang="ts" setup>
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
        ],
        content: props.modelValue,
        onUpdate: () => {
            emit('update:modelValue', editor.value.getHTML())
        },
        injectCSS: false,
        autofocus: true,
    })
})

onBeforeUnmount(() => {
    editor.value.destroy()
})

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
    --menu-height: 2em;

    .apm-editor-menu {
        position: absolute;
        height: var(--menu-height);
    }

    .ProseMirror {
        border: var(--u-input-border-width) solid var(--border-color);
        border-radius: var(--form-element-border-radius);
        padding: var(--menu-height) 0.8em 0.8em;
        min-height: 8em;

        p, h1, h2, h3, h4, h5 {
            &:first-child {
                margin-top: 0;
            }
        }

        &:focus {
            outline: none;
            border-color: var(--primary);
        }
    }
}
</style>
