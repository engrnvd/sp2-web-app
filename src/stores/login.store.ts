import { defineStore } from 'pinia'

export const LoginStates = {
  Login: 'Login',
  ForgotPassword: 'Forgot Password',
  Register: 'Register',
}

export const useLoginStore = defineStore('login', {
  state: () => ({
    page: LoginStates.Login,
    showOtp: false,
  }),
  getters: {
    isLoginPage: state => state.page === LoginStates.Login,
    isRegisterPage: state => state.page === LoginStates.Register,
    isForgotPage: state => state.page === LoginStates.ForgotPassword,
  },
  actions: {
    gotoLogin() {
      this.page = LoginStates.Login
    },
    gotoForgotPassword() {
      this.page = LoginStates.ForgotPassword
    },
    gotoRegister() {
      this.page = LoginStates.Register
    },
  },
})
