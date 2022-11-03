<script lang="ts" setup>
import { EditItemPropCommand } from 'src/commands/EditItemPropCommand'
import ApmEditor from 'src/components/common/ApmEditor/ApmEditor.vue'
import { useAppStore } from 'src/stores/app.store'
import UModal from 'src/U/components/UModal.vue'
import USwitch from 'src/U/components/USwitch.vue'
import { computed, reactive, watch } from 'vue'

const app = useAppStore()
const state = reactive({
    preview: false
})
let page = reactive({ content: '' })

const open = computed({
    get: () => !!app.contentModalPage,
    set: value => {
        if (!value) app.contentModalPage = null
    }
})

function ok() {
    new EditItemPropCommand({ item: app.contentModalPage, prop: 'content', value: page.content }).execute()
    app.contentModalPage = null
}

const hasChanged = computed(() => page.content !== app.contentModalPage?.content)

watch(() => app.contentModalPage, () => {
    if (app.contentModalPage) page.content = app.contentModalPage.content
    else page.content = ''
})
</script>

<template>
    <UModal
        v-model="open"
        size="lg"
        ok-only
        @ok="ok"
        :ok-title="hasChanged ? 'save' : 'close'"
        title="Page Content">
        <template #header>
            <div class="d-flex align-items-center mr-4">
                <h2 class="m-0 flex-grow-1">Page Content</h2>
                <USwitch v-model="state.preview" label="Preview"/>
            </div>
        </template>

        <div v-if="state.preview" v-html="page.content"></div>

        <ApmEditor
            v-show="!state.preview"
            ref="editor"
            v-model="page.content"
        />
    </UModal>
</template>

<style scoped lang="scss">
</style>
