import $ from '../local_modules/jquery/dist/jquery.min';
import Slider from './class/Slider.js';
import { gsap, TimelineMax, Back } from 'gsap';

$.fn.exists = function () {
    return $(this).length;
};

const projectFunc = {
    createSlider() {
        if ($('.js-slider-partners').exists()) {
            const partnerSlider = new Slider('.js-slider-partners', 3, 0);
            partnerSlider.createSlider();
            partnerSlider.updateSlider('pagination');
            partnerSlider.updateSlider('arrow');
        }
    }
};

$(document).ready(() => {
    projectFunc.createSlider();

    $('.js-input').each((_, element) => {
        $(element).focus(function () {
            $(element).parent().addClass('on-focus');
        }).blur(function () {
            if ($(element).val() === '') {
                $(element).parent().removeClass('on-focus');
            }
        });
    });

    const serviceHover = (element, state) => {
        const article = $(element).find('.service__article');
        const link = $(element).find('.link');
        const ic = $(element).find('.link__ic');
        const serviceBg = new TimelineMax({
            reversed: true,
            paused: true,
            defaults: { duration: 0.5 }
        });

        const serviceBgLeave = new TimelineMax({
            reversed: true,
            paused: true,
            defaults: { duration: 0.5 }
        });

        serviceBg
            .to(
                element,
                {
                    backgroundColor: '#2C43A1',
                    color: 'white',
                    ease: Back.easeOut.config(1.7)
                }
            )
            .to(
                [link, article],
                {
                    color: 'white'
                },
                '-=0.5'
            )
            .set(
                ic,
                { className: '+=link__ic color' },
                '-=0.5'
            );


        serviceBgLeave
            .to(
                element,
                {
                    backgroundColor: 'white',
                    color: '#38393f',
                    ease: Back.easeOut.config(1.7)
                }
            )
            .to(
                [link, article],
                {
                    color: '#2c43a1'
                },
                '-=0.5',
            )
            .set(
                ic,
                { className: '+=link__ic' },
                '-=0.5'
            );


        if (state) {
            serviceBg.play();
            serviceBgLeave.reverse();
        } else {
            serviceBgLeave.play();
            serviceBg.reverse();
        }
    };

    gsap.utils.toArray('.service__bloc').forEach((item) => {
        item.addEventListener('mouseenter', function () {
            serviceHover(item, true);
        });

        item.addEventListener('mouseleave', function () {
            serviceHover(item, false);
        });
    });

});
