<script lang="ts" setup>
import AccountOutlineIcon from '../../../material-design-icons/AccountOutline.vue'
import { useAuthStore } from '../../../stores/auth.store'
import UButton from '../../../U/components/UButton.vue'

const auth = useAuthStore()
</script>

<template>
    <UButton icon transparent @click="auth.modals.login = true" v-tooltip="'Profile'">
        <AccountOutlineIcon/>
    </UButton>
</template>

<style scoped lang="scss">
</style>
