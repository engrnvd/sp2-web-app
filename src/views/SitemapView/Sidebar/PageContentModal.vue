<script lang="ts" setup>
import ApmEditor from 'src/components/common/ApmEditor/ApmEditor.vue'
import { useAppStore } from 'src/stores/app.store'
import UModal from 'src/U/components/UModal.vue'
import { computed } from 'vue'

const app = useAppStore()

const open = computed({
    get: () => !!app.contentModalPage,
    set: value => {
        if (!value) app.contentModalPage = null
    }
})
</script>

<template>
    <UModal
        v-model="open"
        title="Page Content">

        <ApmEditor
            v-model="app.contentModalPage.content"
        />
    </UModal>
</template>

<style scoped lang="scss">
</style>
