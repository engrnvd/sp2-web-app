<script lang="ts" setup>
import { defineProps } from 'vue'
import { FetchRequest } from '@/helpers/fetch-request'

defineProps({
    req: FetchRequest,
})
</script>

<template>
    <tr v-if="!req.loading && !req.data?.data?.length">
        <td colspan="50">
            No records found
        </td>
    </tr>
</template>
