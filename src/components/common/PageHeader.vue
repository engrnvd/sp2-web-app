<template>
    <div class="d-flex align-items-center gap-2 px-4">
        <h2 class="flex-grow-1">
            <slot></slot>
        </h2>
        <slot name="end"></slot>
    </div>
</template>
