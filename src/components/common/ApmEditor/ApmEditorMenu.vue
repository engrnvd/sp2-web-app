<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import AEMenuBtn from 'src/components/common/ApmEditor/AEMenuBtn.vue'
import FormatBoldIcon from 'src/material-design-icons/FormatBold.vue'
import FormatHeader1Icon from 'src/material-design-icons/FormatHeader1.vue'
import { defineProps } from 'vue'

const props = withDefaults(defineProps<{
    editor?: Editor,
}>(), {
    editor: null,
})

</script>

<template>
    <div class="apm-editor-menu d-flex align-items-center gap-1 p-2">
        <AEMenuBtn
            :active="editor.isActive('heading', {level: 1})"
            @click="editor.chain().focus().toggleHeading({level: 1}).run()">
            <FormatHeader1Icon/>
        </AEMenuBtn>

        <AEMenuBtn
            :active="editor.isActive('bold')"
            @click="editor.chain().focus().toggleBold().run()">
            <FormatBoldIcon/>
        </AEMenuBtn>

    </div>
</template>

<style scoped lang="scss">
</style>
