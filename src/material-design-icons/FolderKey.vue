<template>
  <span :aria-hidden="!title"
        :aria-label="title"
        class="material-design-icon folder-key-icon"
        role="img"
        v-bind="$attrs"
        @click="$emit('click', $event)">
    <svg :fill="fillColor"
         class="material-design-icon__svg"
         :width="size"
         :height="size"
         viewBox="0 0 24 24">
      <path d="M4,4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8A2,2 0 0,0 20,6H12L10,4M11,10C12.31,10 13.42,10.84 13.83,12H19V14H18V16H16V14H13.83C13.42,15.17 12.31,16 11,16A3,3 0 0,1 8,13A3,3 0 0,1 11,10M11,12A1,1 0 0,0 10,13C10,13.56 10.45,14 11,14A1,1 0 0,0 12,13A1,1 0 0,0 11,12Z">
        <title v-if="title">{{ title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: "FolderKeyIcon",
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
