import { defineStore } from 'pinia'
import { useStorage } from '../composables/useStorage'
import { TOKEN_KEY, USER_KEY } from '../constants'
import { FetchRequest } from '../helpers/fetch-request'
import { toFormData } from '../helpers/misc'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    form: {
      name: '',
      email: '08es34@gmail.com',
      password: '123456',
    },
    modals: {
      login: false,
    },
    loginReq: new FetchRequest('login', 'POST'),
    signupReq: new FetchRequest('register', 'POST'),
    logoutReq: new FetchRequest('logout', 'POST'),
    user: useStorage(USER_KEY),
    authToken: useStorage(TOKEN_KEY),
  }),
  getters: {
    isLoggedIn: state => state.user && state.authToken,
  },
  actions: {
    logUserIn(userData: any) {
      this.authToken = userData.token
      this.user = userData.user
    },
    register() {
      return this.signupReq.send({
        body: toFormData(this.form)
      }).then((data: any) => {
        this.logUserIn(data)
      })
    },
    login() {
      return this.loginReq.send({
        body: toFormData(this.form)
      }).then((data: any) => {
        this.logUserIn(data)
      })
    },
    logout() {
      return this.logoutReq.send().then((data: any) => {
        this.authToken = null
        this.user = null
      })
    },
  },
})
