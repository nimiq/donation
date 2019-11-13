<template>
    <SmallPage class="recipient-card">
        <template v-if="(wallets.length === 0 || manualInput) && address.length !== ADDRESS_MAX_LENGTH"> <!-- step 1 (lot logged in) / step 1.1 (logged in) -->
            <h1 class="nq-h1">Enter an Address</h1>
            <p class="nq-text">All received donations will be sent to this Address.</p>
            <div class="address-input-wrapper">
                <AddressInput v-model="address"/>
            </div>
            <button class="nq-button-s" v-if="wallets.length === 0">
                Login existing Account
            </button> <!-- login action -->
            <button class="nq-button-s" v-else @click="manualInput = false">
                Choose your Address
            </button>
        </template>
        <template v-else-if="(wallets.length > 0 && !manualInput) && address.length !== ADDRESS_MAX_LENGTH"> <!-- step 1 (logged in) -->
            <h1 class="nq-h1">Choose your Address </h1>
            <AccountSelector
                :wallets="processedWallets"
                :allowLogin="false"
                :showBalances="false"
                @account-selected="setDonationAddress"
            />
            <button class="nq-button-s" @click="manualInput = true">Enter an Address</button>
        </template>
        <template v-else> <!-- step 2 -->
            <Identicon :address="address"></Identicon>
            <AddressDisplay :address="address"></AddressDisplay>
            <hr class="separator" />
            <input v-model="message" class="nq-input vanishing" type="text" placeholder="Add a message..."/>
            <div class="nq-text-s">(optional)</div>
        </template>
    </SmallPage>
</template>

<script lang="ts">
import { SmallPage, AddressInput, AddressDisplay, AccountSelector, Identicon } from '@nimiq/vue-components';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Getter, State } from 'vuex-class';
import { WalletInfo } from '@/lib/WalletInfo';
import { ValidationUtils } from '@nimiq/utils';

@Component({ components: {
    SmallPage,
    AddressInput,
    AddressDisplay,
    AccountSelector,
    Identicon,
}})
export default class RecipientCard extends Vue {
    private static readonly ADDRESS_MAX_LENGTH: number = AddressInput.ADDRESS_MAX_LENGTH;

    @State private wallets!: WalletInfo[];
    @Getter private processedWallets!: WalletInfo[];

    private message: string = '';
    private manualInput: boolean = false;
    private address: string = '';

    private get ADDRESS_MAX_LENGTH() {
        return RecipientCard.ADDRESS_MAX_LENGTH;
    }

    private setDonationAddress(walletId: string, address: string) {
        this.address = address;
    }

    @Watch('address')
    private onAddressChange() {
        if (ValidationUtils.isValidAddress(this.address)) {
            this.$emit('address-defined', this.address);
        } else if (this.address.length === RecipientCard.ADDRESS_MAX_LENGTH) {
            // invalid address
        } else {
            // partial address for now
        }
    }
}
</script>

<style scoped>
    .recipient-card {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 4rem 0 3rem;
    }

    .recipient-card > .nq-h1 {
        margin-top: 0;
        margin-bottom: .8rem;
    }

    .recipient-card > .nq-text,
    .recipient-card > .nq-input {
        text-align: center;
    }

    .recipient-card > .nq-text {
        margin: 2rem 5rem;
    }

    .recipient-card > .nq-input {
        font-size: 2.5rem;
    }

    .recipient-card > .nq-text-s {
        margin-top: 0;
        color: var(--nimiq-blue);
        opacity: .3;
    }

    .recipient-card > .address-input-wrapper {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-bottom: 3rem;
    }

    .recipient-card > .nq-button-s {
        padding: 0 2rem;
    }

    .recipient-card .account-selector {
        align-self: stretch;
    }

    /* step 2 */
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
    }
</style>
