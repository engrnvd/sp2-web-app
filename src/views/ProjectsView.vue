<script setup lang="ts">

import { useAuthStore } from '../stores/auth.store'

const auth = useAuthStore()

</script>

<template>
    <h1>Projects</h1>
    <h2>Email: {{ auth.form.email }}</h2>
</template>

<style>
</style>
