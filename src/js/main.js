import $ from '../local_modules/jquery/dist/jquery.min';
import Slider from './class/Slider.js';
import { gsap, TimelineMax, Back, Sine } from 'gsap';

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
    },
    hiddenTabs(index) {
        if ($('.auth-popup').exists()) {
            try {
                const includeBloc = document.querySelector('.auth-popup');
                const tabsEl = includeBloc.querySelectorAll('.auth-popup__form');
                let btnTab = includeBloc.querySelectorAll('.auth-popup__link');
                btnTab = Array.prototype.slice.call(btnTab);
                btnTab = btnTab.reverse();

                const hideForm = new TimelineMax({
                    reversed: true,
                    paused: true,
                    defaults: { duration: 0.3 }
                });

                tabsEl.forEach((element, i) => {
                    if (i !== index) {
                        hideForm
                            .to(
                                btnTab[i],
                                0.3,
                                {
                                    fontSize: '35px',
                                    color: '#AAAAAA',
                                    ease: Sine.Out
                                }
                            )
                            .to(
                                element,
                                {
                                    autoAlpha: 0,
                                    display: 'none',
                                    ease: Sine.Out
                                }
                            );
                        hideForm.play();

                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    },
    showTabs(index) {
        if ($('.auth-popup').exists()) {
            try {
                const includeBloc = document.querySelector('.auth-popup');
                const tabsEl = includeBloc.querySelectorAll('.auth-popup__form');
                let btnTab = includeBloc.querySelectorAll('.auth-popup__link');
                btnTab = Array.prototype.slice.call(btnTab);
                btnTab = btnTab.reverse();


                const showForm = new TimelineMax({
                    reversed: true,
                    paused: true,
                    defaults: { duration: 0.3 }
                });

                showForm
                    .to(
                        btnTab[index],
                        0.3,
                        {
                            fontSize: '45px',
                            color: '#38393F',
                            ease: Sine.Out

                        }
                    )
                    .to(tabsEl[index],
                        {
                            autoAlpha: 1,
                            display: 'block',
                            ease: Sine.Out
                        },
                        '+=0.3'
                    );


                showForm.play();
                console.log(index);
            } catch (err) {
                console.log(err);
            }
        }
    }
};

$(document).ready(() => {
    projectFunc.createSlider();


    const setTabs = () => {
        if ($('.auth-popup__link').exists()) {
            try {
                const includeBloc = document.querySelector('.auth-popup');
                let btnTab = includeBloc.querySelectorAll('.auth-popup__link');
                const heightCover = includeBloc.querySelector('.auth-popup__cover');

                btnTab = Array.prototype.slice.call(btnTab);
                btnTab = btnTab.reverse();
                let tabsEl = includeBloc.querySelectorAll('.auth-popup__form');
                tabsEl = Array.prototype.slice.call(tabsEl);
                tabsEl = tabsEl.reverse();


                projectFunc.showTabs(0);
                projectFunc.hiddenTabs(0);


                btnTab.forEach((element, index) => {
                    element.addEventListener('click', function () {
                        console.log(tabsEl[index]);
                        heightCover.style.minHeight = tabsEl[index].clientHeight + 'px';

                        console.log(heightCover);

                        projectFunc.showTabs(index);
                        projectFunc.hiddenTabs(index);

                    });
                });
            } catch (err) {
                console.log(err);
            }
        }
    };

    setTabs();

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

    if ($('.header__inner').exists) {
        try {
            const $window = $(window);
            const $target = $('.header__inner');
            const $h = $target.offset().top;
            $window.on('scroll', function () {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > $h) {
                    $target.addClass('mf-scroll');
                    // return;
                } else {
                    $target.removeClass('mf-scroll');
                }
                // return;
            });
        } catch (err) {
            console.log(err);
        }
    }

});
