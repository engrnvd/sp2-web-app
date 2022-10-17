<script lang="ts" setup>

import UCheckbox from 'src/U/components/UCheckbox.vue'
import UChoices from 'src/U/components/UChoices.vue'
import USwitch from 'src/U/components/USwitch.vue'
import UTextarea from 'src/U/components/UTextarea.vue'
import { reactive } from 'vue'
import { emailRule } from 'src/Vee/rules/email.rule'
import { minLengthRule } from 'src/Vee/rules/minLength.rule'
import { requiredRule } from 'src/Vee/rules/required.rule'
import { useValidator } from 'src/Vee/useValidator'
import UButton from '../../U/components/UButton.vue'
import UInput from '../../U/components/UInput.vue'

const form = reactive({
    email: '',
    password: '',
    re_password: '',
    agreement: true,
    lights: true,
    gender: 'male',
    fruits: [],
    about: '',
})

const fruits = ['Apple', 'Mango', 'Grapes', 'Strawberry', 'Banana']

const v = useValidator(form, v => {
    v.addRule(requiredRule('email'))
    v.addRule(emailRule('email'))
    v.addRule(requiredRule('password'))
    v.addRule(minLengthRule('password', 5))
    v.addRule(requiredRule('re_password'))
    v.addRule(requiredRule('agreement'))
    v.addCustomRule('re_password', 'Passwords must match', () => form.password === form.re_password)
})

</script>

<template>
    <div class="grid col-2">
        <form action="" @submit.prevent="v.validate()" class="d-flex flex-column" style="max-width: 500px">
            <UInput
                class="mb-4"
                label="Email"
                v-model="form.email"
                :errors="v.errors.email"
            />
            <UInput
                class="mb-4"
                v-model="form.password"
                type="password"
                label="Password"
                :errors="v.errors.password"
                help-text="Minimum 5 characters"
            />
            <UInput
                class="mb-4"
                v-model="form.re_password"
                type="password"
                label="Confirm Password"
                :errors="v.errors.re_password"
            />
            <UCheckbox
                class="mb-4"
                label="I agree"
                v-model="form.agreement"
                :errors="v.errors.agreement"
            />
            <USwitch
                class="mb-4"
                label="Lights"
                v-model="form.lights"
                :errors="v.errors.lights"
            />
            <UChoices
                v-model="form.fruits"
                class="mb-4"
                :choices="fruits"
                label="Favorite Fruits"
            />

            <UTextarea
                v-model="form.about"
                class="mb-4"
                label="About"
            />

            <UButton flat>Login</UButton>
        </form>
        <div>
            <pre>v: {{ v }}</pre>
        </div>
    </div>
</template>

<style scoped lang="scss">
</style>
