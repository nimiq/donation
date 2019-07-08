<template>
    <div class="qr-download-card">
        <h1 class="nq-h1">...get a QR code</h1>
        <div class="nq-text">
            Download your QR code as PNG or copy the link.
        </div>

        <div class="qr-code">
            <QrCode data="2323343"></QrCode>
        </div>
        <div class="nq-text link">
            safe.nimiq.com/#_request/{{ displayAddress }}
        </div>
    </div>
</template>



<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { QrCode } from '@nimiq/vue-components';

@Component({components: {QrCode}})
export default class DownloadCard extends Vue {

    @Prop(String) public address!: string;

    private displayAddress: string = this.address.split(' ').join('');

}
</script>

<style scoped>
    .nq-h1 {
        text-align: center;
    }

    .nq-text{
        text-align: center;
        max-width: 261px;
        margin: 0 auto 40px;
    }

    .qr-code {
        height: 178px;
        width: 178px;
        background-color: red;
        margin: 0 auto 40px;
    }

    .nq-text.link {
        font-family: Fira Mono;
        font-style: normal;
        font-weight: normal;
        color: var(--nimiq-blue);
        opacity: 0.6;
        word-wrap: break-word;
    }
</style>
