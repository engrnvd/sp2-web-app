<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import AppLogo from '../../common/AppLogo.vue'
import ProfileBtn from './ProfileBtn.vue'
import DarkModeToggleBtn from './DarkModeToggleBtn.vue'

</script>

<template>
    <header class="main-header d-flex gap-2 align-items-center p-2">
        <RouterLink to="/" class="home-link">
            <AppLogo/>
        </RouterLink>
        <h4 class="m-0 text-muted">Untitled</h4>

        <div class="flex-grow-1"></div>

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
