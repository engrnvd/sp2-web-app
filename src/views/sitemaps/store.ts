import { defineStore } from 'pinia'
import { FetchRequest } from '@/helpers/fetch-request'
import { toFormData } from '@/helpers/misc'
import { useNotify } from '@/U/composables/Notifiy'

const notify = useNotify()
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
    createReq: new FetchRequest('sitemaps', 'POST')
  }),
  getters: {},
  actions: {
    load() {
      this.req.send()
    },
    create() {
      return this.createReq.send({
        body: toFormData(this.form)
      }).then(res => {
        this.req.data = this.req.data || { data: [] }
        // @ts-ignore
        this.req.data.data = this.req.data.data || []
        // @ts-ignore
        this.req.data.data.unshift(res)
        this.resetForm()

        notify.success('Success', 'Sitemap created')
      })
    },
    resetForm() {
      this.form = { ...form }
    },
  },
})
