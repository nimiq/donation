<template>
    <SmallPage class="recipient-card">
        <Identicon :address="address"></Identicon>
        <AddressDisplay :address="address"></AddressDisplay>
        <hr class="separator" />
        <input v-model="message" class="nq-input vanishing" type="text" placeholder="Add a Message"/>
        <div class="nq-text-s">(optional)</div>
    </SmallPage>
</template>


<script lang="ts">
import { SmallPage, Identicon, AddressDisplay } from '@nimiq/vue-components';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({components: {SmallPage, Identicon, AddressDisplay}})
export default class RecipientCard extends Vue {

    @Prop(String) public address!: string;

    private message: string = '';
}
</script>

<style scoped>
    .recipient-card {
        align-items: center;
        display: flex;
        padding: 0 35px;
    }

    .recipient-card .identicon {
        margin-top: 57px;
        margin-bottom: 32px;
    }

    .recipient-card .address-display {
        margin-bottom: 39px;
    }

    .recipient-card .separator {
        height: 1px;
        width: 100%;
        opacity: 0.1;
        border: 1px solid var(--nimiq-blue);
        margin-bottom: 30px;
    }

    .nq-input.vanishing {
        text-align: center;
    }

    .recipient-card .nq-text-s {
        color: var(--nimiq-blue);
        /* Dark Blue */
        opacity: 0.3;
    }
</style>
