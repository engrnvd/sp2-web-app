<script lang="ts" setup>
import { defineProps } from 'vue'
import { FetchRequest } from '@/helpers/fetch-request'
import ULoading from '@/U/components/ULoading.vue'

defineProps({
    req: FetchRequest,
})
</script>

<template>
    <tr v-if="req.loading">
        <td colspan="50">
            <ULoading/>
        </td>
    </tr>
</template>
