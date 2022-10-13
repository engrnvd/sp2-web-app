<script lang="ts" setup>
import UModal from '@/U/components/UModal.vue'
import { useAuthStore } from 'src/stores/auth.store'
import { useProfileStore } from 'src/stores/profile.store'
import UInput from 'src/U/components/UInput.vue'
import { useNotify } from 'src/U/composables/Notifiy'
import { requiredRule } from 'src/Vee/rules/required.rule'
import { useValidator } from 'src/Vee/useValidator'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const profile = useProfileStore()
const form = reactive({ password: '' })
const notify = useNotify()
const v = useValidator(form, v => {
    v.addRule(requiredRule('password'))
})

function submit() {
    v.validate()
    if (v.hasErrors) return

    profile.deleteAccountReq.send({
        body: JSON.stringify(form)
    }).then(r => {
        notify.info('We are sorry to see you go', 'Your account has been deleted', { permanent: true })
    })
}
</script>

<template>
    <UModal
        title="Change Password"
        :model-value="true"
        @cancel="router.back()"
        ok-title="Delete"
        @ok="submit"
        :ok-loading="profile.deleteAccountReq.loading"
        cancel-title="Back"
    >
        <UInput
            type="password"
            v-model="form.password"
            label="Current Password"
            class="mb-4"
            :errors="v.errors.password"
        />
    </UModal>
</template>
