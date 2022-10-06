<script setup lang="ts">
import MainHeader from './components/layout/header/MainHeader.vue'
import MainFooter from './components/layout/MainFooter.vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
    <div class="main-container d-flex flex-column">
        <MainHeader/>

        <main class="flex-grow-1 main-content d-flex flex-column">
            <RouterView/>
        </main>

        <MainFooter/>
    </div>
</template>

<style lang="scss">

.main-container {
    height: 100vh;
    overflow: hidden;

    .main-content {
        overflow-y: auto;
        overflow-x: hidden;
    }
}

</style>
