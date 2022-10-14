<template>
    <div class="card p-4 text-muted all-center flex-column">
        <div style="font-size: 14rem; color: rgba(0,0,0,0.1)">
            <slot name="icon"></slot>
        </div>
        <div class="mb-5">
            <slot></slot>
        </div>
        <slot name="action"></slot>
    </div>
</template>
