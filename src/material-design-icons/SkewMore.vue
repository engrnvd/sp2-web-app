<template>
  <span :aria-hidden="!title"
        :aria-label="title"
        class="material-design-icon skew-more-icon"
        role="img"
        v-bind="$attrs"
        @click="$emit('click', $event)">
    <svg :fill="fillColor"
         class="material-design-icon__svg"
         :width="size"
         :height="size"
         viewBox="0 0 24 24">
      <path d="M12.5,11L10.41,20H5.5L7.59,11H12.5M15,9H6L3,22H12L15,9M21,6L17,2V5H9V7H17V10L21,6Z">
        <title v-if="title">{{ title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: "SkewMoreIcon",
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
