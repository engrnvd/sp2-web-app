<template>
  <span :aria-hidden="!title"
        :aria-label="title"
        class="material-design-icon cloud-refresh-icon"
        role="img"
        v-bind="$attrs"
        @click="$emit('click', $event)">
    <svg :fill="fillColor"
         class="material-design-icon__svg"
         :width="size"
         :height="size"
         viewBox="0 0 24 24">
      <path d="M12 4C15.64 4 18.67 6.59 19.35 10.04C21.95 10.22 24 12.36 24 15C24 17.76 21.76 20 19 20H6C2.69 20 0 17.31 0 14C0 10.91 2.34 8.36 5.35 8.04C6.6 5.64 9.11 4 12 4M17 13V9L16 10C15.09 8.79 13.64 8 12 8C9.24 8 7 10.24 7 13C7 15.76 9.24 18 12 18C14.05 18 15.81 16.77 16.58 15H14.24C13.69 15.61 12.89 16 12 16C10.34 16 9 14.66 9 13C9 11.34 10.34 10 12 10C13.09 10 14.04 10.58 14.56 11.44L13 13H17Z">
        <title v-if="title">{{ title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: "CloudRefreshIcon",
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
