<template>
    <div id="app">
        <RecipientCard :address="recipientAddress"></RecipientCard>

        <transition name="transition-fade">
            <div v-if="!recipientAddress || isMobile" class="welcome-message transition-opacity">
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

        <ButtonCard v-if="recipientAddress" :address="recipientAddress"></ButtonCard>
        <DownloadCard v-if="recipientAddress" :address="recipientAddress"></DownloadCard>
    </div>
</template>

<script lang="ts">
import '@nimiq/style/nimiq-style.min.css';
import '@nimiq/vue-components/dist/NimiqVueComponents.css';

import { Component, Vue } from 'vue-property-decorator';
import { SmallPage, AddressDisplay, Identicon } from '@nimiq/vue-components';
import DownloadCard from './components/DownloadCard.vue'
import ButtonCard from './components/ButtonCard.vue'
import RecipientCard from './components/RecipientCard.vue'
@Component({components: {SmallPage, RecipientCard, ButtonCard, DownloadCard}})
export default class App extends Vue {
    private static MOBILE_BREAKPOINT = 1150;

    private recipientAddress: string | null = 'NQ32 473Y R5T3 979R 325K S8UT 7E3A NRNS VBX2';
    private isMobile: boolean = false;

    private created() {
        this._checkWindowSize = this._checkWindowSize.bind(this);
        this._checkWindowSize();
        window.addEventListener('resize', this._checkWindowSize);
    }

    private destroyed() {
        window.removeEventListener('resize', this._checkWindowSize);
    }

    private _checkWindowSize() {
        this.isMobile = window.innerWidth <= App.MOBILE_BREAKPOINT;
    }
}
</script>

<style>
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

    .welcome-message,
    .recipient-card,
    .button-card,
    .qr-download-card {
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
        width: var(--recipient-card-width);
        margin: 0 calc(2 * var(--card-gap)) 0 0;
        display: flex;

    }

    .button-card {
        width: var(--button-card-width);
        margin-right: var(--card-gap);
    }

    .welcome-message.transition-fade-leave-active + .button-card {
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

    @media (max-width: 1150px) {
        #app {
            --recipient-card-width: 62.5rem;
            --button-card-width: 62.5rem;
            --qr-download-card-width: 62.5rem;
            --welcome-message-width: 62.5rem;

            flex-direction: column;
        }

        .welcome-message,
        .recipient-card,
        .button-card,
        .qr-download-card {
            margin-right: 0;
            margin-bottom: var(--card-gap);
        }

        .welcome-message {
            order: -1;
            height: auto;
            padding-left: 0;
            margin: 7rem 0;
        }

        .welcome-message h1 {
            font-size: 6rem;
        }

        .welcome-message p {
            margin-top: 3rem;
            font-size: 3rem;
        }

        .recipient-card {
            max-width: unset;
            margin-bottom: calc(2 * var(--card-gap));
        }

        .welcome-message.transition-fade-leave-active + .button-card {
            margin-left: 0;
        }
    }

    @media (max-width: 540px) {
        #app {
            --recipient-card-width: 100%;
            --button-card-width: 100%;
            --qr-download-card-width: 100%;
            --welcome-message-width: 100%;
        }

        .welcome-message {
            margin-top: 4rem;
        }

        .welcome-message h1 {
            font-size: 4rem;
        }
    }

    @media (max-width: 450px) {
        .welcome-message h1 {
            font-size: 3rem;
        }

        .welcome-message p {
            font-size: 2.5rem;
        }
    }

    .transition-opacity {
        transition: opacity .3s cubic-bezier(0.25, 0, 0, 1);
    }

    .transition-fade-enter,
    .transition-fade-leave-to {
        opacity: 0;
    }
</style>
