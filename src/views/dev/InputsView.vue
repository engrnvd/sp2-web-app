<script lang="ts" setup>

import { reactive } from 'vue'
import { emailRule } from '../../Vee/rules/email.rule'
import { minLengthRule } from '../../Vee/rules/minLength.rule'
import { requiredRule } from '../../Vee/rules/required.rule'
import { useValidator } from '../../Vee/useValidator'
import UButton from '../../U/components/UButton.vue'
import UInput from '../../U/components/UInput.vue'

const form = reactive({
    email: '',
    password: '',
    re_password: '',
})

const v = useValidator(form, v => {
    v.addRule(requiredRule('email'))
    v.addRule(emailRule('email'))
    v.addRule(requiredRule('password'))
    v.addRule(minLengthRule('password', 5))
    v.addRule(requiredRule('re_password'))
    v.addCustomRule('re_password', 'Passwords must match', () => form.password === form.re_password)
})

</script>

<template>
    <form action="" @submit.prevent="v.validate()" class="d-flex flex-column" style="max-width: 500px">
        <UInput
            class="mb-4" label="Email" v-model="form.email"
            :errors="v.errors.email"
        />
        <UInput
            class="mb-4" v-model="form.password" type="password" label="Password"
            :errors="v.errors.password"
        />
        <UInput
            class="mb-4" v-model="form.re_password" type="password" label="Confirm Password"
            :errors="v.errors.re_password"
        />
        <UButton flat>Login</UButton>
    </form>
</template>

<style scoped lang="scss">
</style>
