<script lang="ts" setup>
import ArrowCollapseIcon from 'src/material-design-icons/ArrowCollapse.vue'
import { useAppStore } from 'src/stores/app.store'
import UIconBtn from 'src/U/components/UIconBtn.vue'

const app = useAppStore()

</script>

<template>
    <div class="all-center">
        <UIconBtn
            :secondary="false"
            :transparent="!app.simpleView"
            tooltip="Simple View"
            @click="app.simpleView = !app.simpleView">
            <ArrowCollapseIcon/>
        </UIconBtn>
    </div>
</template>

<style lang="scss" scoped>
</style>
