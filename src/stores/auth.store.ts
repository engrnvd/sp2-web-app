import { defineStore } from 'pinia'
import { useStorage } from '../composables/useStorage'
import { TOKEN_KEY, USER_KEY } from '../constants'
import { FetchRequest } from '../helpers/fetch-request'
import { toFormData } from '../helpers/misc'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    form: {
      email: '08es34@gmail.com',
      password: '123456',
    },
    modals: {
      login: false,
    },
    loginReq: new FetchRequest('login', 'POST'),
    user: useStorage(USER_KEY),
    authToken: useStorage(TOKEN_KEY),
  }),
  getters: {
    isLoggedIn: state => state.user && state.authToken,
  },
  actions: {
    login() {
      return this.loginReq.send({
        body: toFormData(this.form)
      }).then((data: any) => {
        this.authToken = data.token
        this.user = data.user
      })
    },
  },
})
