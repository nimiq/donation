<template>
    <transition name="transition-fade">
        <div v-if="address" class="button-card transition-opacity">
            <h1 class="nq-h1">Get a button...</h1>
            <div class="nq-text">
                Select the button colour and size and choose an output format.
            </div>

            <div class="colors">
                <div class="color nq-blue-bg"></div>
                <div class="color nq-gold-bg"></div>
                <div class="color nq-light-blue-bg"></div>
                <div class="color nq-green-bg"></div>
                <div class="color nq-orange-bg"></div>
                <div class="color nq-red-bg"></div>
            </div>
            <div class="buttons">
                <div class="nq-button">
                    Donate NIM
                </div>
                <div class="nq-button-s">
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
    }
    .color:not(:last-child){
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