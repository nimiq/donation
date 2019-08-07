<template>
    <div class="qr-download-card">
        <div class="title">
            <h1 class="nq-h1">...get a QR code</h1>
            <p class="nq-text"> Download your QR code as PNG or copy the link. </p>
        </div>

        <div class="qr-code">
            <QrCode data="2323343" fill="#1F2348"></QrCode>
        </div>

        <div class="nq-text link">
            {{ requestLink }}
        </div>
    </div>
</template>



<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { QrCode } from '@nimiq/vue-components';

@Component({ components: { QrCode } })
export default class DownloadCard extends Vue {

    @Prop(String) public requestLink!: string;

}
</script>

<style scoped>
    .qr-download-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .title {
        margin: 0 3rem;
        text-align: center;
    }

    .qr-code {
        --size: 22.25rem;
        height: var(--size);
        width: var(--size);
        margin: 0 auto;
    }

    /* should'nt the qrcode component adapt his size to his parent size automatically ? */
    /* and why 240px default size ? should'nt it be 128px instead ? */
    .qr-code canvas {
        width: 100%;
        height: auto;
    }

    .link {
        margin: 2.625rem 3rem;
        word-wrap: break-word;
        opacity: .9;
        font-family: "Fira Mono", monospace;
        line-height: 1.25;
        letter-spacing: 0.1875rem;
    }

    @media screen and (max-width: 540px) {
        .title {
            margin-top: 0;
        }
    }
    @media screen and (max-width: 320px) {
        .title {
            margin: 0 3.5rem;
        }
        .link {
            margin: 2.625rem 3.5rem;
        }
    }

</style>
