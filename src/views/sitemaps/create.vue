<script setup lang="ts">
import UModal from '@/U/components/UModal.vue'
import UInput from '@/U/components/UInput.vue'
import { requiredRule } from '@/Vee/rules/required.rule'
import { useValidator } from '@/Vee/useValidator'
import { Validator } from '@/Vee/validator'
import { useSitemapsStore } from '@/views/sitemaps/store'
import { useRouter } from 'vue-router'

const router = useRouter()
const sitemaps = useSitemapsStore()

const v = useValidator(sitemaps.form, (v: Validator) => {
    v.addRule(requiredRule('name'))
})

function save() {
    v.validate()
    if (v.hasErrors) return
    sitemaps.create().then(res => {
        router.back()
    })
}

</script>

<template>
    <UModal
        title="Add New Sitemap"
        :model-value="true"
        @cancel="router.back()"
        ok-title="Save"
        @ok="save"
        :ok-loading="sitemaps.createReq.loading"
        cancel-title="Back"
        size="sm"
    >
        <form @submit.prevent="save">
            <UInput
                v-model="sitemaps.form.name"
                label="Name"
                :errors="v.errors.name"
                class="mb-4"
            />
        </form>
    </UModal>
</template>
