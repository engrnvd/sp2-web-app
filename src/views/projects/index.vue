<script setup lang="ts">
import ApmDeleteBtn from '@/components/common/crud/ApmDeleteBtn.vue'
import MainLoader from '@/components/common/MainLoader.vue'
import PlusIcon from '@/material-design-icons/Plus.vue'
import UButton from '@/U/components/UButton.vue'
import { useSitemapsStore } from '@/views/projects/store'
import FullPageMessage from 'src/components/common/FullPageMessage.vue'
import PageHeader from 'src/components/common/PageHeader.vue'
import { dayjs } from 'src/helpers/dayjs'
import ArchiveIcon from 'src/material-design-icons/Archive.vue'
import ArchiveOffIcon from 'src/material-design-icons/ArchiveOff.vue'
import ContentDuplicateIcon from 'src/material-design-icons/ContentDuplicate.vue'
import DrawingBoxIcon from 'src/material-design-icons/DrawingBox.vue'
import UIconBtn from 'src/U/components/UIconBtn.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
const sitemaps = useSitemapsStore()
const archived = ref(false)

const data = computed(() => sitemaps.req?.data?.filter(sm => !!sm.archived === archived.value) || [])
const hasArchivedProjects = computed(() => sitemaps.req?.data?.filter(s => s.archived).length)

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
        <PageHeader>
            {{ archived ? 'Archived Projects' : 'Projects' }}
            <template #end>
                <UButton v-if="sitemaps.req.hasLoadedData && (hasArchivedProjects || archived)" compact info
                         :transparent="!archived"
                         @click="archived = !archived">
                    {{ archived ? 'Showing' : 'Show' }} Archived
                </UButton>
                <UButton compact @click="router.push('/projects/create')">
                    <PlusIcon/>
                    New Project
                </UButton>
            </template>
        </PageHeader>

        <FullPageMessage v-if="sitemaps.req.loaded && !sitemaps.req.hasLoadedData">
            <template #icon>
                <DrawingBoxIcon/>
            </template>

            You don't have any projects.

            <template #action>
                <RouterLink class="u-btn primary" to="/projects/create">Create your first project</RouterLink>
            </template>
        </FullPageMessage>

        <FullPageMessage v-if="archived && !hasArchivedProjects">
            <template #icon>
                <DrawingBoxIcon/>
            </template>

            No archived projects
        </FullPageMessage>

        <div class="card p-4 gap-4 grid col-4 align-items-center"
             v-for="sitemap in data"
             :key="sitemap.id">
            <div class="name font-weight-bold">
                <RouterLink :to="`/p/${sitemap.id}`">{{ sitemap.name }}</RouterLink>
            </div>
            <div>
                <div class="text-small text-muted mb-2">Created</div>
                <div>{{ dayjs(sitemap.created_at).fromNow() }}</div>
            </div>
            <div>
                <div class="text-small text-muted mb-2">Last Updated</div>
                <div>{{ dayjs(sitemap.updated_at).fromNow() }}</div>
            </div>
            <div class="d-flex align-items-center gap-2 justify-content-end">
                <UIconBtn tooltip="Clone" @click="sitemaps.clone(sitemap.id)" :loading="sitemaps.cloneReq.loading">
                    <ContentDuplicateIcon/>
                </UIconBtn>
                <UIconBtn :tooltip="`${sitemap.archived ? 'Unarchive' : 'Archive'}`"
                          @click="sitemaps.archive(sitemap)"
                          :loading="sitemaps.archiveReq.loading">
                    <ArchiveOffIcon v-if="sitemap.archived"/>
                    <ArchiveIcon v-else/>
                </UIconBtn>
                <ApmDeleteBtn tooltip="Delete" :req="sitemaps.req" :id="sitemap.id"/>
            </div>
        </div>

        <MainLoader v-if="sitemaps.req.loading"/>
    </div>
</template>
