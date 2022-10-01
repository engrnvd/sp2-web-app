<script lang="ts" setup>
import { computed, watchEffect } from 'vue'
import { useStorage } from '../../../composables/useStorage'
import { THEME_KEY } from '../../../constants'
import UButton from '../../../U/components/UButton.vue'

const theme = useStorage(THEME_KEY, 'light')

const path = computed(() => theme.value === 'dark' ? 'M19.7818 9.33875L22 11.9952L19.7818 14.6517L20.0909 18.1682L16.8091 18.9517L15.0909 21.9904L12 20.5953L8.90909 22L7.19091 18.9613L3.90909 18.1777L4.21818 14.6517L2 11.9952L4.21818 9.32919L3.90909 5.81271L7.19091 5.0387L8.90909 2L12 3.39513L15.0909 2L16.8091 5.0387L20.0909 5.82226L19.7818 9.33875ZM17.8364 10.0041L19.5 11.9964L17.8364 13.9888L18.0682 16.6261L15.6068 17.2138L14.3182 19.4928L12 18.4465L9.68182 19.5L8.39318 17.221L5.93182 16.6333L6.16364 13.9888L4.5 11.9964L6.16364 9.99689L5.93182 7.35953L8.39318 6.77903L9.68182 4.5L12 5.54634L14.3182 4.5L15.6068 6.77903L18.0682 7.3667L17.8364 10.0041Z' : 'M22 14.0123C20.7996 14.5109 19.4831 14.7861 18.1023 14.7861C12.4856 14.7861 7.93241 10.2329 7.93241 4.61622C7.93241 3.71168 8.0505 2.83476 8.2721 2C4.58966 3.52929 2 7.16029 2 11.3961C2 17.0128 6.5532 21.566 12.1698 21.566C16.882 21.566 20.8456 18.3612 22 14.0123Z')
const tooltip = computed(() => (theme.value === 'dark' ? 'Light' : 'Dark') + ' mode')

function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

watchEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.value)
})

</script>

<template>
    <UButton icon transparent @click="toggle()" v-tooltip="tooltip">
        <svg viewBox="0 0 24 24" width="1em"
             fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
            <path :d="path"></path>
        </svg>
    </UButton>
</template>

<style scoped lang="scss">
</style>
