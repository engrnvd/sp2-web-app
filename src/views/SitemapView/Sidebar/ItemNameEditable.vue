<script setup lang="ts">
import ApmEditable from '@/components/common/ApmEditable.vue'
import { EditItemPropCommand } from 'src/commands/EditItemPropCommand'
import { useAppStore } from 'src/stores/app.store'
import { computed } from 'vue'

const app = useAppStore()
const item = computed(() => app.canvas?.selectedItem)

function update(value) {
    new EditItemPropCommand({ item: item.value.meta, prop: 'name', value }).execute()
}

</script>


<template>
    <ApmEditable
        class="item-name-editable"
        :model-value="item.meta.name"
        filed-name="name"
        @update:modelValue="update"
        confirm-before-save
    />
</template>

<style lang="scss">
.item-name-editable {
    input {
        font-weight: bold;
    }
}
</style>
