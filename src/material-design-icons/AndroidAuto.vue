<template functional>
  <span :aria-hidden="props.decorative"
        :aria-label="props.title"
        :class="[data.class, data.staticClass]"
        class="material-design-icon android-auto-icon"
        role="img"
        v-bind="data.attrs"
        v-on="listeners">
    <svg :fill="props.fillColor"
         class="material-design-icon__svg"
         :width="props.size"
         :height="props.size"
         viewBox="0 0 24 24">
      <path d="M22.78,17.91C22.94,18.16 23,18.42 23,18.7C23,19.08 22.87,19.39 22.57,19.64C22.27,19.89 21.94,20 21.56,20H19.08L12.42,8H11.58L4.92,20H2.39C1.92,20 1.53,19.8 1.22,19.38C0.91,18.96 0.89,18.5 1.17,18L10.78,1.69C11.09,1.22 11.5,1 12,1C12.53,1 12.92,1.22 13.17,1.69L22.78,17.91M4.78,22.31L12,9.38L19.22,22.31L18.5,23L12,20.34L5.44,23L4.78,22.31Z">
        <title>{{ props.title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: "AndroidAutoIcon",
  props: {
    title: {
      type: String,
      default: "Android Auto icon"
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
