<script setup lang="ts">
import UInput from '@/U/components/UInput.vue'
import UModal from '@/U/components/UModal.vue'
import { useValidator } from '@/Vee/useValidator'
import { Validator } from '@/Vee/validator'
import { UrlsToSitemap } from 'src/classes/UrlsToSitemap'
import MainLoader from 'src/components/common/MainLoader.vue'
import { useSocketIoAuth } from 'src/composables/useSocketIo'
import { IMPORTED_SITEMAP_KEY } from 'src/constants'
import { Storage } from 'src/helpers/storage-helper'
import { useAppStore } from 'src/stores/app.store'
import { websiteRule } from 'src/Vee/rules/website.rule'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSitemapsStore } from './store'

interface CrawlUpdateEvent {
    completed: boolean
    failed: boolean
    message: string
    numPages: number
    website: string
    pages: any[]
}

const resetEvent = {
    completed: false,
    failed: false,
    message: '',
    numPages: 0,
    website: '',
    pages: [],
}

const router = useRouter()
const sitemaps = useSitemapsStore()
const app = useAppStore()
const event: CrawlUpdateEvent = reactive({ ...resetEvent })
const loading = ref(false)

const v = useValidator(sitemaps.importForm, (v: Validator) => {
    v.addRule(websiteRule('website'))
})

function save() {
    v.validate()
    if (v.hasErrors) return
    loading.value = true
    Object.assign(event, resetEvent)
    sitemaps.import()
}

onMounted(() => {
    const io = useSocketIoAuth()
    io.on('crawl-update', (data: CrawlUpdateEvent) => {
        Object.assign(event, data)
        if (event.completed) {
            if (!event.failed) {
                let sitemapData = new UrlsToSitemap(event.website, event.pages).parse()
                Storage.setObject(IMPORTED_SITEMAP_KEY, sitemapData)
                router.push(`/p/new`)
            }
            loading.value = false
        }
    })
})

</script>

<template>
    <UModal
        title="Import"
        :model-value="true"
        @cancel="router.back()"
        ok-title="import"
        @ok="save"
        :ok-loading="loading"
        cancel-title="Back"
        size="sm"
    >
        <div class="mb-5 text-muted text-small">
            Import your website or sitemap.xml
        </div>
        <form @submit.prevent="save">
            <UInput
                v-model="sitemaps.importForm.website"
                label="Website"
                :errors="v.errors.website"
                class="mb-4"
            />
        </form>

        <div v-if="loading || event.message" class="state d-flex align-items-center gap-4">
            <MainLoader inline/>
            <div class="text-muted text-small d-flex flex-column gap-2" :class="{'text-danger': event.failed}">
                <div v-if="!event.completed">Import in progress. You will be redirected to your sitemap when done.
                    (Limited
                    to first 500 pages.)
                </div>
                <div>{{ event.message || `Crawling ${sitemaps.importForm.website}...` }}</div>
            </div>
        </div>
    </UModal>
</template>
