import $ from '../local_modules/jquery/dist/jquery.min';
import Slider from './class/Slider.js';

$.fn.exists = function () {
    return $(this).length;
};

$(document).ready(() => {
    if ($('.js-slider-partners').exists()) {
        const partnerSlider = new Slider('.js-slider-partners', 3, 0);
        partnerSlider.createSlider();
        partnerSlider.updateSlider('pagination');
        console.log(partnerSlider);
    }

});
