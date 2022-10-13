<script setup lang="ts">
import PageBody from '@/components/common/PageBody.vue'
import PageHeader from '@/components/common/PageHeader.vue'
import { useClone } from '@/composables/useClone.js'
import { useAuthStore } from '@/stores/auth.store.js'
import UInput from '@/U/components/UInput.vue'
import { requiredRule } from '@/Vee/rules/required.rule.js'
import { useValidator } from '@/Vee/useValidator.js'
import { Validator } from '@/Vee/validator.js'
import { useProfileStore } from 'src/stores/profile.store'
import UButton from 'src/U/components/UButton.vue'
import { emailRule } from 'src/Vee/rules/email.rule'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const profile = useProfileStore()
const { data, apply, cancel } = useClone(auth.user)
const router = useRouter()
const v = useValidator(data, (v: Validator) => {
    v.addRule(requiredRule('email'))
    v.addRule(emailRule('email'))
    v.addRule(requiredRule('name'))
})

const changed = computed(() => data.name !== auth.user.name || data.email !== auth.user.email || data.company !== auth.user.company)

function save() {
    profile.updateProfile(data).then(r => {
        apply()
    })
}
</script>

<template>
    <div>
        <PageHeader>Profile</PageHeader>

        <div v-if="data">
            <PageBody style="width: 500px">
                <form action="" @submit.prevent="save">
                    <h3 class="text-muted">Your information</h3>
                    <UInput
                        type="text"
                        v-model="data.name"
                        label="Name"
                        class="mb-4"
                        :errors="v.errors.name"
                    />
                    <UInput
                        type="text"
                        v-model="data.email"
                        label="Email"
                        class="mb-4"
                        :errors="v.errors.email"
                    />
                    <UInput
                        type="text"
                        v-model="data.company"
                        label="Company"
                        class="mb-4"
                    />
                    <UButton
                        :loading="profile.updateReq.loading"
                        :disabled="!changed || v.hasErrors"
                    >Save
                    </UButton>
                </form>

                <h3 class="mt-5 text-muted">Password</h3>
                <UButton @click="router.push({name: 'change-password'})" secondary>Change Password</UButton>

                <h3 class="mt-5 text-muted">Delete Account</h3>
                <UButton @click="router.push({name: 'delete-account'})" danger>Delete My Account</UButton>
            </PageBody>
        </div>

        <RouterView/>
    </div>
</template>
