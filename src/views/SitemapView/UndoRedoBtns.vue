<script lang="ts" setup>

import { useAppStore } from 'src/stores/app.store'
import { useCommandsStore } from 'src/stores/commands.store'
import { computed } from 'vue'
import ArrowULeftTopIcon from '../../material-design-icons/ArrowULeftTop.vue'
import ArrowURightTopIcon from '../../material-design-icons/ArrowURightTop.vue'

const app = useAppStore()
const commands = useCommandsStore()
const undoTooltip = computed(() => commands.canUndo ? 'Undo ' + commands.currentCommand?.label() : '')
const redoTooltip = computed(() => commands.canRedo ? 'Redo ' + commands.nextCommand?.label() : '')

</script>

<template>
    <div class="all-center gap-2 px-2" v-if="commands.canUndo || commands.canRedo">
        <a href="" v-tooltip="undoTooltip" @click.prevent="commands.undo()"
           :class="{'disabled':!commands.canUndo}">
            <ArrowULeftTopIcon/>
        </a>
        <a href="" v-tooltip="redoTooltip" @click.prevent="commands.redo()"
           :class="{'disabled':!commands.canRedo}">
            <ArrowURightTopIcon/>
        </a>
    </div>
</template>

<style scoped lang="scss">
</style>
