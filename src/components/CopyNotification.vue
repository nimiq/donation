<template>
    <transition name="transition-fade">
        <div v-if="isOpened"
             :class="theme"
             class="copy-notification">
            Copied Successfully
        </div>
    </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

/**
 * **Copy Notification**
 *
 * Props:
 *
 * **theme** {'dark','light'} [optional, default 'light'] the theme of the notification pill
 *
 * Methods:
 *
 * **show** Show the notification pill at the bottom right for 1.5s
 */
@Component
export default class CopyNotification extends Vue {
    @Prop({
        type: String,
        default: 'light',
        validator: (theme) => ['light', 'dark'].includes(theme),
    })
    public theme!: string;

    private isOpened: boolean = false;
    private timeoutID: number | null = null;

    public show(): void {
        if (this.timeoutID) {
            clearTimeout(this.timeoutID);
        }
        this.isOpened = true;
        this.timeoutID = setTimeout(() => {
            this.isOpened = false;
            this.timeoutID = null;
        }, 1500);
    }
}
</script>

<style scoped>
    .copy-notification {
        display: block;
        position: absolute;
        right: 2rem;
        bottom: 6.5rem;
        padding: 2rem;
        border-radius: 1rem;
    }

    .copy-notification.light {
        color: var(--nimiq-blue);
        /* nq-blue-bg background with low opacity over gray */
        background: #f4f4f4 radial-gradient(22rem at 100% 100%, #2601330A 0%, #1F23480A 100%);
    }

    .copy-notification.dark {
        color: rgba(255, 255, 255, 0.6);
        background: var(--nimiq-blue-bg);
    }
</style>
