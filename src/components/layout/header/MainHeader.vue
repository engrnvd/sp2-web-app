<script lang="ts" setup>
import { env } from '@/env'
import ApmEditable from 'src/components/common/ApmEditable.vue'
import AddNoteBtn from 'src/components/layout/header/AddNoteBtn.vue'
import { useAppStore } from 'src/stores/app.store'
import { RouterLink, useRoute } from 'vue-router'
import AppLogo from '../../common/AppLogo.vue'
import DarkModeToggleBtn from './DarkModeToggleBtn.vue'
import ProfileBtn from './ProfileBtn.vue'
import ProjectDownloadBtn from './ProjectDownloadBtn.vue'
import ProjectSettingsBtn from './ProjectSettingsBtn.vue'
import ProjectShareBtn from './ProjectShareBtn.vue'
import ViewToggleBtn from './ViewToggleBtn.vue'

const route = useRoute()
let app = useAppStore()

</script>

<template>
    <header class="main-header d-flex gap-2 align-items-center p-2">
        <RouterLink to="/" class="home-link">
            <AppLogo/>
        </RouterLink>

        <h4 class="m-0 text-muted main-heading">
            <ApmEditable
                v-if="app.sitemap && route.name === 'sitemap'"
                v-model="app.sitemap.name"
                :url="`sitemaps/${app.sitemap.id}`"
                filed-name="name"
                @update:modelValue="e => app.updateSitemapInListing()"
                confirm-before-save
            />
            <span v-else class="px-2">{{ env.appName }}</span>
        </h4>

        <div class="flex-grow-1"></div>

        <template v-if="route.name === 'sitemap' && app.canvas">
            <AddNoteBtn/>
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

<style lang="scss">

.main-heading {
    input {
        color: var(--muted);
        font-weight: bold;
        padding: 0.25em 0.5em;
    }
}
</style>
