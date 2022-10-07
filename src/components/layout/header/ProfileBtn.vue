<script lang="ts" setup>
import UDropdown from '@/U/components/UDropdown.vue'
import AccountOutlineIcon from '../../../material-design-icons/AccountOutline.vue'
import { useAuthStore } from '../../../stores/auth.store'
import UButton from '../../../U/components/UButton.vue'

const auth = useAuthStore()
</script>

<template>
    <UDropdown v-if="auth.isLoggedIn" left>
        <UButton icon transparent v-tooltip="'Profile'">
            <img class="avatar sm" v-if="auth.user.avatar" :src="auth.user.avatar"
                 :alt="auth.user.name">
            <span v-else class="font-weight-bold">{{ auth.user.name[0] }}</span>
        </UButton>
        <template #content>
            <div class="p-4">
                <RouterLink to="/dev/dropdown">Logout</RouterLink>
            </div>
        </template>
    </UDropdown>
    <UButton v-else icon transparent @click="auth.modals.login = true" v-tooltip="'Profile'">
        <AccountOutlineIcon/>
    </UButton>
</template>

<style scoped lang="scss">
</style>
