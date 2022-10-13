<script lang="ts" setup>
import UModal from '@/U/components/UModal.vue'
import { useProfileStore } from 'src/stores/profile.store'
import UInput from 'src/U/components/UInput.vue'
import { useNotify } from 'src/U/composables/Notifiy'
import { minLengthRule } from 'src/Vee/rules/minLength.rule'
import { requiredRule } from 'src/Vee/rules/required.rule'
import { useValidator } from 'src/Vee/useValidator'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const profile = useProfileStore()
const form = reactive({
    password: '',
    new_password: '',
})
const notify = useNotify()
const v = useValidator(form, v => {
    v.addRule(requiredRule('password'))
    v.addRule(requiredRule('new_password'))
    v.addRule(minLengthRule('new_password', 6))
})

function save() {
    v.validate()
    if (v.hasErrors) return

    profile.updatePasswordReq.send({
        body: JSON.stringify(form)
    }).then(r => {
        notify.success('Success', 'Password has been updated')
        v.reset()
        router.back()
    })
}
</script>

<template>
    <UModal
        title="Change Password"
        :model-value="true"
        @cancel="router.back()"
        ok-title="Save"
        @ok="save"
        :ok-loading="profile.updatePasswordReq.loading"
        cancel-title="Back"
    >
        <UInput
            type="password"
            v-model="form.password"
            label="Current Password"
            class="mb-4"
            :errors="v.errors.password"
        />
        <UInput
            type="password"
            v-model="form.new_password"
            label="New Password"
            class="mb-4"
            :errors="v.errors.new_password"
        />
    </UModal>
</template>
