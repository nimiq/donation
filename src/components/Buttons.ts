import { VueConstructor, CreateElement, RenderContext } from 'vue';

// See https://vuejs.org/v2/guide/render-function.html for documentation on createElement and functional components
// tslint:disable-next-line:variable-name
const IconBase = (component: VueConstructor) => ({
    functional: true,
    render(createElement: CreateElement, context: RenderContext) {
        return createElement(component, context.data);
    },
} as any); // Should be FunctionalComponentOptions (imported from 'vue'), but as such cannot be imported in accounts...

/**
 * SVG files in an /icons/ directory are automatically loaded as Vue components
 * via the vue-svg-loader.
 */
import BlueBig from '../../public/img/donationBtnImg/blue-big.svg';
import BlueSmall from '../../public/img/donationBtnImg/blue-small.svg';

import GoldBig from '../../public/img/donationBtnImg/gold-big.svg';
import GoldSmall from '../../public/img/donationBtnImg/gold-small.svg';

import GreenBig from '../../public/img/donationBtnImg/green-big.svg';
import GreenSmall from '../../public/img/donationBtnImg/green-small.svg';

import LightBlueBig from '../../public/img/donationBtnImg/light-blue-big.svg';
import LightBlueSmall from '../../public/img/donationBtnImg/light-blue-small.svg';

import OrangeBig from '../../public/img/donationBtnImg/orange-big.svg';
import OrangeSmall from '../../public/img/donationBtnImg/orange-small.svg';

import RedBig from '../../public/img/donationBtnImg/red-big.svg';
import RedSmall from '../../public/img/donationBtnImg/red-small.svg';

/**
 * Comment out any unused icons here
 */
// tslint:disable:variable-name
export const BlueBigButton = IconBase(BlueBig);
export const BlueSmallButton = IconBase(BlueSmall);

export const GoldBigButton = IconBase(GoldBig);
export const GoldSmallButton = IconBase(GoldSmall);

export const GreenBigButton = IconBase(GreenBig);
export const GreenSmallButton = IconBase(GreenSmall);

export const LightBlueBigButton = IconBase(LightBlueBig);
export const LightBlueSmallButton = IconBase(LightBlueSmall);

export const OrangeBigButton = IconBase(OrangeBig);
export const OrangeSmallButton = IconBase(OrangeSmall);

export const RedBigButton = IconBase(RedBig);
export const RedSmallButton = IconBase(RedSmall);
// tslint:enable:variable-name
