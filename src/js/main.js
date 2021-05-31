import $ from '../local_modules/jquery/dist/jquery.min';
import Slider from './class/Slider.js';
import { gsap, TimelineMax, Back, Power1 } from 'gsap';

$.fn.exists = function () {
    return $(this).length;
};

const projectFunc = {
    createSlider() {
        if ($('.js-slider-partners').exists()) {
            const partnerSlider = new Slider('.js-slider-partners', 3, 0);
            partnerSlider.createSlider();
            partnerSlider.updateSlider('arrow');
            partnerSlider.updateSlider('pagination');
        }

        if ($('.product-related__items').exists()) {
            const relatedSlider = new Slider('.product-related__items', 4, 36);
            relatedSlider.createSlider();
            relatedSlider.updateSlider('arrow');
            relatedSlider.updateSlider('pagination');
        }
    },

    hiddenTabs(index) {
        if ($('.auth-popup').exists()) {
            try {
                const includeBloc = document.querySelector('.auth-popup');
                let tabsEl = includeBloc.querySelectorAll('.auth-popup__form');
                let btnTab = includeBloc.querySelectorAll('.auth-popup__link');
                tabsEl = Array.prototype.slice.call(tabsEl);
                tabsEl = tabsEl.reverse();
                btnTab = Array.prototype.slice.call(btnTab);
                // btnTab = btnTab.reverse();

                const hideForm = new TimelineMax({
                    reversed: true,
                    paused: true,
                    defaults: { duration: 0.5 }
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
                                    ease: Power1.inOut
                                }
                            )
                            .to(
                                element,
                                0.3,
                                {
                                    autoAlpha: 0,
                                    display: 'none',
                                    ease: Power1.inOut
                                },
                                '-=0.3'
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
                let tabsEl = includeBloc.querySelectorAll('.auth-popup__form');
                let btnTab = includeBloc.querySelectorAll('.auth-popup__link');
                btnTab = Array.prototype.slice.call(btnTab);
                tabsEl = Array.prototype.slice.call(tabsEl);
                tabsEl = tabsEl.reverse();
                const mainBloc = document.querySelector('.auth__box');

                const showForm = new TimelineMax({
                    reversed: true,
                    paused: true,
                    defaults: { duration: 0.5 },
                    onStart: () => {
                        setTimeout(
                            () => {
                                console.log('end');
                                tabsEl[index].style.display = 'block';
                                mainBloc.style.maxHeight = 191 + tabsEl[index].scrollHeight + `px`;
                                tabsEl[index].style.display = 'none';
                                console.log(mainBloc.style.maxHeight);
                            },
                            100
                        );
                    }
                });

                showForm
                    .to(
                        btnTab[index],
                        0.3,
                        {
                            fontSize: '45px',
                            color: '#38393F',
                            ease: Power1.inOut
                        }
                    )
                    .to(tabsEl[index],
                        0.3,
                        {
                            autoAlpha: 1,
                            display: 'block',
                            ease: Power1.inOut
                        },
                        '+=0.1'
                    );
                showForm.play();
                console.log(index);
            } catch (err) {
                console.log(err);
            }
        }
    },

    hoverTab(element, state) {
        const hoverTab = new TimelineMax({
            reversed: true,
            paused: true,
            defaults: { duration: 0.5 }
        });

        const hoverTabLeave = new TimelineMax({
            reversed: true,
            paused: true,
            defaults: { duration: 0.5 }
        });

        hoverTab
            .to(
                element,
                {
                    color: '#38393F'
                }
            );

        hoverTabLeave
            .to(
                element,
                {
                    color: '#AAAAAA'
                }
            );

        if (state) {
            hoverTab.play();
            hoverTabLeave.reverse();
        } else {
            hoverTabLeave.play();
            hoverTab.reverse();
        }
    },

    setTabs() {
        if ($('.auth-popup__link').exists()) {
            try {
                const includeBloc = document.querySelector('.auth-popup');
                let btnTab = includeBloc.querySelectorAll('.auth-popup__link');
                btnTab = Array.prototype.slice.call(btnTab);
                projectFunc.hiddenTabs(1);

                btnTab.forEach((element, i) => {
                    element.addEventListener('click', function () {
                        projectFunc.showTabs(i);
                        projectFunc.hiddenTabs(i);
                        $(element).addClass('active').siblings().removeClass('active');
                    });
                    element.addEventListener('mouseenter', function () {
                        projectFunc.hoverTab(element, true);
                    });
                    element.addEventListener('mouseleave', function () {
                        projectFunc.hoverTab(element, false);
                    });
                });
            } catch (err) {
                console.log(err);
            }
        }
    },

    serviceHover(element, state) {
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
    }
};

function init() {
    projectFunc.setTabs();
    projectFunc.createSlider();
}

window.addEventListener('load', function () {
    init();

    if($('.js-select').exists()) {
        $('.js-select').select2();
    }

    if ($('.js-input').exists()) {
        try {
            $('.js-input').each((_, element) => {
                $(element).focus(function () {
                    $(element).parent().addClass('on-focus');
                }).blur(function () {
                    if ($(element).val() === '') {
                        $(element).parent().removeClass('on-focus');
                    }
                });
                if ($(element).prop('disabled') === true) {
                    $(element).parent().addClass('disabled');
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    if ($('.service__bloc').exists()) {
        gsap.utils.toArray('.service__bloc').forEach((item) => {
            item.addEventListener('mouseenter', function () {
                projectFunc.serviceHover(item, true);
            });

            item.addEventListener('mouseleave', function () {
                projectFunc.serviceHover(item, false);
            });
        });
    }

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

    $('input[type="file"]').change(function () {
        let label = $('.file .file__label');
        if (typeof (this.files) != 'undefined') {
            if (this.files.length == 0) {
                label.text(label.data('default'));
            }
            else {
                let file = this.files[0];
                let name = file.name;
                label.text(name);
            }
        }
        else {
            let name = this.value.split("\\");
            label.text(name[name.length - 1]);
        }
        return false;
    });

    if ($('.js-open-modal').exists()) {
        $('.js-open-modal').on('click', (event) => {
            event.preventDefault();
            //showOverlay(true);
            $('.js-modal').addClass('open');
        });
    }

    if ($('.js-close-modal').exists()) {
        $('.js-close-modal').on('click', () => {
            //showOverlay(false);
            $('.js-modal').removeClass('open');
        });
    }

    if($('.js-accordion-head').exists()) {
        let $head = '.js-accordion-head';

        $(document).off('click.toggle');
        $(document).on('click.toggle', $head, function (e) {
            e.preventDefault();

            let $this = $(this);
            let $item = $this.parents('.js-accordion-item:first');

            $item.toggleClass('active');
            $item.find('.js-accordion-body:first').slideToggle();
        });
    }

    if($('.js-tab-btn').exists()) {

        $('.js-tab-btn').click (function(e) {
            e.preventDefault();
            $('.js-tab-btn').removeClass('active');
            $(this).addClass('active');
            $('.js-tab-body').removeClass('active');
            let tabID = $(this).attr('data-tab-btn');
            $('.js-tab-body[data-tab-body="' + tabID + '"]').addClass('active');
        });
    }

});
