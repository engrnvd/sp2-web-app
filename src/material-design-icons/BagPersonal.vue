<template>
  <span :aria-hidden="!title"
        :aria-label="title"
        class="material-design-icon bag-personal-icon"
        role="img"
        v-bind="$attrs"
        @click="$emit('click', $event)">
    <svg :fill="fillColor"
         class="material-design-icon__svg"
         :width="size"
         :height="size"
         viewBox="0 0 24 24">
      <path d="M16,5V4A2,2 0 0,0 14,2H10A2,2 0 0,0 8,4V5A4,4 0 0,0 4,9V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V9A4,4 0 0,0 16,5M10,4H14V5H10V4M12,9L14,11L12,13L10,11L12,9M18,16H9V18H8V16H6V15H18V16Z">
        <title v-if="title">{{ title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: "BagPersonalIcon",
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
