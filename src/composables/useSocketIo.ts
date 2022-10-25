import { io } from 'socket.io-client'
import { env } from 'src/env'
import { useAuthStore } from 'src/stores/auth.store'

const socketIo = {
  io: null, // instance to listen to public events
  authIo: null, // instance to listen to events that are private to logged-in user
}

export const useSocketIo = function () {
  if (!socketIo.io) socketIo.io = io(env.socketIoServer)
  return socketIo.io
}

export const useSocketIoAuth = function () {
  if (!socketIo.authIo) {
    const auth = useAuthStore()
    socketIo.authIo = io(env.socketIoServer, {
      auth: {
        token: auth.authToken,
      }
    })
  }
  return socketIo.authIo
}
