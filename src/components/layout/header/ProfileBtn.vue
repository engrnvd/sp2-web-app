<script lang="ts" setup>
import AccountOutlineIcon from '../../../material-design-icons/AccountOutline.vue'
import { useAuthStore } from '../../../stores/auth.store'
import UButton from '../../../U/components/UButton.vue'

const auth = useAuthStore()
</script>

<template>
    <UButton icon transparent @click="auth.modals.login = true" v-tooltip="'Profile'">
        <img class="avatar sm" v-if="auth.isLoggedIn && auth.user.avatar" :src="auth.user.avatar" :alt="auth.user.name">
        <span v-else-if="auth.isLoggedIn" class="font-weight-bold">{{ auth.user.name[0] }}</span>
        <AccountOutlineIcon v-else/>
    </UButton>
</template>

<style scoped lang="scss">
</style>
