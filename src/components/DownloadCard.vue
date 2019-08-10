<template>
    <div class="qr-download-card">
        <div class="title">
            <h1 class="nq-h1">...get a QR code</h1>
            <p class="nq-text"> Download your QR code as PNG or copy the link. </p>
        </div>

        <div class="qr-code">
            <QrCode :data="requestLink" :fill="QR_CODE_GRADIENT" ref="qrcode"></QrCode>
            <a class="qr-code-download" download="qrcode-donation.png" :href="QRCodeDownloadLink">
                <DownloadIcon></DownloadIcon>
            </a>
        </div>

        <div class="nq-text link" @click="copyRequestLink">
            {{ requestLink }}
        </div>

        <CopyNotification theme="dark" ref="copyNotification"></CopyNotification>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { QrCode, DownloadIcon } from '@nimiq/vue-components';
import { Clipboard } from '@nimiq/utils';

import CopyNotification from './CopyNotification.vue';

@Component({ components: { QrCode, DownloadIcon, CopyNotification } })
export default class DownloadCard extends Vue {
    @Prop(String) public requestLink!: string;

    private readonly QR_CODE_GRADIENT = { // --nimiq-blue-bg
        type: 'radial-gradient',
        position: [1, 1, 0, 1, 1, Math.sqrt(2)],
        colorStops: [
            [0, '#260133'],
            [1, '#1F2348'],
        ],
    };
    private QRCodeDownloadLink: string = '';

    private copyRequestLink(): void {
        Clipboard.copy(this.requestLink);
        (this.$refs.copyNotification as CopyNotification).show();
    }

    @Watch('requestLink',  { immediate: true })
    private async _updateQRCodeDownloadLink() {
        await Vue.nextTick();
        this.QRCodeDownloadLink = await (this.$refs.qrcode as QrCode).toDataUrl('image/png');
    }
}
</script>

<style scoped>
    .qr-download-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
    }

    * {
        -webkit-tap-highlight-color: transparent;
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
        position: relative;
    }

    .qr-code canvas {
        width: 100%;
        height: auto;
    }

    .qr-code-download {
        --size: 6rem;
        height: var(--size);
        width: var(--size);
        position: absolute;
        right: calc(var(--size) / -3);
        bottom: calc(var(--size) / -3);
        padding: 1.875rem;
        border-radius: 50%;
        background-image: var(--nimiq-light-blue-bg);
        box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.15);
        color: white;
        cursor: pointer;
    }

    .qr-code-download:hover {
        background: var(--nimiq-light-blue-darkened);
        background-image: var(--nimiq-light-blue-bg-darkened);
    }

    .link {
        opacity: .9;
        margin: 2.625rem 3rem;
        word-wrap: break-word;
        font-family: "Fira Mono", monospace;
        line-height: 1.25;
        letter-spacing: 0.1875rem;
        cursor: copy;
        user-select: none;
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
