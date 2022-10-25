<script lang="ts" setup>
import { defineProps } from 'vue'
import AppLogo from './AppLogo.vue'

defineProps({
    inline: {
        type: Boolean,
        default: false,
    }
})
</script>

<template>
    <div class="all-center main-loader-parent" :class="{'full-page': !inline}">
        <AppLogo class="main-loader"/>
    </div>
</template>

<style scoped lang="scss">

@keyframes rotate {
    to {
        transform: rotate(360deg);
    }
}

.main-loader-parent {
    font-size: 1em;

    &.full-page {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        min-width: 100vw;
        min-height: 100vh;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 9;
        font-size: 3em;
    }

    .main-loader {
        animation: rotate 2.5s infinite;
    }
}

</style>
