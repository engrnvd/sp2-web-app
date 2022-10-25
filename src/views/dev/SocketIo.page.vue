<script lang="ts" setup>
import { useSocketIo, useSocketIoAuth } from 'src/composables/useSocketIo'
import { FetchRequest } from 'src/helpers/fetch-request'
import { useAuthStore } from 'src/stores/auth.store'
import UButton from 'src/U/components/UButton.vue'
import { reactive } from 'vue'

const auth = useAuthStore()
const events = reactive([])
const authEvents = reactive([])
const io = useSocketIo()
const authIo = useSocketIoAuth()
const ioReq = new FetchRequest('trigger-socket-event', 'POST')
const ioAuthReq = new FetchRequest('trigger-socket-event', 'POST', {
    body: JSON.stringify({ forUser: true })
})

io.onAny((event, ...args) => {
    events.push({ event, args })
})

authIo.onAny((event, ...args) => {
    authEvents.push({ event, args })
})

</script>

<template>
    <div class="d-flex gap-4 mb-5">
        <UButton @click="ioReq.send()">Trigger Public Event</UButton>
        <UButton @click="ioAuthReq.send()">Trigger Private Event</UButton>
    </div>
    <div class="d-flex gap-4">
        <div class="flex-grow-1">
            <div v-for="event in events" class="mb-4">
                <div class="text-muted text-small">{{ event.event }}</div>
                <div v-html="event.args[0]"></div>
            </div>
        </div>
        <div class="d-flex gap-4">
            <div class="flex-grow-1">
                <div v-for="event in authEvents" class="mb-4">
                    <div class="text-muted text-small">{{ event.event }}</div>
                    <div v-html="event.args[0]"></div>
                </div>
            </div>
        </div>
    </div>
</template>
