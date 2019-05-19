<template>
    <div id="app">
        <SmallPage class="recipient-card">
            RecipientCard
        </SmallPage>
        <transition name="transition-fade">
            <div v-if="!recipientAddress" class="welcome-message transition-opacity">
                <h1>Get NIM Donations</h1>
                <p>
                    Easily receive donations by creating<br>
                    a personalized button or QR code.<br>
                    <span class="welcome-start transition-opacity">
                        Choose an Address to start.
                    </span>
                </p>
            </div>
        </transition>
        <transition name="transition-fade">
            <div v-if="recipientAddress" class="button-card transition-opacity">
                ButtonCard
            </div>
        </transition>
        <transition name="transition-fade">
            <div v-if="recipientAddress" class="qr-download-card transition-opacity">
                QrDownloadCard
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import '@nimiq/style/nimiq-style.min.css';
import '@nimiq/vue-components/dist/NimiqVueComponents.css';

import { Component, Vue } from 'vue-property-decorator';
import { SmallPage } from '@nimiq/vue-components';

@Component({components: {SmallPage}})
export default class App extends Vue {
    private recipientAddress: string | null = null;
}
</script>

<style scoped>
    #app {
        --card-height: 57.75rem;
        --recipient-card-width: 42.5rem;
        --button-card-width: 51.5rem;
        --qr-download-card-width: 36.75rem;
        --card-gap: 1rem;
        --welcome-message-width: calc(var(--button-card-width) + var(--card-gap) + var(--qr-download-card-width));

        display: flex;
        justify-content: center;
        align-items: center;
    }

    #app > * {
        height: var(--card-height);
    }

    .welcome-message {
        width: var(--welcome-message-width);
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 8rem;
    }

    .welcome-message h1 {
        font-size: 8rem;
        margin: 0;
    }

    .welcome-message p {
        font-size: 4rem;
        margin: 5rem 0 0;
        letter-spacing: .027rem;
        line-height: 1.3;
    }

    .welcome-message .welcome-start {
        opacity: .5;
        cursor: pointer;
    }

    .welcome-message .welcome-start:hover {
        opacity: .7;
    }

    .recipient-card {
        width: var(--recipient-card-width) !important;
        margin: 0 calc(2 * var(--card-gap)) 0 0;
    }

    .button-card {
        width: var(--button-card-width);
        margin-right: var(--card-gap);
    }

    .button-card.transition-fade-enter-active {
        margin-left: calc(-1 * var(--welcome-message-width)); /* to position it over the fading welcome message */
    }

    .qr-download-card {
        width: var(--qr-download-card-width);
    }

    .button-card,
    .qr-download-card {
        border-radius: 1rem;
        /* --nimiq-blue-bg with .4 opacity (0A) */
        background: radial-gradient(413.00px at 100% 100%, #2601330A 0%, #1F23480A 100%);
    }
</style>

<style>
    .transition-opacity {
        transition: opacity .3s cubic-bezier(0.25, 0, 0, 1);
    }

    .transition-fade-enter,
    .transition-fade-leave-to {
        opacity: 0;
    }
</style>
