<template>
    <div class="button-card">
        <div class="title">
            <h1 class="nq-h1">Get a button...</h1>
            <p class="nq-text">Select the button color and size and choose an output format.</p>
        </div>
        <div class="dots">
            <div v-for="color in Object.values(constructor.ButtonColor)"
                 class="dot"
                 :class="[`nq-${color}-bg`, { selected: color === selectedColor }]"
                 @click="selectedColor = color">
            </div>
        </div>
        <div class="buttons">
            <div
                v-for="buttonSize in Object.values(constructor.ButtonSize)"
                @click="selectedSize = buttonSize"
                :class="[buttonSize, { selected: selectedSize === buttonSize }]"
            >
                <component :is="buttonComponentName(buttonSize)" />
            </div>
        </div>
        <div class="nq-blue-bg code-section">
            <code>{{markupCode}}</code>
            <div class="code-section-buttons">
                <button v-for="markupLanguage in markupLanguages"
                        @click="selectedMarkupLanguage = markupLanguage"
                        :class="{ inactive: markupLanguage !== selectedMarkupLanguage }"
                        class="nq-button-s inverse">
                    {{markupLanguage.type}}
                </button>
                <button @click="copyMarkupCode" class="nq-button-pill light-blue">copy</button>
            </div>
            <CopyNotification ref="copyNotification"></CopyNotification>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Clipboard } from '@nimiq/utils';
import * as Buttons from './Buttons';

import CopyNotification from './CopyNotification.vue';

@Component({ components: { CopyNotification, ...Buttons } })
class ButtonCard extends Vue {
    @Prop(String) public requestLink!: string;

    private selectedColor: ButtonCard.ButtonColor = ButtonCard.ButtonColor.LIGHT_BLUE;
    private selectedSize: ButtonCard.ButtonSize = ButtonCard.ButtonSize.BIG;

    private markupLanguages: ButtonCard.MarkupLanguage[] = [
        {
            type: ButtonCard.MarkupLanguageType.HTML,
            code: '<div><a href="REQUESTLINK" target="_blank"><img src="BASEURL/COLOR-SIZE.svg"/></a></div>',
        }, {
            type: ButtonCard.MarkupLanguageType.BBCODE,
            code: '[url=REQUESTLINK][img]BASEURL/COLOR-SIZE.svg[/img][/url]',
        }, {
            type: ButtonCard.MarkupLanguageType.MD,
            code: '[![Donate NIM](BASEURL/COLOR-SIZE.svg)](REQUESTLINK)',
        },
    ];
    private selectedMarkupLanguage: ButtonCard.MarkupLanguage = this.markupLanguages[0];

    private get markupCode(): string {
        return this.selectedMarkupLanguage.code
            .replace('REQUESTLINK', this.requestLink)
            .replace('COLOR', this.selectedColor)
            .replace('SIZE', this.selectedSize)
            .replace('BASEURL', ButtonCard.BUTTON_IMAGE_BASE_URL);
    }

    private buttonComponentName(buttonSize: string) {
        const color = this.selectedColor.split('-').reduce((acc, cur) =>
            acc + cur.charAt(0).toUpperCase() + cur.slice(1)
        , '');

        return (
            color +
            buttonSize.charAt(0).toUpperCase() +
            buttonSize.slice(1) +
            'Button'
        );
    }

    private copyMarkupCode(): void {
        Clipboard.copy(this.markupCode);
        (this.$refs.copyNotification as CopyNotification).show();
    }
}

namespace ButtonCard { // tslint:disable-line:no-namespace
    export enum ButtonColor {
        BLUE = 'blue',
        GOLD = 'gold',
        LIGHT_BLUE = 'light-blue',
        GREEN = 'green',
        ORANGE = 'orange',
        RED = 'red',
    }

    export enum ButtonSize {
        BIG = 'big',
        SMALL = 'small',
    }

    export enum MarkupLanguageType {
        HTML = 'html',
        BBCODE = 'bbcode',
        MD = 'md',
    }

    export type MarkupLanguage = {
        type: MarkupLanguageType,
        code: string,
    };

    export const BUTTON_IMAGE_BASE_URL = window.location.origin +
        window.location.pathname + '/img/donationBtnImg';
}

export default ButtonCard;
</script>

<style scoped>
    .button-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    * {
        -webkit-tap-highlight-color: transparent;
    }

    .title,
    .dots {
        margin: 0 7.5rem;
        text-align: center;
    }

    .dots {
        display: flex;
        justify-content: center;
    }

    .dot {
        --dots-size: 2rem;
        flex-shrink: 0;
        height: var(--dots-size);
        width:  var(--dots-size);
        margin: calc(var(--dots-size) / 2);
        margin-top: var(--dots-size);
        border-radius: 50%;
        cursor: pointer;
        transition: transform .2s var(--nimiq-timing-function);
    }

    .dot:hover {
        transform: scale(1.1);
    }

    .buttons {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 3.625rem 4rem 3.5rem;
    }

    .buttons div {
        flex-shrink: 0;
        margin: 0 1rem;
        box-shadow: none;
        width: auto;
        cursor: pointer;
        margin: 1rem;
    }

    .buttons div svg {
        display: block;
    }

    .buttons div.small svg {
        height: 3.25rem;
    }

    .buttons div.big svg {
        height: 8rem;
    }

    .dot,
    .buttons div {
        position: relative;
    }

    .dot::after,
    .buttons div::after {
        --offset: -.625rem;
        content: "";
        position: absolute;
        left: var(--offset);
        top: var(--offset);
        right: var(--offset);
        bottom: var(--offset);
        border: .25rem solid var(--nimiq-blue);
        border-radius: calc(var(--offset) * -10);
        opacity: 0;
        transition: .3s opacity var(--nimiq-timing-function);
    }

    .selected::after,
    .buttons div.selected::after {
        opacity: .2;
    }

    .code-section {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 18.75rem;
        margin: .75rem;
        margin-top: auto;
        padding: 2rem;
        position: relative;
        border-radius: .5rem;
        overflow: hidden;
    }

    .code-section code {
        --code-width: 200%;
        --code-gradient-begin: 45%;
        --code-gradient-end: 50%;

        width: var(--code-width);
        font-family: "Fira Mono", monospace;
        line-height: 1.25;
        letter-spacing: 0.1875rem;
        opacity: .6;
        word-break: break-all;
        mask-image: linear-gradient(90deg, #ffff 0%, #ffff var(--code-gradient-begin), #fff0 var(--code-gradient-end), #fff0);
        -webkit-mask-image: linear-gradient(90deg, #ffff 0%, #ffff var(--code-gradient-begin), #fff0 var(--code-gradient-end), #fff0);
    }

    .code-section-buttons {
        display: flex;
        justify-content: flex-start;
    }

    .code-section-buttons button {
        text-transform: uppercase;
    }

    .code-section-buttons button:focus::after {
        display: none;
    }

    .code-section-buttons .inactive {
        background: none;
        opacity: .5;
        transition: .3s opacity var(--nimiq-timing-function);
    }

    .code-section-buttons .inactive:hover {
        opacity: .7;
    }

    .code-section-buttons :last-child {
        margin-left: auto;
        text-transform: capitalize;
    }

    @media screen and (max-width: 540px) {
        .title {
            margin-top: 0;
        }
    }

    @media screen and (max-width: 425px) {
        .title {
            margin: 0 5rem;
        }

        .buttons {
            flex-direction: column;
            margin-bottom: 0;
            margin-top: 1rem;
        }
    }

    @media screen and (max-width: 375px) {
        .title {
            margin: 0 3rem;
        }

        .dot {
            margin: calc(var(--dots-size) / 2);
        }

        .code-section code {
            font-size: 2rem;
        }
    }

    @media screen and (max-width: 320px) {
        .title {
            margin: 0 3.5rem;
        }

        .code-section {
            padding: 1rem;
        }

        .code-section code {
            --code-width: 250%;
            --code-gradient-begin: 30%;
            --code-gradient-end: 40%;
        }
    }
</style>

