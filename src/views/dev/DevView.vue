<script setup lang="ts">
import { reactive } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { devRoutes } from '../../router/dev-routes'

const routes = reactive(devRoutes[0].children.map(r => r.path))

</script>

<template>
    <div>
        <div class="card p-4">
            <div class="d-flex align-items-center flex-wrap gap-4">
                <RouterLink v-for="route in routes" :to="`/dev/${route}`" :key="route">
                    {{ route }}
                </RouterLink>
            </div>
        </div>
        <div class="card p-4">
            <RouterView/>
        </div>
    </div>
</template>

<style scoped>
</style>
