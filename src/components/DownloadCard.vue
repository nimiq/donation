<template>
    <div class="qr-download-card">
        <div class="title">
            <h1 class="nq-h1">...get a QR code</h1>
            <p class="nq-text"> Download your QR code as PNG or copy the link. </p>
        </div>

        <div class="qr-code">
            <QrCode :data="requestLink" :fill="QR_CODE_GRADIENT" ref="qrcode"></QrCode>
            <a class="nq-button light-blue qr-code-download" download="qrcode-donation.png" :href="QRCodeDownloadLink" target="_blank">
                <DownloadIcon></DownloadIcon>
            </a>
        </div>

        <div class="nq-text link" @click="copyRequestLink" :class="{ copied: copied }">
            <div>
                {{ requestLink.replace(/http(s?):\/\//g, '') }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { QrCode, DownloadIcon } from '@nimiq/vue-components';
import { Clipboard } from '@nimiq/utils';

@Component({ components: { QrCode, DownloadIcon } })
export default class DownloadCard extends Vue {
    private static readonly QR_CODE_GRADIENT = { // --nimiq-blue-bg
        type: 'radial-gradient',
        position: [1, 1, 0, 1, 1, Math.sqrt(2)],
        colorStops: [
            [0, '#260133'],
            [1, '#1F2348'],
        ],
    };

    @Prop(String) public requestLink!: string;

    public $refs!: {
        qrcode: QrCode,
    };
    private QRCodeDownloadLink: string = '';
    private copied: boolean = false;

    private get QR_CODE_GRADIENT() {
        return DownloadCard.QR_CODE_GRADIENT;
    }

    private copyRequestLink(): void {
        Clipboard.copy(this.requestLink);
        if (this.copied) return;
        this.copied = true;
        setTimeout(() => {
            this.copied = false;
        }, 1500);
    }

    @Watch('requestLink',  { immediate: true })
    private async _updateQRCodeDownloadLink() {
        await Vue.nextTick();
        this.QRCodeDownloadLink = await this.$refs.qrcode.toDataUrl('image/png');
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
        display: block;
        height: var(--size);
        width: var(--size);
        position: absolute;
        right: calc(var(--size) / -3);
        bottom: calc(var(--size) / -3);
        padding: 1.875rem;
        border-radius: 50%;
        min-width: 0;
        margin: 0;
        color: white;
        cursor: pointer;
    }

    .link {
        opacity: .9;
        margin: 2rem;
        margin-top: 4rem;
        padding: 1rem;
        word-wrap: break-word;
        font-family: "Fira Mono", monospace;
        line-height: 1.25;
        letter-spacing: 0.1875rem;
        cursor: copy;
        user-select: none;
        position: relative;
    }

    .link::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        background-color: var(--nimiq-blue);
        opacity: .06;
        border-radius: .5rem;
    }

    .link::after {
        content: 'COPIED';
        font-family: 'Muli';
        font-size: 1.5rem;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.75px;
        position: absolute;
        bottom: 1.25rem;
        right: 1.25rem;
        color: var(--nimiq-green);
        background-color: #E1E0E3;
        opacity: 0;
        box-shadow: 0px 0px 6px 2px #E1E0E3;
        transition-property: opacity;
        transition-duration: .25s;
        transition-timing-function: var(--nimiq-ease);
    }

    .link.copied::after {
        opacity: 1;
    }

    @media (max-width: 540px) {
        .title {
            margin-top: 0;
        }
    }

    @media (max-width: 320px) {
        .title {
            margin: 0 3.5rem;
        }
    }

</style>
