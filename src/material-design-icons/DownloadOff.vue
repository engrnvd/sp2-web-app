<template>
  <span :aria-hidden="!title"
        :aria-label="title"
        class="material-design-icon download-off-icon"
        role="img"
        v-bind="$attrs"
        @click="$emit('click', $event)">
    <svg :fill="fillColor"
         class="material-design-icon__svg"
         :width="size"
         :height="size"
         viewBox="0 0 24 24">
      <path d="M20.84 22.73L18.11 20H5V18H16.11L13.06 14.95L12 16L5 9H7.11L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M19 9H15V3H9V5.8L15.6 12.4L19 9Z">
        <title v-if="title">{{ title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: "DownloadOffIcon",
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
