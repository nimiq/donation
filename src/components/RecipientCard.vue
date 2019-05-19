<template>
    <SmallPage class="recipient-card">
        <Identicon :address="address"></Identicon>
        <AddressDisplay :address="address"></AddressDisplay>
        <div class="seperator"></div>
        <input class="nq-input vanishing" type="text" placeholder="Add a Message"/>
        <div class="nq-text-s">(optional)</div>
    </SmallPage>
</template>


<script lang="ts">
    import '@nimiq/style/nimiq-style.min.css';
    import {SmallPage, Identicon, AddressDisplay} from '@nimiq/vue-components';
    import {Component, Vue, Prop} from 'vue-property-decorator';
    @Component({components: {SmallPage, Identicon, AddressDisplay}})
    export default class RecipientCard extends Vue {
        @Prop(String) public address!: string;
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

    .recipient-card .seperator {
        height: 1px;
        width: 100%;
        opacity: 0.1;
        border: 1px solid #1F2348;
        margin-bottom: 30px;
    }

    .nq-input.vanishing {
        text-align: center;
    }

    .recipient-card .nq-text-s {
        color: #1F2348;
        /* Dark Blue */
        opacity: 0.3;
    }
</style>