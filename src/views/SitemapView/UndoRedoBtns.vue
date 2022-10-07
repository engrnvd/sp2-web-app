<script lang="ts" setup>

import ArrowULeftTopIcon from '../../material-design-icons/ArrowULeftTop.vue'
import ArrowURightTopIcon from '../../material-design-icons/ArrowURightTop.vue'
import { useAppStore } from '../../stores/app.store'
import { useCommandsStore } from '../../stores/commands.store'

const app = useAppStore()
const commands = useCommandsStore()

</script>

<template>
    <div class="all-center gap-2 px-2" v-if="commands.canUndo || commands.canRedo">
        <a href="" @click.prevent="commands.undo()" :class="{'disabled':!commands.canUndo}">
            <ArrowULeftTopIcon/>
        </a>
        <a href="" @click.prevent="commands.redo()" :class="{'disabled':!commands.canRedo}">
            <ArrowURightTopIcon/>
        </a>
    </div>
</template>

<style scoped lang="scss">
</style>
