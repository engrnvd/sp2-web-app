<script lang="ts" setup>

import UDropdown from '@/U/components/UDropdown.vue'
import { randomArrayItem } from '@/helpers/misc'
import UIconBtn from '@/U/components/UIconBtn.vue'
import ArrowDownLeftIcon from '@/material-design-icons/ArrowDownLeft.vue'
import ArrowDownRightIcon from '@/material-design-icons/ArrowDownRight.vue'
import ArrowTopLeftIcon from '@/material-design-icons/ArrowTopLeft.vue'
import ArrowTopRightIcon from '@/material-design-icons/ArrowTopRight.vue'

const options = ['🍎', '🍐', '🍊', '🍋', '🍒', '🍑', '🍓', '🍅', '🍍']

</script>

<template>
    <div class="grid">
        <div>
            <UDropdown>
                <UIconBtn>
                    <ArrowDownRightIcon/>
                </UIconBtn>
                <template #content>
                    <div class="p-4">
                        <div class="my-2" v-for="n in 4">{{ randomArrayItem(options) }}</div>
                    </div>
                </template>
            </UDropdown>
        </div>
        <div>
            <UDropdown left>
                <UIconBtn>
                    <ArrowDownLeftIcon/>
                </UIconBtn>
                <template #content>
                    <div class="p-4">
                        <div class="my-2" v-for="n in 4">{{ randomArrayItem(options) }}</div>
                    </div>
                </template>
            </UDropdown>
        </div>
        <div>
            <UDropdown up>
                <UIconBtn>
                    <ArrowTopRightIcon/>
                </UIconBtn>
                <template #content>
                    <div class="p-4">
                        <div class="my-2" v-for="n in 4">{{ randomArrayItem(options) }}</div>
                    </div>
                </template>
            </UDropdown>
        </div>
        <div>
            <UDropdown left up>
                <UIconBtn>
                    <ArrowTopLeftIcon/>
                </UIconBtn>
                <template #content>
                    <div class="p-4">
                        <div class="my-2" v-for="n in 4">{{ randomArrayItem(options) }}</div>
                    </div>
                </template>
            </UDropdown>
        </div>
    </div>
</template>

<style scoped lang="scss">

.grid {
    display: grid;
    gap: 1em;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    height: calc(100vh - 16rem);
}

</style>
