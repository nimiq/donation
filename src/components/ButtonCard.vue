<template>
    <transition name="transition-fade">
        <div v-if="address" class="button-card transition-opacity">
            <h1 class="nq-h1">Get a button...</h1>
            <div class="nq-text">
                Select the button colour and size and choose an output format.
            </div>

            <div class="colors">
                <div class="color-container" :class="{'active': buttonColor == ''}" >
                    <div class="color nq-blue-bg"  @click="changeColor('')"></div>
                </div>
                <div class="color-container" :class="{'active': buttonColor == 'gold'}" >
                    <div class="color nq-gold-bg" :class="{'active': buttonColor == 'gold'}" @click="changeColor('gold'); "></div>
                </div>
                <div class="color-container" :class="{'active': buttonColor == 'light-blue'}" >
                    <div class="color nq-light-blue-bg" :class="{'active': buttonColor == 'light-blue'}" @click="changeColor('light-blue');"></div>
                </div>
                <div class="color-container" :class="{'active': buttonColor == 'green'}" >
                    <div class="color nq-green-bg" :class="{'active': buttonColor == 'green'}" @click="changeColor('green')"></div>
                </div>
                <div class="color-container" :class="{'active': buttonColor == 'orange'}" >
                    <div class="color nq-orange-bg" :class="{'active': buttonColor == 'orange'}" @click="changeColor('orange')"></div>
                </div>
                <div class="color-container" :class="{'active': buttonColor == 'red'}" >
                    <div class="color nq-red-bg" :class="{'active': buttonColor == 'red'}" @click="changeColor('red')"></div>
                </div>
            </div>
            <div class="nq-buttons">
                <div :class="`nq-button ${buttonColor}`">
                    Donate NIM
                </div>
                <div :class="`nq-button-s ${buttonColor}`">
                    Donate NIM
                </div>
            </div>
            <div class="code-container">
                <div class="code" v-if="preview == 'html'">
                    &lt;div&gt;&lt;a href="{{safeLink}}"&gt;&lt;img src="lightImg.png"/&gt;&lt;/a&gt;&lt;/div&gt;
                </div>
                <div class="code" v-if="preview == 'bbcode'">
                    [link={{safeLink}}][img]lightImg.png[/img][/link]
                </div>
                <div class="code" v-if="preview == 'markdown'">
                    [![Donate](lightImg.png)]({{safeLink}})
                </div>
                <div class="buttons">
                    <div class="nq-button-s" :class="{'active': preview === 'html'}" @click="preview = 'html'">HTML</div>
                    <div class="nq-button-s" :class="{'active': preview === 'bbcode'}" @click="preview = 'bbcode'">BBCode</div>
                    <div class="nq-button-s" :class="{'active': preview === 'markdown'}" @click="preview = 'markdown'">Markdown</div>
                </div>
            </div>
        </div>
    </transition>
</template>



<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import {QrCode} from '@nimiq/vue-components'
    @Component
    export default class ButtonCard extends Vue {
        @Prop(String) public address: string;
        private buttonColor:string = '';
        private displayAddress:string = this.address.split(' ').join('');
        private safeLink:string = `safe.nimiq.com/#_request/ ${this.displayAddress}`;
        private preview:string = 'html';
        public changeColor(color:string){
            this.buttonColor = color;
        }
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
        padding: 0 60px;
    }
    .colors {
        display: flex;
        justify-content: center;
        margin-bottom: 29px;
    }
    .colors .color {
        height: 16px;
        width: 16px;
        border-radius: 8px;
        cursor: pointer;
        padding: 5px;
    }
    .colors .color-container{
        border-radius: 12px;
        padding: 4px;
    }
    .colors .color-container.active {
        border: 2px solid rgba(31, 35, 72, 0.2);
        padding: 2px;
    }
    .color-container:not(:last-child){
        margin-right: 16px;
    }
    .nq-buttons {
        padding: 0 32px;
    }
    .nq-button {
        line-height: 7.5rem;
        max-width: 220px;
        display: inline-block;
        margin-right: 18px;
    }
    .nq-button-s {
        line-height: 3.375rem;
    }
    .code-container {
        background: radial-gradient(401.00px at 100% 100%, #260133 0%, #1F2348 100%);
        border-radius: 4px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 150px;
        padding: 24px 0 16px 24px;
        overflow: hidden;
    }

    .code-container .buttons .nq-button-s.active{
        background-color: rgba(255,255,255, 0.2);
        color: #FFFFFF;
    }
    .code-container .buttons .nq-button-s{
        color: rgba(255, 255, 255, 0.5);
    }

    .code-container .code {
        color: #FFFFFF;
        opacity: 0.6;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 1.5px;
        position: relative;
        margin-bottom: 24px;
    }
</style>