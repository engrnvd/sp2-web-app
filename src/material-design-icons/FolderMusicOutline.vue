<template>
  <span :aria-hidden="!title"
        :aria-label="title"
        class="material-design-icon folder-music-outline-icon"
        role="img"
        v-bind="$attrs"
        @click="$emit('click', $event)">
    <svg :fill="fillColor"
         class="material-design-icon__svg"
         :width="size"
         :height="size"
         viewBox="0 0 24 24">
      <path d="M20 18V8H4V18H20M20 6C21.1 6 22 6.89 22 8V18C22 19.1 21.1 20 20 20H4C2.89 20 2 19.1 2 18L2 6C2 4.89 2.89 4 4 4H10L12 6H20M18 9V11H16V15C16 16.11 15.11 17 14 17C12.9 17 12 16.11 12 15C12 13.9 12.9 13 14 13C14.17 13 14.34 13 14.5 13.06V9H18Z">
        <title v-if="title">{{ title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: "FolderMusicOutlineIcon",
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
