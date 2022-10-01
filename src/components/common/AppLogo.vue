<script lang="ts" setup>

</script>

<template>
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle class="main-circle" cx="100" cy="100" r="100" fill="#3FB15E"/>
        <circle cx="67" cy="68" r="30" fill="white"/>
        <circle cx="153" cy="65" r="20" fill="white"/>
        <circle cx="142" cy="141" r="20" fill="white"/>
        <circle cx="67" cy="148" r="20" fill="white"/>
        <rect x="59" y="70.6033" width="15" height="106" transform="rotate(-44.9819 59 70.6033)" fill="white"/>
        <rect x="50.5208" y="74.6713" width="15" height="106" transform="rotate(-91.9897 50.5208 74.6713)"
              fill="white"/>
        <rect x="59.7612" y="50" width="15" height="106" transform="rotate(0.411428 59.7612 50)" fill="white"/>
    </svg>
</template>

<style scoped lang="scss">
svg {
    width: 2em;
    height: 2em;

    circle, rect {
        fill: var(--body-bg);
    }

    .main-circle {
        fill: var(--primary) !important;
    }
}
</style>
