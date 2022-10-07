<script lang="ts" setup>

import { useOutsideClick } from '@/U/composables/useOutsideClick'
import { ref } from 'vue'

const props = defineProps({
    left: Boolean,
    right: Boolean,
    down: Boolean,
    up: Boolean,
})

const ddEl = ref()
const open = ref(false)

useOutsideClick(ddEl, () => {
    open.value = false
})

</script>

<template>
    <div class="u-dropdown" ref="ddEl">
        <div class="u-dropdown-btn" @click="open = !open">
            <slot></slot>
        </div>
        <Transition :name="`slide-${up ? 'up' : 'down'}`">
            <div :class="{left, right, down, up}" class="u-dropdown-content shadow-0" v-if="open">
                <slot name="content"></slot>
            </div>
        </Transition>
    </div>
</template>

<style lang="scss">
.u-dropdown {
    position: relative;
    display: inline-block;

    .u-dropdown-btn {
        cursor: pointer;
    }

    .u-dropdown-content {
        position: absolute;
        background-color: var(--bg);
        border-radius: var(--border-radius);

        &.left {
            right: 0;
        }

        &.up {
            bottom: 100%;
        }
    }
}

</style>
