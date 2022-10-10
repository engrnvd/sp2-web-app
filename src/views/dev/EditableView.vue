<script lang="ts" setup>

import ApmEditable from 'src/components/common/ApmEditable.vue'
import { ref } from 'vue'

let name = ref('Naveed')
let age = ref(30)

</script>

<template>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr)">
        <ApmEditable v-model="name" url="sitemaps/1" filed-name="name"/>
        <ApmEditable v-model="age" url="test123" filed-name="age"/>
        <ApmEditable v-model="name" confirm-before-save url="sitemaps/1" filed-name="name"/>
    </div>
</template>

<style scoped lang="scss">
</style>
