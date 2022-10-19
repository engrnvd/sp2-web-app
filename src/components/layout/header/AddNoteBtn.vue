<script lang="ts" setup>
import { SitemapNote } from 'src/classes/SitemapNote'
import { cssFontSize } from 'src/helpers/misc'
import NoteOutlineIcon from 'src/material-design-icons/NoteOutline.vue'
import { useAppStore } from 'src/stores/app.store'
import UButton from 'src/U/components/UButton.vue'

const app = useAppStore()

async function addNote() {
    const canvas = app.canvas
    const fontSize = cssFontSize()
    const { AddNoteCommand } = await import('@/commands/AddNoteCommand')
    const note = new SitemapNote(app.sitemap, { text: 'New note...' })

    const { x, y } = canvas.vpCenter
    note.left = x - note.ci.relWidth / 2
    note.top = y - note.ci.relHeight / 2

    new AddNoteCommand({ note }).execute()

    app.canvas.setEditedItem(note.ci)
    app.canvas.setSelectedItem(note.ci)
}

</script>

<template>
    <UButton
        class="add-note-btn"
        icon transparent
        v-tooltip="'Add sticky note'"
        @click="addNote">
        <NoteOutlineIcon/>
    </UButton>
</template>

<style scoped lang="scss">
</style>
