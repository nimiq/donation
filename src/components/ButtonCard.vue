<template>
    <div class="button-card">
        <div class="title">
            <h1 class="nq-h1">Get a button...</h1>
            <p class="nq-text">Select the button color and size and choose an output format.</p>
        </div>
        <div class="dots">
            <div v-for="color in dotsColors"
                 class="dot"
                 :class="[`nq-${color}-bg`, { selected: color === selectedColor }]"
                 @click="selectedColor = color">
            </div>
        </div>
        <div class="buttons">
            <button v-for="buttonSize in buttonSizes"
                    @click="selectedSize = buttonSize"
                    :style="{ background: `var(--nimiq-${selectedColor}-bg)` }"
                    :class="[selectedColor, {
                        selected: selectedSize === buttonSize,
                        'nq-button': buttonSize === 'big',
                        'nq-button-pill': buttonSize === 'small',
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
            <transition name="transition-fadeout">
                <div v-if="copyNotificationOpen" class="copy-notification">Copied Successfully</div>
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

type ButtonColor = 'blue' | 'gold' | 'light-blue' | 'green' | 'orange' | 'red';
type ButtonSize = 'big' | 'small';
type MarkupLanguageType = 'html' | 'bbcode' | 'md';
type MarkupLanguage = {
    type: MarkupLanguageType,
    code: string,
};

@Component
export default class ButtonCard extends Vue {
    @Prop(String) public requestLink!: string;

    private dotsColors: ButtonColor[] = ['blue', 'gold', 'light-blue', 'green', 'orange', 'red'];
    private selectedColor: ButtonColor = 'light-blue';

    private buttonSizes: ButtonSize[] = ['big', 'small'];
    private selectedSize: ButtonSize = 'big';

    private baseUrl: string = 'https://nimiq.com/donationBtnImg';

    private markupLanguages: MarkupLanguage[] = [
        {
            type: 'html',
            code: '<div><a href="REQUESTLINK"><img src="BASEURL/COLOR-SIZE.png"/></a></div>',
        }, {
            type: 'bbcode',
            code: '[url=REQUESTLINK][img]BASEURL/COLOR-SIZE.png[/img][/url]',
        }, {
            type: 'md',
            code: '[![Donate NIM](BASEURL/COLOR-SIZE.png)](REQUESTLINK)',
        },
    ];
    private selectedMarkupLanguage: MarkupLanguage = this.markupLanguages[0];

    private copyNotificationOpen: boolean = false;

    private get markupCode(): string {
        return this.selectedMarkupLanguage.code
            .replace('REQUESTLINK', this.requestLink)
            .replace('COLOR', this.selectedColor)
            .replace('SIZE', this.selectedSize)
            .replace('BASEURL', this.baseUrl);
    }

    private copyMarkupCode(): void {
        const el = document.createElement('textarea');
        el.value = this.markupCode;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        this.showCopyNotification();
    }

    private showCopyNotification(): void {
        this.copyNotificationOpen = true;
        setTimeout(() => {
            this.copyNotificationOpen = false;
        }, 1000);
    }
}
</script>

<style scoped>
    .button-card {
        --nqTimingFunction: cubic-bezier(0.25, 0, 0, 1);

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
        transition: transform .2s var(--nqTimingFunction);
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
        margin: 0;
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
        transition: .3s opacity var(--nqTimingFunction);
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
        transition: .3s opacity var(--nqTimingFunction);
    }

    .code-section-buttons .inactive:hover {
        opacity: .7;
    }

    .code-section-buttons :last-child {
        margin-left: auto;
        text-transform: capitalize;
    }

    .copy-notification {
        display: block;
        position: absolute;
        right: 2rem;
        bottom: 6.5rem;
        padding: 2rem;
        border-radius: 1rem;
        color: var(--nimiq-blue);
        /* nq-blue-bg background with low opacity over gray */
        background: #f4f4f4 radial-gradient(22rem at 100% 100%, #2601330A 0%, #1F23480A 100%);
    }

    .transition-fadeout-leave-active {
        transition: 2s opacity var(--nqTimingFunction);
    }

    .transition-fadeout-leave-to {
        opacity: 0;
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

