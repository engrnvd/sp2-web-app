import { defineStore } from 'pinia'
import { FetchRequest } from '@/helpers/fetch-request'

const form = {
  name: '',
  owner_id: '',
  is_template: '',
}

export const useSitemapsStore = defineStore('sitemaps', {
  state: () => ({
    form: { ...form },
    req: new FetchRequest('sitemaps', 'GET').withProps({
      pagination: true,
      delay: 500,
      params: {
        sort: 'id',
        sortType: 'desc',
      },
    }),
    createReq: new FetchRequest('sitemaps', 'POST'),
    cloneReq: new FetchRequest('', 'POST'),
  }),
  getters: {},
  actions: {
    load() {
      this.req.send()
    },
    afterCreate(res: any) {
      // @ts-ignore
      this.req.data = this.req.data || { data: [] }
      // @ts-ignore
      this.req.data.data = this.req.data.data || []
      // @ts-ignore
      this.req.data.data.unshift(res)
      this.resetForm()
    },
    create() {
      return this.createReq.send({
        body: JSON.stringify(this.form)
      }).then(this.afterCreate)
    },
    clone(id: number) {
      this.cloneReq.url = `sitemaps/${id}/clone`
      return this.cloneReq.send().then(this.afterCreate)
    },
    resetForm() {
      this.form = { ...form }
    },
  },
})
