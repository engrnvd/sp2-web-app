<script lang="ts" setup>
import PageHeader from '@/components/common/PageHeader.vue'
import FullPageMessage from 'src/components/common/FullPageMessage.vue'
import { env } from 'src/env'
import StarShootingIcon from 'src/material-design-icons/StarShooting.vue'

</script>

<template>
    <div>
        <PageHeader>Subscription</PageHeader>
        <FullPageMessage>
            <template #icon>
                <StarShootingIcon/>
            </template>

            {{ env.appName }} is in public preview. No subscription is required at this point.
        </FullPageMessage>
    </div>
</template>

<style scoped lang="scss">
</style>
