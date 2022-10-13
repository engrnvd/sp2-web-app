import { defineStore } from 'pinia'
import { FetchRequest } from '../helpers/fetch-request'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    updateReq: new FetchRequest('profile/update', 'POST'),
    updatePasswordReq: new FetchRequest('profile/change-password', 'POST'),
    deleteAccountReq: new FetchRequest('profile/delete-account', 'POST'),
  }),
  actions: {
    updateProfile(payload: any) {
      return this.updateReq.send({
        body: JSON.stringify(payload)
      })
    },
  },
})
