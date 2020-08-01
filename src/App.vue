<template>
    <div id="app">
        <RecipientCard
            ref="recipientCard"
            :address="recipientAddress"
            @address-defined="setRecipientAddress"
            @message-change="setMessage"
            @back="recipientAddress = ''"
        />

        <transition name="transition-fade">
            <div v-if="!recipientAddress || isMobile" class="welcome-message">
                <h1>Get NIM Donations</h1>
                <p>
                    Easily receive donations by creating
                    a personalized button or QR code.<br>
                    <span class="welcome-start">
                        Choose an Address to start.
                    </span>
                </p>
            </div>
        </transition>

        <transition name="transition-fade">
            <ButtonCard v-if="recipientAddress" :requestLink="requestLink"></ButtonCard>
        </transition>

        <transition name="transition-fade">
            <DownloadCard v-if="recipientAddress" :requestLink="requestLink"></DownloadCard>
        </transition>
    </div>
</template>

<script lang="ts">
import '@nimiq/style/nimiq-style.min.css';
import '@nimiq/vue-components/dist/NimiqVueComponents.css';
import { Component, Vue } from 'vue-property-decorator';
import DownloadCard from './components/DownloadCard.vue';
import ButtonCard from './components/ButtonCard.vue';
import RecipientCard from './components/RecipientCard.vue';
import { createRequestLink, Currency, NimiqRequestLinkType } from '@nimiq/utils';

@Component({ components: {
    RecipientCard,
    ButtonCard,
    DownloadCard,
}})
export default class App extends Vue {
    private static MOBILE_BREAKPOINT = 1150;

    private recipientAddress: string = '';
    private requestLinkMessage: string = '';
    private isMobile: boolean = false;

    private get requestLink(): string {
        return 'https://wallet.nimiq.com/' + createRequestLink(
            this.recipientAddress,
            {
                currency: Currency.NIM,
                type: NimiqRequestLinkType.URI,
                message: this.requestLinkMessage,
            },
        );
    }

    private created() {
        this._checkWindowSize = this._checkWindowSize.bind(this);
        this._checkWindowSize();
        window.addEventListener('resize', this._checkWindowSize);
    }

    private destroyed() {
        window.removeEventListener('resize', this._checkWindowSize);
    }

    private setRecipientAddress(address: string) {
        this.recipientAddress = address;
        this._scrollToRecipientCard();
    }

    private setMessage(message: string) {
        this.requestLinkMessage = message;
    }

    private async _scrollToRecipientCard() {
        await Vue.nextTick();
        const clientRect = (this.$refs.recipientCard as ButtonCard).$el.getBoundingClientRect();
        const top = clientRect.top + clientRect.height;

        try {
            window.scrollBy({
                top,
                behavior: 'smooth',
            });
        } catch (e) {
            window.scrollBy(0, top);
        }
    }

    private _checkWindowSize() {
        this.isMobile = window.innerWidth <= App.MOBILE_BREAKPOINT;
    }
}
</script>

<style scoped>
    #app {
        --card-height: 57.75rem;
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
    }

    .recipient-card {
        width: 42.5rem;
        margin: 0 calc(2 * var(--card-gap)) 0 0;
    }

    .button-card {
        width: var(--button-card-width);
        margin-right: var(--card-gap);
    }

    .welcome-message.transition-fade-leave-active + .button-card,
    .welcome-message.transition-fade-enter-active + .button-card {
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
            margin-bottom: calc(4 * var(--card-gap));
        }

        .welcome-message {
            order: -1;
            height: auto;
            padding-left: 0;
            margin: 7rem 0;
            text-align: center;
        }

        .welcome-message h1 {
            font-size: 6rem;
        }

        .welcome-message p {
            margin-top: 3rem;
            font-size: 3rem;
        }

        .welcome-message.transition-fade-leave-active + .button-card,
        .welcome-message.transition-fade-enter-active + .button-card {
            margin-left: 0;
        }
    }

    @media (max-width: 540px) {
        #app {
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
        .welcome-message {
            text-align: left;
            max-width: 42.5rem;
        }

        .welcome-message h1 {
            font-size: 3rem;
        }

        .welcome-message p {
            font-size: 2.5rem;
        }

        .recipient-card {
            width: 100%;
        }
    }
</style>

<style>
    .transition-opacity,
    .transition-fade-enter-active,
    .transition-fade-leave-active {
        transition: opacity .3s cubic-bezier(0.25, 0, 0, 1);
    }

    .transition-fade-enter,
    .transition-fade-leave-to {
        opacity: 0;
    }
</style>
