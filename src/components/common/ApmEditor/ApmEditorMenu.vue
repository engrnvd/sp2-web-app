<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import AEImgMenuBtn from 'src/components/common/ApmEditor/AEImgMenuBtn.vue'
import AELinkMenuBtn from 'src/components/common/ApmEditor/AELinkMenuBtn.vue'
import AEMenuBtn from 'src/components/common/ApmEditor/AEMenuBtn.vue'
import CodeTagsIcon from 'src/material-design-icons/CodeTags.vue'
import FormatAlignCenterIcon from 'src/material-design-icons/FormatAlignCenter.vue'
import FormatAlignJustifyIcon from 'src/material-design-icons/FormatAlignJustify.vue'
import FormatAlignLeftIcon from 'src/material-design-icons/FormatAlignLeft.vue'
import FormatAlignRightIcon from 'src/material-design-icons/FormatAlignRight.vue'
import FormatBoldIcon from 'src/material-design-icons/FormatBold.vue'
import FormatHeader1Icon from 'src/material-design-icons/FormatHeader1.vue'
import FormatItalicIcon from 'src/material-design-icons/FormatItalic.vue'
import FormatListBulletedIcon from 'src/material-design-icons/FormatListBulleted.vue'
import FormatListNumberedIcon from 'src/material-design-icons/FormatListNumbered.vue'
import FormatQuoteOpenIcon from 'src/material-design-icons/FormatQuoteOpen.vue'
import FormatStrikethroughVariantIcon from 'src/material-design-icons/FormatStrikethroughVariant.vue'
import FormatUnderlineIcon from 'src/material-design-icons/FormatUnderline.vue'
import { defineProps } from 'vue'

const props = withDefaults(defineProps<{
    editor?: Editor,
}>(), {
    editor: null,
})

</script>

<template>
    <div class="apm-editor-menu d-flex align-items-center gap-1 p-3">
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

        <AEMenuBtn
            :active="editor.isActive('italic')"
            @click="editor.chain().focus().toggleItalic().run()">
            <FormatItalicIcon/>
        </AEMenuBtn>

        <AEMenuBtn
            :active="editor.isActive('underline')"
            @click="editor.chain().focus().toggleUnderline().run()">
            <FormatUnderlineIcon/>
        </AEMenuBtn>

        <AEMenuBtn
            :active="editor.isActive('strike')"
            @click="editor.chain().focus().toggleStrike().run()">
            <FormatStrikethroughVariantIcon/>
        </AEMenuBtn>

        <AEMenuBtn
            :active="editor.isActive('blockquote')"
            @click="editor.chain().focus().toggleBlockquote().run()">
            <FormatQuoteOpenIcon/>
        </AEMenuBtn>

        <AEMenuBtn
            :active="editor.isActive('code')"
            @click="editor.chain().focus().toggleCode().run()">
            <CodeTagsIcon/>
        </AEMenuBtn>

        <div class="separator"></div>

        <AEMenuBtn
            :active="editor.isActive('bulletList')"
            @click="editor.chain().focus().toggleBulletList().run()">
            <FormatListBulletedIcon/>
        </AEMenuBtn>

        <AEMenuBtn
            :active="editor.isActive('orderedList')"
            @click="editor.chain().focus().toggleOrderedList().run()">
            <FormatListNumberedIcon/>
        </AEMenuBtn>

        <div class="separator"></div>

        <AEMenuBtn
            :active="editor.isActive({ textAlign: 'left' })"
            @click="editor.chain().focus().setTextAlign('left').run()">
            <FormatAlignLeftIcon/>
        </AEMenuBtn>
        <AEMenuBtn
            :active="editor.isActive({ textAlign: 'center' })"
            @click="editor.chain().focus().setTextAlign('center').run()">
            <FormatAlignCenterIcon/>
        </AEMenuBtn>
        <AEMenuBtn
            :active="editor.isActive({ textAlign: 'right' })"
            @click="editor.chain().focus().setTextAlign('right').run()">
            <FormatAlignRightIcon/>
        </AEMenuBtn>
        <AEMenuBtn
            :active="editor.isActive({ textAlign: 'justify' })"
            @click="editor.chain().focus().setTextAlign('justify').run()">
            <FormatAlignJustifyIcon/>
        </AEMenuBtn>

        <div class="separator"></div>

        <AELinkMenuBtn :editor="editor"/>
        <AEImgMenuBtn :editor="editor"/>
    </div>
</template>

<style scoped lang="scss">
</style>
