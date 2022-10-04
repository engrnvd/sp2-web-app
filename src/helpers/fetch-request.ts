/*
* The config object basically accepts all parameters that fetch does:
* https://developer.mozilla.org/en-US/docs/Web/API/fetch
* Other than that, following parameters can be sent
* delay: To delay the execution.Type: Number. Unit: milliseconds. Default: 0
* delayFirstRequest: Whether you want to delay the first request. Type: Boolean. default: false
* pagination: Whether to request paginated data. Type: Bool. Default: false
* paginationMode: replace | append. Type: Bool. Default: 'replace'. Set to 'append' to implement "load more" feature)
* */
import { TOKEN_KEY, USER_KEY } from '../constants'
import { env } from '../env'
import { useAuthStore } from '../stores/auth.store'
import { Storage } from './storage-helper'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS' | 'DELETE' | 'HEAD' | 'CONNECT' | 'TRACE'

export class FetchRequest {
  url
  firstRequest = true
  lastRequestId: any = null
  data = []
  error = ''
  loading = false
  loaded = false
  perPageOriginal = null
  allLoaded = false
  config: RequestInit = {}
  delay = 0
  delayFirstRequest = false
  pagination = false
  paginationMode: 'append' | 'replace' = 'append'
  params = {
    page: 1,
    perPage: 10
  }

  withProps(props: Partial<FetchRequest>) {
    for (const prop in props) {
      // @ts-ignore
      this[prop] = props[prop]
    }
    return this
  }

  constructor(url: string, method: HttpMethod = 'GET', config: RequestInit = {}) {
    this.url = url

    // check for pagination
    if (this.pagination) {
      // @ts-ignore
      this.data = { data: [] }
    }

    this.mergeConfig(config)
    this.config.method = method
  }

  mergeConfig(config: RequestInit) {
    this.config = { ...this.config, ...config }
  }

  showError() {
    const logoutErrors = ['Wrong number of segments', 'logged out', 'You are not logged in!']
    if (logoutErrors.includes(this.error)) {
      this.logoutAndRefresh()
    }
    // todo: app.config.globalProperties.$notify('error', 'Something went wrong!', this.error)
  }

  logoutAndRefresh() {
    let loggedIn = Storage.get(TOKEN_KEY)
    if (loggedIn) {
      Storage.remove(USER_KEY)
      Storage.remove(TOKEN_KEY)
    }

    // todo
    // store.commit('user/setAuthToken', '')
    // store.commit('user/setUser', null)
    // store.commit('menu/toggleUserMenuValues', userMenuItems)
    // store.commit('menu/toggleLoginModal', true)
  }

  send(config: RequestInit = {}) {
    return new Promise((resolve, reject) => {
      if (!this.url) {
        reject('No url to send request to')
        return
      }

      this.mergeConfig(config)
      config = this.config

      // make request
      this.loading = true
      if (this.pagination && this.paginationMode === 'append' && !this.firstRequest) {
        // @ts-ignore
        this.params.page++
      }
      this.loaded = false
      this.error = ''
      let delay = this.delay || 0
      if (this.firstRequest && !this.delayFirstRequest) delay = 0

      if (this.lastRequestId) clearTimeout(this.lastRequestId)
      this.lastRequestId = setTimeout(() => {
        const auth = useAuthStore()
        // append the base url
        const url = env.apiUrl + this.url.replace(/^\//, '')
        // attach token if available
        config.headers = config.headers || {
          'Accept': 'application/json'
        }
        let token = auth.authToken
        if (token) { // @ts-ignore
          config.headers.Authorization = `Bearer ${token}`
        }

        fetch(url, config).then(async (res: Response) => {
          let output = res
          try {
            output = await res.json()
          } catch (e) {
          }
          return output
        }).then(res => {
          // if (res.data?.status === 'fail' || res.data?.status === 'invalid_schema') {
          //   this.error = res.data?.message || 'Something went wrong'
          //   this.showError()
          //   return
          // }
          if (this.pagination) {
            // @ts-ignore
            if (config.params.page !== 1 && config.paginationMode === 'append') {
              // @ts-ignore
              this.data.data = this.data.data.concat(res.data)
            } else {
              // @ts-ignore
              this.data = res.data
            }

            // @ts-ignore
            if (!res.data.data || !res.data.data.length || this.data.data.length === parseInt(res.data.total)) {
              this.allLoaded = true
            }
          } else {
            // @ts-ignore
            this.data = res
          }
        }).catch(res => {
          if (typeof res === 'string' && res.match(/Failed to execute 'setRequestHeader' on 'XMLHttpRequest'/)) {
            this.logoutAndRefresh()
          }

          if (typeof res === 'string') this.error = res
          else this.error = res.data?.message || res.data?.error || res.data || res

          this.showError()
        }).then(() => {
          this.firstRequest = false
          this.loading = false
          this.loaded = true
          if (this.error) reject(this.error)
          else resolve(this.data)
        })
      }, delay)
    })
  }

  upload(config: RequestInit, files = [], key = 'attachments', single = false) {
    if (files instanceof File) {
      // @ts-ignore
      files = [files]
    }

    if (files.length) {
      let formData = new FormData()
      if (config.hasOwnProperty('data')) {
        // @ts-ignore
        for (let key in config.body) {
          // @ts-ignore
          formData.set(key, typeof config.body[key] === 'object' ? JSON.stringify(config.body[key]) : config.body[key])
        }
      }
      if (single) {
        formData.append(key, files[0])
      } else {
        files.forEach(function (f) {
          formData.append(key + '[]', f)
        })
      }

      config.body = formData
    }

    return this.send(config)
  }
}



