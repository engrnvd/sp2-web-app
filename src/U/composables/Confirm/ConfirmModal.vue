<template>
    <ApmModal
        :title="title"
        v-model="open"
        :ok-title="okTitle"
        :cancel-title="cancelTitle"
        @ok="onOk"
        @cancel="onCancel"
    >{{ message }}
    </ApmModal>
</template>

<script>
import ApmModal from "@/components/base-components/ApmModal.vue"

export default {
    name: "ConfirmModal",
    components: { ApmModal },
    props: {},
    computed: {},
    data: () => ({
        title: '',
        open: false,
        message: '',
        okTitle: 'Yes',
        cancelTitle: 'No',
        onClose: null,
    }),
    methods: {
        setData(dataProps = {}) {
            for (let prop in dataProps) {
                this[prop] = dataProps[prop]
            }
        },
        onOk() {
            if (this.onClose) this.onClose(true)
        },
        onCancel() {
            if (this.onClose) this.onClose(false)
        },
    },
}
</script>

<style scoped>
</style>
