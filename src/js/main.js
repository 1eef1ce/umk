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
            relatedSlider.updateSlider('pagination', 'custom');
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
    },
    showOverlay(status, popup) {
        if ($('.js-overlay').exists()) {
            const overlayEl = $(popup).parent('.js-overlay');
            const showOvTl = new TimelineMax({
                reversed: true,
                paused: true,
                defaults: {
                    duration: 0.6
                },
                onStart: projectFunc.lockedDOM,
                onStartParams: [status, false],
                onComplete: projectFunc.stateObject,
                onCompleteParams: ['start', popup]
            });

            const hideOvTl = new TimelineMax({
                reversed: true,
                paused: true,
                defaults: {
                    duration: 0.3
                },
                onStart: projectFunc.stateObject,
                onStartParams: ['end', popup],
                onComplete: projectFunc.lockedDOM,
                onCompleteParams: [status, true]
            });

            showOvTl
                .to(overlayEl, { autoAlpha: 1, ease: 'power2.out' });

            hideOvTl
                .to(overlayEl, { autoAlpha: 0, ease: 'power2.out' }, '+=0.6');

            if (status) {
                showOvTl.reverse();
                showOvTl.play();
            } else {
                hideOvTl.reverse();
                hideOvTl.play();
            }
        }
    },
    formShow(element, status) {
        if ($(element).exists()) {

            const showMainMenu = new TimelineMax({
                reversed: true,
                paused: true,
                defaults: {
                    duration: 10
                }
            });

            const hideMainMenu = new TimelineMax({
                paused: true,
            });

            const formShowTl = new TimelineMax({
                reversed: true,
                paused: true,
                defaults: {
                    duration: 1.4
                }
            });

            const formHideTl = new TimelineMax({
                reversed: true,
                paused: true,
                defaults: {
                    duration: 1.1
                },
                onComplete: () => {
                    hideMainMenu.play();
                }
            });

            formHideTl.to(element, { yPercent: -100, ease: 'power4.inOut' });
            formShowTl.set(element, { autoAlpha: 1 }).to(element, { yPercent: 0, ease: 'power4.inOut' }).add(showMainMenu.play(), '-=0.5');

            showMainMenu
                .set(['.menu-popup__title', '.search-input'], { autoAlpha: 0, yPercent: -35 })
                .set('.catalog-list--search .catalog-list__bloc', { autoAlpha: 0, xPercent: -35 })
                .to('.menu-popup__title', 1, { autoAlpha: 1, yPercent: 0, ease: 'power4.inOut' })
                .to('.search-input', 1, { autoAlpha: 1, yPercent: 0, ease: 'power4.inOut' }, '-=0.7')
                .to('.catalog-list--search .catalog-list__bloc', { autoAlpha: 1, xPercent: 0, duration: 1, stagger: 0.25, ease: 'power4.inOut' }, '-=0.9');

            hideMainMenu
                .set(['.menu-popup__title', '.search-input'], { autoAlpha: 0, yPercent: -35 })
                .set('.catalog-list--search .catalog-list__bloc', { autoAlpha: 0, xPercent: -35 });

            if (status) {
                formHideTl.reverse();
                formShowTl.play();
            } else {
                formShowTl.reverse();
                formHideTl.play();
            }
        }
    },
    lockedDOM(status) {
        if (status) {
            $('html').css('overflow', 'hidden');
        } else {
            $('html').css('overflow', 'auto');
        }
    },
    stateObject(status, popup) {
        if (status === 'start') {
            projectFunc.formShow(popup, true);
        } else {
            projectFunc.formShow(popup, false);
        }
    }
};

function init() {
    projectFunc.setTabs();
    projectFunc.createSlider();
}

window.addEventListener('load', function () {
    init();

    if ($('.js-example-basic-single').exists()) {
        $('.js-example-basic-single').select2();
    }

    if ($('.js-btn-menu').exists()) {
        const popup = document.querySelector('.js-menu-popup');
        gsap.set(popup, { yPercent: -100 });

        $('.js-btn-menu').on('click', () => {
            if (popup) {
                $('.menu-btn').addClass('open');
                projectFunc.formShow(popup, true);
            }
        });
    }

    if ($('.js-menu-close').exists()) {
        const popup = document.querySelector('.js-menu-popup');

        $('.js-menu-close').on('click', () => {
            if (popup) {
                $('.menu-btn').removeClass('open');
                projectFunc.formShow(popup, false);
            }
        });
    }

    $('.menu-btn').click(function () {
        $('.menu-btn').toggleClass('open');
    });
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

    $('input[type=file]').change(function () {
        const label = $('.file .file__label');
        if (typeof ($('input[type=file]').files) !== 'undefined') {
            if ($('input[type=file]').files.length === 0) {
                label.text(label.data('default'));
            } else {
                const file = $('input[type=file]').files[0];
                const name = file.name;
                label.text(name);
            }
        } else {
            const name = $('input[type=file]').value.split('\\');
            label.text(name[name.length - 1]);
        }
        return false;
    });

    if ($('.js-open-modal').exists()) {
        $('.js-open-modal').on('click', (event) => {
            event.preventDefault();
            $('.js-modal').addClass('open');
        });
    }

    if ($('.js-close-modal').exists()) {
        $('.js-close-modal').on('click', () => {
            $('.js-modal').removeClass('open');
        });
    }

});
