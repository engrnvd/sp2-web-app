<script setup lang="ts">
import { useSitemapsStore } from '@/views/projects/store'
import PlusIcon from '@/material-design-icons/Plus.vue'
import UButton from '@/U/components/UButton.vue'
import ApmFilter from '@/components/common/crud/ApmFilter.vue'
import ApmEditable from '@/components/common/crud/ApmEditable.vue'
import NotFoundRow from '@/components/common/crud/NotFoundRow.vue'
import ApmDeleteBtn from '@/components/common/crud/ApmDeleteBtn.vue'
import ApmPagination from '@/components/common/crud/ApmPagination.vue'
import MainLoader from '@/components/common/MainLoader.vue'
import { onMounted, watch } from 'vue'
import { useRouter, RouterView } from 'vue-router'

const router = useRouter()
const sitemaps = useSitemapsStore()
const editedSitemap = null

onMounted(() => {
    if (!sitemaps.req.hasLoadedData) sitemaps.load()
})

watch(() => sitemaps.req.params, () => {
    sitemaps.load()
}, { deep: true })
</script>

<template>
    <div>
        <RouterView/>
        <div class="d-flex align-items-center gap-2 px-4">
            <div class="flex-grow-1">
                <h2>Your Projects</h2>
            </div>
            <UButton compact tooltip="Create a new Sitemap" @click="router.push('/projects/create')">
                <PlusIcon/>
                New Project
            </UButton>
        </div>
        <div class="card p-4 text-muted" v-if="sitemaps.req.loaded && !sitemaps.req.hasLoadedData">
            No projects yet.
            <RouterLink to="/projects/create">Create a new one</RouterLink>
        </div>
        <div class="card p-4 d-flex align-items-center" v-for="sitemap in sitemaps.req.data.data" :key="sitemap.id">
            <div class="name">
                <RouterLink :to="`/p/${sitemap.id}`">{{ sitemap.name }}</RouterLink>
            </div>
            <div class="flex-grow-1"></div>
            <div class="actions">
                <ApmDeleteBtn :req="sitemaps.req" :id="sitemap.id"/>
            </div>
        </div>

        <MainLoader v-if="sitemaps.req.loading"/>
        <ApmPagination class="mt-4" :req="sitemaps.req"/>
    </div>
</template>
