<template>
  <span :aria-hidden="!title"
        :aria-label="title"
        class="material-design-icon call-made-icon"
        role="img"
        v-bind="$attrs"
        @click="$emit('click', $event)">
    <svg :fill="fillColor"
         class="material-design-icon__svg"
         :width="size"
         :height="size"
         viewBox="0 0 24 24">
      <path d="M9,5V7H15.59L4,18.59L5.41,20L17,8.41V15H19V5">
        <title v-if="title">{{ title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: "CallMadeIcon",
  props: {
    title: {
      type: String,
    },
    fillColor: {
      type: String,
      default: "currentColor"
    },
    size: {

      default: '1em'
    }
  }
}
</script>
