<template functional>
  <span :aria-hidden="props.decorative"
        :aria-label="props.title"
        :class="[data.class, data.staticClass]"
        class="material-design-icon blogger-icon"
        role="img"
        v-bind="data.attrs"
        v-on="listeners">
    <svg :fill="props.fillColor"
         class="material-design-icon__svg"
         :width="props.size"
         :height="props.size"
         viewBox="0 0 24 24">
      <path d="M12.5 10H10C9.45 10 9 9.55 9 9C9 8.45 9.45 8 10 8H12.5C13.05 8 13.5 8.45 13.5 9C13.5 9.55 13.05 10 12.5 10M15 14C15 13.45 14.55 13 14 13H10C9.45 13 9 13.45 9 14C9 14.55 9.45 15 10 15H14C14.55 15 15 14.55 15 14M22 4V20C22 21.11 21.11 22 20 22H4C2.89 22 2 21.11 2 20V4C2 2.89 2.89 2 4 2H20C21.11 2 22 2.89 22 4M18 12C18 12 18 11 17 11C16.05 11.03 16 10 16 10L16 8C16 6.34 14.66 5 13 5H9C7.34 5 6 6.34 6 8V15C6 16.66 7.34 18 9 18H15C16.66 18 18 16.66 18 15L18 12Z">
        <title>{{ props.title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: "BloggerIcon",
  props: {
    title: {
      type: String,
      default: "Blogger icon"
    },
    decorative: {
      type: Boolean,
      default: false
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
