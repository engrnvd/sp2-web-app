import { FetchRequest } from '@/helpers/fetch-request'
import { defineStore } from 'pinia'
import type { Sitemap } from 'src/classes/Sitemap'

const form = { name: '' }
const importForm = { website: 'https://' }

export const useSitemapsStore = defineStore('sitemaps', {
  state: () => ({
    form: { ...form },
    importForm: { ...importForm },
    req: new FetchRequest('sitemaps', 'GET').withProps({ delay: 500 }),
    createReq: new FetchRequest('sitemaps', 'POST'),
    cloneReq: new FetchRequest('', 'POST'),
    archiveReq: new FetchRequest('', 'POST'),
    importReq: new FetchRequest('sitemaps/import', 'POST'),
  }),
  actions: {
    load() {
      this.req.send()
    },
    afterCreate(res: any) {
      this.req.data = this.req.data || []
      this.req.data.unshift(res)
      this.resetForm()
      return res
    },
    create(data = null) {
      return this.createReq.send({
        body: JSON.stringify(data || this.form)
      }).then(this.afterCreate)
    },
    import() {
      return this.importReq.send({
        body: JSON.stringify(this.importForm)
      })
    },
    clone(id: number) {
      this.cloneReq.url = `sitemaps/${id}/clone`
      return this.cloneReq.send().then(this.afterCreate)
    },
    archive(sitemap: Partial<Sitemap>) {
      this.archiveReq.url = `sitemaps/${sitemap.id}/archive`
      return this.archiveReq.send().then(res => {
        sitemap.archived = !sitemap.archived
      })
    },
    resetForm() {
      this.form = { ...form }
      this.importForm = { ...importForm }
    },
  },
})
