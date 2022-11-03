<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import AEMenuBtn from 'src/components/common/ApmEditor/AEMenuBtn.vue'
import ImageOutlineIcon from 'src/material-design-icons/ImageOutline.vue'
import { defineProps, reactive, ref } from 'vue'

const props = withDefaults(defineProps<{
    editor?: Editor,
}>(), {
    editor: null,
})

const fileInput = ref()
const state = reactive({
    url: '',
})

function chooseFile() {
    fileInput.value.click()
}

function handleClick() {
    chooseFile()
}

async function pickFile() {
    let file = fileInput.value.files
    if (file && file[0]) {
        let reader = new FileReader
        reader.onload = async (e) => {
            props.editor.chain().focus().setImage({ src: e.target.result }).run()
        }
        reader.readAsDataURL(file[0])
    }
}
</script>

<template>
    <div class="ae-img-menu-btn">
        <AEMenuBtn @click.prevent.stop="handleClick">
            <ImageOutlineIcon/>
        </AEMenuBtn>
        <input ref="fileInput" type="file" accept="image/*" @input="pickFile" v-show="false">
    </div>
</template>
