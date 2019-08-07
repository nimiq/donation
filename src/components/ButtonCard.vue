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
            <button v-for="buttonSize in Object.values(constructor.ButtonSize)"
                    @click="selectedSize = buttonSize"
                    :style="{ background: `var(--nimiq-${selectedColor}-bg)` }"
                    :class="[selectedColor, {
                        selected: selectedSize === buttonSize,
                        'nq-button': buttonSize === constructor.ButtonSize.BIG,
                        'nq-button-pill': buttonSize === constructor.ButtonSize.SMALL,
                    }]">
                donate&nbsp;NIM
            </button>
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

import CopyNotification from './CopyNotification.vue';

const BUTTON_IMAGE_BASE_URL = 'https://nimiq.com/donationBtnImg';

@Component({ components: { CopyNotification } })
class ButtonCard extends Vue {
    @Prop(String) public requestLink!: string;

    private selectedColor: ButtonCard.ButtonColor = ButtonCard.ButtonColor.LIGHT_BLUE;
    private selectedSize: ButtonCard.ButtonSize = ButtonCard.ButtonSize.BIG;

    private markupLanguages: ButtonCard.MarkupLanguage[] = [
        {
            type: ButtonCard.MarkupLanguageType.HTML,
            code: '<div><a href="REQUESTLINK"><img src="BASEURL/COLOR-SIZE.png"/></a></div>',
        }, {
            type: ButtonCard.MarkupLanguageType.BBCODE,
            code: '[url=REQUESTLINK][img]BASEURL/COLOR-SIZE.png[/img][/url]',
        }, {
            type: ButtonCard.MarkupLanguageType.MD,
            code: '[![Donate NIM](BASEURL/COLOR-SIZE.png)](REQUESTLINK)',
        },
    ];
    private selectedMarkupLanguage: ButtonCard.MarkupLanguage = this.markupLanguages[0];

    private get markupCode(): string {
        return this.selectedMarkupLanguage.code
            .replace('REQUESTLINK', this.requestLink)
            .replace('COLOR', this.selectedColor)
            .replace('SIZE', this.selectedSize)
            .replace('BASEURL', BUTTON_IMAGE_BASE_URL);
    }

    private copyMarkupCode(): void {
        Clipboard.copy(this.markupCode);
        (this.$refs.copyNotification as CopyNotification).showCopyNotification();
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

    .buttons button {
        flex-shrink: 0;
    }

    .buttons .nq-button {
        margin: 0 1rem;
        position: relative;
        box-shadow: none;
    }

    .buttons .nq-button:active,
    .buttons .nq-button:focus,
    .buttons .nq-button:hover {
        transform: none;
        box-shadow: none;
    }

    .buttons .nq-button:active::before,
    .buttons .nq-button:focus::before,
    .buttons .nq-button:hover::before {
        opacity: 0;
    }

    .dot,
    .buttons button {
        position: relative;
    }

    .dot::after,
    .buttons button::after {
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
    .buttons button.selected::after {
        opacity: .2;
    }

    .nq-button-pill {
        text-transform: capitalize;
        padding: 0 2rem;
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
        --code-width: 150%;
        --code-gradient-begin: 60%;
        --code-gradient-end: 67.5%;

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

    @media screen and (max-width: 375px) {
        .dot {
            margin: calc(var(--dots-size) / 2);
        }

        .buttons {
            flex-direction: column;
            margin: 2rem 0;
        }

        .buttons button {
            margin: 1.5rem 0;
        }

        .buttons button:last-child {
            margin-bottom: 0;
        }

        .code-section code {
            --code-width: 200%;
            --code-gradient-begin: 43%;
            --code-gradient-end: 50%;
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
            --code-gradient-begin: 36%;
            --code-gradient-end: 41%;
        }
    }
</style>

