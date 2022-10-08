<script setup lang="ts">
import { useSitemapsStore } from '@/views/sitemaps/store'
import CloudDownloadIcon from '@/material-design-icons/CloudDownload.vue'
import ReloadIcon from '@/material-design-icons/Reload.vue'
import PlusIcon from '@/material-design-icons/Plus.vue'
import UIconBtn from '@/U/components/UIconBtn.vue'
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
                <h2>Sitemaps</h2>
            </div>
            <UIconBtn tooltip="Create a new Sitemap" @click="router.push('/sitemaps/create')">
                <PlusIcon/>
            </UIconBtn>
            <UIconBtn tooltip="Download CSV" @click.prevent="sitemaps.load()">
                <CloudDownloadIcon/>
            </UIconBtn>
            <UIconBtn
                :loading="sitemaps.req.loading"
                tooltip="Reload"
                @click.prevent="sitemaps.load()">
                <ReloadIcon/>
            </UIconBtn>
        </div>
        <div class="card p-4" style="min-height: 30em">
            <table class="w100 table-hover crud-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>
                        <ApmFilter
                            field-name="name"
                            field-label="Name"
                            v-model="sitemaps.req.params"
                        />
                    </th>
                    <th>
                        <ApmFilter
                            field-name="owner_id"
                            field-label="Owner Id"
                            v-model="sitemaps.req.params"
                        />
                    </th>
                    <th>
                        <ApmFilter
                            field-name="is_template"
                            field-label="Is Template"
                            v-model="sitemaps.req.params"
                        />
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="sitemap in sitemaps.req.data.data" :key="sitemap.id">
                    <td>{{ sitemap.id }}</td>
                    <td>
                        <ApmEditable
                            type="text"
                            field="name"
                            :url="`/sitemaps/${sitemap.id}`"
                            v-model="sitemap.name"
                        ></ApmEditable>
                    </td>
                    <td>
                        <ApmEditable
                            type="select"
                            field="owner_id"
                            :url="`/sitemaps/${sitemap.id}`"
                            v-model="sitemap.owner_id"
                        ></ApmEditable>
                    </td>
                    <td>
                        <ApmEditable
                            type="text"
                            field="is_template"
                            :url="`/sitemaps/${sitemap.id}`"
                            v-model="sitemap.is_template"
                        ></ApmEditable>
                    </td>
                    <td>
                        <ApmDeleteBtn :req="sitemaps.req" :id="sitemap.id"/>
                    </td>
                </tr>
                <NotFoundRow :req="sitemaps.req"/>
                </tbody>
            </table>
            <MainLoader v-if="sitemaps.req.loading"/>
            <ApmPagination class="mt-4" :req="sitemaps.req"/>
        </div>
    </div>
</template>
