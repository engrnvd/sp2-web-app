<template functional>
  <span :aria-hidden="props.decorative"
        :aria-label="props.title"
        :class="[data.class, data.staticClass]"
        class="material-design-icon microsoft-yammer-icon"
        role="img"
        v-bind="data.attrs"
        v-on="listeners">
    <svg :fill="props.fillColor"
         class="material-design-icon__svg"
         :width="props.size"
         :height="props.size"
         viewBox="0 0 24 24">
      <path d="M22 12Q22 12.43 21.97 12.94 21.95 13.45 21.89 13.97 21.84 14.5 21.76 15 21.68 15.5 21.56 15.89 21.5 16.07 21.38 16.19 21.24 16.3 21.04 16.3 20.95 16.3 20.66 16.23 20.37 16.16 20.03 16.07L19.39 15.88Q19.09 15.79 18.96 15.76 18.75 16.54 18.41 17.38 18.08 18.21 17.65 19 17.22 19.8 16.7 20.5 16.18 21.25 15.61 21.82L15.43 21.95Q15.33 22 15.21 22 15 22 14.84 21.84L10.1 17.11H2.85Q2.5 17.11 2.25 16.86 2 16.61 2 16.26V7.74Q2 7.39 2.25 7.14 2.5 6.89 2.85 6.89H10.1L14.83 2.16Q15 2 15.21 2 15.33 2 15.42 2.05 15.5 2.09 15.59 2.18 15.85 2.44 16.08 2.71 16.3 3 16.5 3.28 18.23 5.55 18.96 8.28 19.14 8.23 19.44 8.14 19.74 8.05 20.06 7.96 20.37 7.87 20.65 7.8 20.92 7.74 21.04 7.74 21.24 7.74 21.38 7.85 21.5 7.97 21.56 8.15 21.68 8.56 21.77 9.05 21.85 9.55 21.91 10.06 21.96 10.57 22 11.08V12M9.82 9.37Q9.82 9.06 9.62 8.85 9.4 8.64 9.1 8.64 8.9 8.64 8.72 8.74 8.55 8.85 8.45 9.03L7.15 11.47L5.89 9.03Q5.77 8.8 5.57 8.72 5.37 8.64 5.13 8.64 4.82 8.64 4.61 8.85 4.4 9.06 4.4 9.36 4.4 9.57 4.5 9.73L6.25 12.87Q6.27 12.91 6.29 12.97 6.3 13.03 6.3 13.08V14.63Q6.3 15 6.56 15.19 6.81 15.36 7.15 15.36 7.39 15.36 7.54 15.27 7.68 15.18 7.76 15.03 7.84 14.88 7.87 14.69 7.9 14.5 7.9 14.28 7.9 14 7.88 13.76 7.86 13.5 7.86 13.28 7.86 13.14 7.87 13.03 7.88 12.93 7.93 12.85L9.73 9.73Q9.83 9.55 9.83 9.37M15.17 3.63L11.8 7Q12 7.12 12.1 7.31 12.22 7.5 12.22 7.74V10.07L17.72 8.61Q17.34 7.19 16.71 6 16.08 4.77 15.17 3.63M17.73 15.42L12.22 13.95V16.26Q12.22 16.5 12.1 16.69 12 16.88 11.8 17L15.18 20.37Q16.07 19.29 16.72 18.04 17.37 16.79 17.73 15.43V15.42M20.47 14.84Q20.6 14.14 20.66 13.43 20.72 12.73 20.72 12 20.72 11.29 20.66 10.59 20.6 9.89 20.47 9.19 18.4 9.74 16.35 10.29 14.3 10.83 12.22 11.39 12.21 11.55 12.21 11.7V12.32L12.22 12.63Q14.3 13.19 16.35 13.73 18.4 14.27 20.47 14.84Z">
        <title>{{ props.title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: "MicrosoftYammerIcon",
  props: {
    title: {
      type: String,
      default: "Microsoft Yammer icon"
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
