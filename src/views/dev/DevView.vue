<script setup lang="ts">
import { reactive } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { devRoutes } from '../../router/dev-routes'

const routes = reactive(devRoutes[0].children.map(r => r.path))

</script>

<template>
    <div class="p-4" style="background-color: var(--bg); margin: 1em; border-radius: 1em;">
        <div class="d-flex align-items-center flex-wrap gap-4 mb-5">
            <RouterLink v-for="route in routes" :to="`/dev/${route}`" :key="route">
                {{ route }}
            </RouterLink>
        </div>
        <RouterView/>
    </div>
</template>

<style scoped>
</style>
