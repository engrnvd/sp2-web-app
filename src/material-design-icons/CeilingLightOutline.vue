<template>
  <span :aria-hidden="!title"
        :aria-label="title"
        class="material-design-icon ceiling-light-outline-icon"
        role="img"
        v-bind="$attrs"
        @click="$emit('click', $event)">
    <svg :fill="fillColor"
         class="material-design-icon__svg"
         :width="size"
         :height="size"
         viewBox="0 0 24 24">
      <path d="M14.76 11L16.76 15H7.24L9.24 11H14.76M13 4H11V9H8L4 17H20L16 9H13V4M14 18H10C10 19.11 10.9 20 12 20S14 19.11 14 18Z">
        <title v-if="title">{{ title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: "CeilingLightOutlineIcon",
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
