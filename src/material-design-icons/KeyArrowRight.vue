<template>
  <span :aria-hidden="!title"
        :aria-label="title"
        class="material-design-icon key-arrow-right-icon"
        role="img"
        v-bind="$attrs"
        @click="$emit('click', $event)">
    <svg :fill="fillColor"
         class="material-design-icon__svg"
         :width="size"
         :height="size"
         viewBox="0 0 24 24">
      <path d="M10.7 6C10.1 4.2 8.4 3 6.5 3C4 3 2 5 2 7.5S4 12 6.5 12C8.5 12 10.1 10.8 10.7 9H15V12H18V9H22V6H10.7M6.5 9C5.7 9 5 8.3 5 7.5S5.7 6 6.5 6 8 6.7 8 7.5 7.3 9 6.5 9M13 21V19H8V17H13V15L16 18L13 21">
        <title v-if="title">{{ title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: "KeyArrowRightIcon",
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
