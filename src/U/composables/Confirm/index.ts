import ConfirmModal from "./ConfirmModal.vue"
import { createApp, defineComponent } from "vue";

export default {
    install(app, options = {}) {
        const wrapper = document.createElement("div")
        document.querySelector('body').appendChild(wrapper)
        let Component = createApp(defineComponent({ extends: ConfirmModal })).mount(wrapper)

        app.config.globalProperties.$confirm = (title, message, options) => {
            return new Promise(resolve => {
                Component.setData({
                    ...options,
                    title,
                    message,
                    open: true,
                    onClose(ok) {
                        resolve(ok)
                    }
                })
            })
        }
    }
}
