<template>
  <span :aria-hidden="!title"
        :aria-label="title"
        class="material-design-icon table-key-icon"
        role="img"
        v-bind="$attrs"
        @click="$emit('click', $event)">
    <svg :fill="fillColor"
         class="material-design-icon__svg"
         :width="size"
         :height="size"
         viewBox="0 0 24 24">
      <path d="M16.83 17C16.42 15.83 15.31 15 14 15C12.34 15 11 16.34 11 18S12.34 21 14 21C15.31 21 16.42 20.17 16.83 19H19V21H21V19H22V17H16.83M14 19C13.45 19 13 18.55 13 18S13.45 17 14 17 15 17.45 15 18 14.55 19 14 19M9 18H4V14H10V15.03C10.91 13.81 12.36 13 14 13C15.1 13 16.14 13.37 17 14H18V15L18 15H20V6C20 4.89 19.11 4 18 4H4C2.9 4 2 4.89 2 6V18C2 19.11 2.9 20 4 20H9.42C9.15 19.39 9 18.71 9 18M12 8H18V12H12V8M4 8H10V12H4V8Z">
        <title v-if="title">{{ title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: "TableKeyIcon",
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
