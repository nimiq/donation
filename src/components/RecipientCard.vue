<template>
    <SmallPage class="recipient-card">
        <transition name="transition-fade">
            <div v-if="!isAddressValid">
                <h1 class="nq-h1">Enter an Address</h1>
                <p class="nq-text">All received donations will be sent to this Address.</p>
                <div class="address-input-wrapper">
                    <AddressInput v-model="address"/>
                </div>
                <button class="nq-button-s" @click="chooseAddress">Login existing Account</button>
            </div>
            <div v-else>
                <ArrowLeftIcon @click="goBack" />
                <Identicon :address="address"></Identicon>
                <AddressDisplay :address="address"></AddressDisplay>
                <hr class="separator" />
                <input v-model="message" class="nq-input vanishing" type="text" placeholder="Add a message..."/>
                <div class="nq-text-s">(optional)</div>
            </div>
        </transition>
    </SmallPage>
</template>

<script lang="ts">
import {
    SmallPage,
    AddressInput,
    AddressDisplay,
    Identicon,
    ArrowLeftIcon,
} from '@nimiq/vue-components';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ValidationUtils } from '@nimiq/utils';
import HubApi from '@nimiq/hub-api';

@Component({ components: {
    SmallPage,
    AddressInput,
    AddressDisplay,
    Identicon,
    ArrowLeftIcon,
}})
export default class RecipientCard extends Vue {
    private static hubApi: any = new HubApi('https://hub.nimiq-testnet.com');

    private message: string = '';
    private address: string = '';
    private isAddressValid: boolean = false;

    public async chooseAddress() {
        try {
            const { address } = await RecipientCard.hubApi.chooseAddress({ appName: 'Nimiq Donation' });
            this.address = address;
        } catch (e) {
            console.error(e);
        }
    }

    private setDonationAddress(walletId: string, address: string) {
        this.address = address;
    }

    private goBack() {
        this.address = '';
        this.isAddressValid = false;
        this.$emit('back');
    }

    @Watch('address')
    private _onAddressChange() {
        if (ValidationUtils.isValidAddress(this.address)) {
            this.isAddressValid = true;
            this.$emit('address-defined', this.address);
        }
    }
}
</script>

<style scoped>
    .recipient-card {
        padding: 4rem 0 3rem;
        position: relative;
    }

    .recipient-card > div {
        align-items: center;
        display: flex;
        flex-direction: column;
        /* justify-content: space-between; */
        justify-content: space-evenly; /* temp */
        height: 100%;
    }

    .recipient-card .nq-h1 {
        margin-top: 0;
        margin-bottom: .8rem;
    }

    .recipient-card .nq-text,
    .recipient-card .nq-input {
        text-align: center;
    }

    .recipient-card .nq-text {
        margin: 2rem 5rem;
    }

    .recipient-card .address-input-wrapper {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-bottom: 3rem;
    }

    .recipient-card .nq-button-s {
        padding: 0 2rem;
    }

    .recipient-card svg.nq-icon {
        width: 2.625rem;
        flex-shrink: 0;
        position: absolute;
        left: 4rem;
        top: 4.875rem;
        opacity: .3;
        cursor: pointer;
    }

    .recipient-card .identicon {
        width: 14.5rem;
        margin-top: 2rem;
    }

    .recipient-card .address-display {
        margin-top: 2rem;
        margin-bottom: 4.875rem;
    }

    .recipient-card .separator {
        height: 1px;
        width: 80%;
        opacity: 0.1;
        margin: 0 auto;
        margin-bottom: 2rem;
        display: none; /* temp */
    }

    .recipient-card .nq-input {
        font-size: 2.5rem;
        display: none; /* temp */
    }

    .recipient-card .nq-text-s {
        margin-top: 0;
        color: var(--nimiq-blue);
        opacity: .3;
        display: none;
    }
</style>
