<template>
    <transition name="transition-fade">
        <div v-if="address" class="button-card transition-opacity">
            <h1 class="nq-h1">Get a button...</h1>
            <div class="nq-text">
                <p>Select the button color and size and choose an output format.</p>
            </div>

            <div class="colors">
                <div class="color-container" v-for="color in colors" :class="{'active': buttonColor == color}" >
                    <div :class="`color nq-${color}-bg`"  @click="changeColor(color)"></div>
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
                    &lt;div&gt;&lt;a href="{{safeLink}}"&gt;&lt;img src="button-{{buttonColor}}.png"/&gt;&lt;/a&gt;&lt;/div&gt;
                </div>
                <div class="code" v-if="preview == 'bbcode'">
                    [link={{safeLink}}][img]button-{{buttonColor}}.png[/img][/link]
                </div>
                <div class="code" v-if="preview == 'markdown'">
                    [![Donate](button-{{buttonColor}}.png)]({{safeLink}})
                </div>
                <div class="buttons">
                    <div class="nq-button-s" :class="{'active': preview === 'html'}" @click="preview = 'html'">HTML</div>
                    <div class="nq-button-s" :class="{'active': preview === 'bbcode'}" @click="preview = 'bbcode'">BBCode</div>
                    <div class="nq-button-s" :class="{'active': preview === 'markdown'}" @click="preview = 'markdown'">Markdown</div>
                    <div class="nq-button-s light-blue">Copy</div>
                </div>
            </div>
        </div>
    </transition>
</template>



<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

export type ButtonColors = 'blue' | 'gold' | 'light-blue' | 'green' | 'orange' | 'red';
export type Previews = 'html' | 'bbcode' | 'markdown';

@Component
export default class ButtonCard extends Vue {

    @Prop(String) public address: string;

    private buttonColor: ButtonColors = 'blue';
    private displayAddress: string = this.address.split(' ').join('');

    private safeLink: string = `safe.nimiq.com/#_request/ ${this.displayAddress}`;

    private colors: any[] = ['blue', 'gold', 'light-blue', 'green', 'orange', 'red'];

    private preview: Previews = 'html';
    public changeColor(color: string) {
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
        max-width: 293px;
        margin: 0 auto;
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
        transition: transform 450ms cubic-bezier(.25,0,0,1),box-shadow 450ms cubic-bezier(.25,0,0,1);
    }

    .colors .color:hover {
        box-shadow: 0 1rem 2.5rem rgba(0,0,0,.2);
        transform: translate3D(0,-2px,0);
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
        background: var(--nimiq-blue-bg);
        border-radius: 4px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 150px;
        padding: 24px 0 16px 24px;
        overflow: hidden;
    }

    .code-container .buttons .nq-button-s{
        color: rgba(255, 255, 255, 0.5);
    }

    .code-container .buttons .nq-button-s.active{
        background-color: rgba(255,255,255, 0.2);
        color: white;
    }

    .code-container .code {
        color: white;
        opacity: 0.6;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 1.5px;
        margin-bottom: 24px;
    }
</style>
