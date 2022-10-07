<script lang="ts" setup>
import UModal from '@/U/components/UModal.vue'
import { useLoginStore } from 'src/stores/login.store'
import { useNotify } from 'src/U/composables/Notifiy'
import { Validator } from 'src/Vee/validator'
import GoogleIcon from '../material-design-icons/Google.vue'
import { useAuthStore } from '../stores/auth.store'
import UButton from '../U/components/UButton.vue'
import UInput from '../U/components/UInput.vue'
import { emailRule } from '../Vee/rules/email.rule'
import { minLengthRule } from '../Vee/rules/minLength.rule'
import { requiredRule } from '../Vee/rules/required.rule'
import { useValidator } from '../Vee/useValidator'

const notify = useNotify()
const auth = useAuthStore()
const store = useLoginStore()
const v = useValidator(auth.form, (v: Validator) => {
    v.addRule(requiredRule('email'))
    v.addRule(emailRule('email'))
    v.addRule(requiredRule('password'))
    v.addRule(minLengthRule('password', 6))

    v.addRule(requiredRule('name'), v => store.isRegisterPage)

    v.addRule(requiredRule('otp'), v => store.isForgotPage && store.showOtp)
    v.addRule(requiredRule('newPassword'), v => store.isForgotPage && store.showOtp)
    v.addRule(minLengthRule('newPassword', 6), v => store.isForgotPage && store.showOtp)
})

function close() {
    auth.modals.login = false
}

function submit() {
    v.validate()
    if (v.hasErrors) return

    if (store.isLoginPage) {
        auth.login().then(close)
    } else if (store.isRegisterPage) {
        auth.register().then(close)
    } else if (store.isForgotPage && !store.showOtp) {
        auth.sendForgotReq().then(data => {
            store.showOtp = true
            notify.success('Email sent', 'Please check your inbox')
        })
    } else if (store.isForgotPage && store.showOtp) {
        auth.resetPassword().then(data => {
            store.showOtp = false
            notify.success('Success', 'Your password has been reset')
            store.gotoLogin()
        })
    }
}

</script>

<template>
    <UModal
        v-model="auth.modals.login"
        :title="store.page"
        size="sm"
        no-footer
        body-class="p-0">
        <div style="padding: 3em">
            <form action="" @submit.prevent="submit">
                <UInput v-if="store.isRegisterPage" type="text" v-model="auth.form.name" label="Name" class="mb-4"
                        :errors="v.errors.name"/>
                <UInput type="text" v-model="auth.form.email" label="Email" class="mb-4" :errors="v.errors.email"/>
                <UInput
                    type="password"
                    v-model="auth.form.password"
                    label="Password"
                    class="mb-4"
                    :errors="v.errors.password"
                    v-if="!store.isForgotPage"
                />
                <UInput v-if="store.isForgotPage && store.showOtp"
                        type="text"
                        v-model="auth.form.otp"
                        label="OTP"
                        class="mb-4"
                        :errors="v.errors.otp"
                />
                <UInput v-if="store.isForgotPage && store.showOtp"
                        type="password"
                        v-model="auth.form.newPassword"
                        label="New Password"
                        class="mb-4"
                        :errors="v.errors.newPassword"
                />

                <div class="d-flex align-items-center justify-content-between">
                    <UButton :loading="auth.loginReq.loading || auth.signupReq.loading || auth.forgotReq.loading">
                        {{ store.isLoginPage ? 'Login' : 'Submit' }}
                    </UButton>

                    <a href=""
                       class="text-base"
                       @click.prevent="() => store.isForgotPage ? store.gotoLogin() : store.gotoForgotPassword()">
                        {{ store.isForgotPage ? 'Back to Login' : 'Forgot password?' }}
                    </a>
                </div>
            </form>
            <UButton secondary class="w100 mt-6" v-if="!store.isForgotPage">
                <div class="d-flex align-items-center justify-content-between gap-4">
                    <GoogleIcon style="font-size: 1.25em"/>
                    <span>Continue with Google</span>
                </div>
            </UButton>
        </div>
        <UButton
            flat secondary
            class="w100 mt-4 text-center register-btn"
            @click.prevent="() => store.isRegisterPage ? store.gotoLogin() : store.gotoRegister()">
            {{ store.isRegisterPage ? 'Back to Login' : 'Dont have an account yet? Sign up' }}
        </UButton>
    </UModal>
</template>

<style scoped lang="scss">

.register-btn {
    display: block;
    height: 4em;
    text-transform: none;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
}

</style>
