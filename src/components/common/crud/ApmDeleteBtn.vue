<script lang="ts" setup>
import { FetchRequest } from '@/helpers/fetch-request'
import DeleteIcon from '@/material-design-icons/Delete.vue'
import UIconBtn from '@/U/components/UIconBtn.vue'
import { useConfirm } from '@/U/composables/Confirm'
import { defineProps } from 'vue'

const props = defineProps({
    req: FetchRequest,
    id: {},
})

const deleteReq = new FetchRequest('', 'DELETE')

async function remove() {
    const yes = await useConfirm('Delete record', 'Are you sure?')
    if (!yes) return

    deleteReq.url = props.req.url + '/' + props.id
    deleteReq.send().then(res => {
        const data = props.req.data?.data || props.req.data || []
        const item = data.find(i => i.id === props.id)
        data.splice(data.indexOf(item), 1)
    })
}
</script>

<template>
    <UIconBtn danger tooltip="Delete" @click="remove" :loading="deleteReq.loading">
        <DeleteIcon/>
    </UIconBtn>
</template>
