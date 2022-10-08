<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth.store'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()

onBeforeMount(() => {
    if (auth.isLoggedIn) router.replace('/projects')
    else router.replace('/p/new')
})

</script>

<template></template>
