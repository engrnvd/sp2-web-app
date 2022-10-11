<script lang="ts" setup>
import { useAppStore } from 'src/stores/app.store'
import { RouterLink, useRoute } from 'vue-router'
import AppLogo from '../../common/AppLogo.vue'
import ProfileBtn from './ProfileBtn.vue'
import ProjectDownloadBtn from './ProjectDownloadBtn.vue'
import ProjectSettingsBtn from './ProjectSettingsBtn.vue'
import ProjectShareBtn from './ProjectShareBtn.vue'
import ViewToggleBtn from './ViewToggleBtn.vue'
import DarkModeToggleBtn from './DarkModeToggleBtn.vue'
import { env } from '@/env'

const route = useRoute()
let app = useAppStore()

</script>

<template>
    <header class="main-header d-flex gap-2 align-items-center p-2">
        <RouterLink to="/" class="home-link">
            <AppLogo/>
        </RouterLink>

        <h4 class="m-0 text-muted main-heading">
            {{ app.sitemap && route.name === 'sitemap' ? app.sitemap.name : env.appName }}
        </h4>

        <div class="flex-grow-1"></div>

        <template v-if="route.name === 'sitemap'">
            <ViewToggleBtn/>
            <ProjectSettingsBtn/>
            <ProjectDownloadBtn/>
            <ProjectShareBtn/>
        </template>

        <DarkModeToggleBtn/>
        <div class="separator"></div>

        <ProfileBtn/>
    </header>
</template>

<style scoped lang="scss">
.home-link {
    border-bottom: none;
}

.separator {
    height: 1.5em;
}
</style>
