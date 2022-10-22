<script setup lang="ts">
import UInput from '@/U/components/UInput.vue'
import UModal from '@/U/components/UModal.vue'
import { useValidator } from '@/Vee/useValidator'
import { Validator } from '@/Vee/validator'
import { websiteRule } from 'src/Vee/rules/website.rule'
import { useRouter } from 'vue-router'
import { useSitemapsStore } from './store'

const router = useRouter()
const sitemaps = useSitemapsStore()

const v = useValidator(sitemaps.importForm, (v: Validator) => {
    v.addRule(websiteRule('website'))
})

function save() {
    v.validate()
    if (v.hasErrors) return
    sitemaps.import().then(res => {
        router.push(`/p/${sitemaps.createReq.data.id}`)
    })
}

</script>

<template>
    <UModal
        title="Import"
        :model-value="true"
        @cancel="router.back()"
        ok-title="import"
        @ok="save"
        :ok-loading="sitemaps.createReq.loading"
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
    </UModal>
</template>
