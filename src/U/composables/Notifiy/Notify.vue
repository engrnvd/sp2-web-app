<template>
    <div :class="{'notification-container': true, 'notification-container-empty' : items.length===0}">
        <transition-group name="ntf" tag="div" mode="out">
            <div v-for="item in items" :key="item.id" :class="'notification shadow-0 '+item.options.type"
                 @click="removeItem(item.id)">
                <div class="notification-message">
                    <h4 class="title" v-if="item.title">{{ item.title }}</h4>
                    <div class="message" v-if="item.message" v-html="item.message"/>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: null,
            title: null,
            options: {
                type: 'success',
                duration: 4000,
                permanent: false
            },
            items: [],
            idx: 0
        }
    },
    methods: {
        createUUID() {
            const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
            return pattern.replace(/[xy]/g, c => {
                const r = (Math.random() * 16) | 0
                const v = c === 'x' ? r : (r & 0x3) | 0x8
                return v.toString(16)
            })
        },
        addItem(type, title, message, options) {
            let defaultOptions = {
                type: type,
                duration: this.options.duration,
                permanent: this.options.permanent
            }
            let itemOptions = Object.assign({}, defaultOptions, options)

            let idx = this.createUUID()
            let newItem = {
                id: idx,
                message: message,
                title: title,
                options: itemOptions
            }

            this.items.push(newItem)

            if (itemOptions.permanent === false) {
                setTimeout(() => {
                    this.removeItem(idx)
                }, itemOptions.duration)
            }
        },
        removeItem(uid) {
            this.items = Object.assign([], this.items.filter(x => x.id !== uid))
        },
        removeAll() {
            this.items = []
        }
    }
}
</script>
<style lang="scss">
.alert *[data-notify="title"] {
    display: block;
    font-size: 0.9rem;
}

div[data-notify="container"] {
    padding: 1em;
}

.notification-container {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999999;
    width: 320px;
    padding: 0px 15px;
    max-height: calc(100% - 30px);
}

.notification {
    box-sizing: border-box;
    padding: 1em;
    border-radius: var(--border-radius);
    cursor: pointer;
    position: relative;
    opacity: 0.95;
    margin-top: 1em;

    --color: var(--primary);

    $theme-colors: ("primary", "secondary", "success", "info", "danger");
    @each $color in $theme-colors {
        &.#{$color} {
            --color: var(--#{$color});
        }
    }

    color: var(--light);
    background-color: var(--color);

    .title {
        font-weight: bold;
        margin: 0 0 1em 0;
    }

    &:hover, &:focus {
        opacity: 1;
    }

}

.notification-enter {
    visibility: hidden;
    transform: translate3d(100%, 0, 0);
}

.notification-enter.notification-enter-active {
    visibility: visible;
    transform: translate3d(0, 0, 0);
    transition: all 0.4s;
}

.notification-leave {
    visibility: visible;
    transform: translate3d(0, 0, 0);
}

.notification-leave.notification-leave-active {
    visibility: hidden;
    transform: translate3d(100%, 0, 0);
    transition: all 0.4s;
}

.notification:before {
    content: "";
    display: none;
}

.ntf-enter {
    opacity: 0;
}

.ntf-leave {
    opacity: 1;
}

.ntf-enter-active {
    animation: slideInRight 0.4s;
}

.ntf-leave-active {
    animation: slideOutRight 0.4s;
}

@-webkit-keyframes slideInRight {
    from {
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
        visibility: visible;
    }

    to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

@keyframes slideInRight {
    from {
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
        visibility: visible;
    }

    to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

.slideInRight {
    -webkit-animation-name: slideInRight;
    animation-name: slideInRight;
}

@-webkit-keyframes slideOutRight {
    from {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

    to {
        visibility: hidden;
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
    }
}

@keyframes slideOutRight {
    from {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

    to {
        visibility: hidden;
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
    }
}

.slideOutRight {
    -webkit-animation-name: slideOutRight;
    animation-name: slideOutRight;
}
</style>
