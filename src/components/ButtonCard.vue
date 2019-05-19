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
            <div class="buttons">
                <div :class="`nq-button ${buttonColor}`">
                    Donate NIM
                </div>
                <div :class="`nq-button-s ${buttonColor}`">
                    Donate NIM
                </div>
            </div>
            <div class="code-container">

            </div>
        </div>
    </transition>
</template>



<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import {QrCode} from '@nimiq/vue-components'
    @Component
    export default class ButtonCard extends Vue {
        @Prop(String) public address!: string;
        private buttonColor:string = '';

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
    .buttons {
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
    }
</style>