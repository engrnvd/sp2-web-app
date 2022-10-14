<script lang="ts" setup>
import UDropdown from '@/U/components/UDropdown.vue'
import UMenuItem from '@/U/components/UMenuItem.vue'
import LogoutIcon from '@/material-design-icons/Logout.vue'
import AccountIcon from '@/material-design-icons/Account.vue'
import CreditCardOutlineIcon from '@/material-design-icons/CreditCardOutline.vue'
import TextBoxMultipleOutlineIcon from '@/material-design-icons/TextBoxMultipleOutline.vue'
import MainLoader from '@/components/common/MainLoader.vue'
import { useRouter } from 'vue-router'
import AccountOutlineIcon from '@/material-design-icons/AccountOutline.vue'
import { useAuthStore } from '@/stores/auth.store'
import UButton from '@/U/components/UButton.vue'

const auth = useAuthStore()
const router = useRouter()

function logout() {
    auth.logout().then(d => {
        router.push('/')
    })
}
</script>

<template>
    <UDropdown v-if="auth.isLoggedIn" left>
        <UButton icon transparent v-tooltip="'Profile'">
            <img class="avatar sm" v-if="auth.user.avatar" :src="auth.user.avatar"
                 :alt="auth.user.name">
            <span v-else class="font-weight-bold">{{ auth.user.name[0] }}</span>
        </UButton>
        <template #content>
            <div class="py-2" style="min-width: 12em;">
                <div class="text-muted text-small px-4 py-2">
                    <div class="font-weight-bold mb-2">{{ auth.user.name }}</div>
                    <div>{{ auth.user.email }}</div>
                </div>
                <hr class="my-2">
                <UMenuItem @click="router.push('/profile')">
                    <AccountIcon/>
                    Account
                </UMenuItem>
                <UMenuItem @click="router.push({name: 'subscription'})">
                    <CreditCardOutlineIcon/>
                    Subscription
                </UMenuItem>
                <UMenuItem @click="router.push('/projects')">
                    <TextBoxMultipleOutlineIcon/>
                    Projects
                </UMenuItem>
                <hr class="my-2">
                <UMenuItem @click="logout">
                    <LogoutIcon/>
                    Logout
                </UMenuItem>
            </div>
        </template>
    </UDropdown>
    <UButton v-else icon transparent @click="auth.modals.login = true" v-tooltip="'Profile'">
        <AccountOutlineIcon/>
    </UButton>
    <MainLoader v-if="auth.logoutReq.loading"/>
</template>

<style scoped lang="scss">
</style>
