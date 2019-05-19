<template>
    <transition name="transition-fade">
        <div v-if="address" class="qr-download-card transition-opacity">
            <h1 class="nq-h1">Get a QR code</h1>
            <div class="nq-text">
                Download your QR code as SVG, PNG or JPG or copy the link.
            </div>

            <div class="qr-code">

            </div>
            <div class="nq-text link">
                safe.nimiq.com/#_request/NQ0853GX37HG8H941HY83SQM8V4TL6MPT31J_
            </div>
        </div>
    </transition>
</template>



<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';


    @Component({components: {}})
    export default class ButtonCard extends Vue {
        @Prop(String) public address!: string;
    }
</script>
<style scoped>
    .button-card {
        position: relative;
    }
    .nq-h1 {
        text-align: center;
    }
    .nq-text{
        text-align: center;
        padding: 0 17px;
        margin-bottom: 40px;
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
        font-weight: normal;color: #1F2348;
        opacity: 0.6;
        word-wrap: break-word;
    }
</style>