<script lang="ts" setup>
import { RouterLink } from 'vue-router'

</script>

<template>
    <header class="main-header p-2">
        <nav class="main-nav d-flex gap-4">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/dev/buttons">Dev</RouterLink>
        </nav>
    </header>
</template>

<style scoped>
</style>
