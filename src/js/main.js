import Slider from './class/Slider.js';
import { gsap, TimelineMax, Back, Power1 } from 'gsap';
import Scrollbar from 'smooth-scrollbar';

document.addEventListener('DOMContentLoaded', () => {
    if ($('#ds_filter_catalog').exists()) {
        let ds = '';
        ds = document.getElementById('ds_filter_catalog');
        const values = JSON.parse(localStorage.getItem(ds.id));

        if (values.length > 0) {
            for (let i = 0; i < values.length; ++i) {
                const el = ds[values[i][1]];

                if (el.type === 'checkbox') {
                    el.setAttribute('checked', 'checked');
                } else {
                    el.value = values[i][1];
                }
            }
        }
    }
});


$.fn.exists = function () {
    return $(this).length;
};

const projectFunc = {
    createSlider() {
        if ($('.js-slider-partners').exists()) {
            const partnerSlider = new Slider('.js-slider-partners', 3, 0);
            partnerSlider.createSlider();
            partnerSlider.updateSlider('loop', true);
            partnerSlider.updateSlider('arrow');
            partnerSlider.updateSlider('pagination');

            $(window).resize(function () {
                if ($(this).width() <= 1024 && $(this).width() >= 621) {
                    partnerSlider.updateSlider('view', 1.9);
                    partnerSlider.updateSlider('center', true);
                } else if ($(this).width() <= 621 && $(this).width() >= 320) {
                    partnerSlider.updateSlider('view', 1.4);
                    partnerSlider.updateSlider('center', true);
                } else {
                    partnerSlider.updateSlider('view', 3);
                }
            });
        }

        if ($('.product-related__items').exists()) {
            const relatedSlider = new Slider('.product-related__items', 4, 36);
            relatedSlider.createSlider();
            relatedSlider.updateSlider('arrow');
            relatedSlider.updateSlider('pagination', 'custom');

            $(window).resize(function () {
                if ($(this).width() <= 1024 && $(this).width() >= 621) {
                    relatedSlider.updateSlider('view', 2);
                    relatedSlider.updateSlider('space', 30);
                }
                if ($(this).width() <= 620 && $(this).width() >= 320) {
                    relatedSlider.updateSlider('view', 1);
                }
            }).resize();
        }

        if ($('.js-history-slider').exists()) {
            const objSlider = new Slider('.js-history-slider', 1, 0);
            objSlider.createSlider();
            objSlider.updateSlider('effect', 'fade');
            objSlider.updateSlider('arrow');
            objSlider.updateSlider('pagination');
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
                                    //fontSize: '35px',
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
                                tabsEl[index].style.display = 'block';
                                mainBloc.style.maxHeight = 191 + tabsEl[index].scrollHeight + `px`;
                                tabsEl[index].style.display = 'none';
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
                            //fontSize: '45px',
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
                [link],
                {
                    color: '#2c43a1'
                },
                '-=0.5'
            )
            .to(
                [article],
                {
                    color: '#38393f'
                },
                '-=0.5'
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
    showOverlay: function (form, status) {
        if ($('.js-overlay').exists()) {

            const overlayEl = document.querySelector('.js-overlay');

            const showOvTl = new TimelineMax({
                reversed: true,
                paused: true,
                defaults: { duration: 0.3 },
                onStart: projectFunc.lockedDOM,
                onStartParams: [true],
                onComplete: projectFunc.stateObject,
                onCompleteParams: [form, 'start'],
            });

            const hideOvTl = new TimelineMax({
                reversed: true,
                paused: true,
                defaults: { duration: 0.3 },
                onStart: projectFunc.stateObject,
                onStartParams: [form, 'end'],
                onComplete: projectFunc.lockedDOM,
                onCompleteParams: [false]
            });

            showOvTl
                .to(
                    overlayEl,
                    {
                        autoAlpha: 0.5,
                        ease: 'power2.out'
                    }
                );

            hideOvTl
                .to(
                    overlayEl,
                    {
                        autoAlpha: 0,
                        ease: 'power2.out'
                    },
                    '+=0.6'
                );

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
                .set(['.menu-popup__title', '.menu-popup__search'], { autoAlpha: 0, yPercent: -35 })
                .set('.catalog-list--search .catalog-list__bloc', { autoAlpha: 0, xPercent: -35 })
                .to('.menu-popup__title', 1, { autoAlpha: 1, yPercent: 0, ease: 'power4.inOut' })
                .to('.menu-popup__search', 1, { autoAlpha: 1, yPercent: 0, ease: 'power4.inOut' }, '-=0.7')
                .to('.catalog-list--search .catalog-list__bloc', { autoAlpha: 1, xPercent: 0, duration: 1, stagger: 0.25, ease: 'power4.inOut' }, '-=0.9');

            hideMainMenu
                .set(['.menu-popup__title', '.menu-popup__search'], { autoAlpha: 0, yPercent: -35 })
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
    popupShow: function (form, status) {
        if ($(form).exists()) {
            const element = form;

            const formShowTl = new TimelineMax({
                reversed: true,
                paused: true,
                defaults: { duration: 0.5 }
            });

            const formHideTl = new TimelineMax({
                reversed: true,
                paused: true,
                defaults: { duration: 0.5 }
            });

            const menuShowTl = new TimelineMax({
                reversed: true,
                paused: true,
                defaults: { duration: 0.5 }
            });

            const menuHideTl = new TimelineMax({
                reversed: true,
                paused: true,
                defaults: { duration: 1 }
            });

            menuShowTl
                .to(
                    element,
                    {
                        autoAlpha: 1,
                        xPercent: -100,
                        ease: 'power2.out'
                    }
                )

            menuHideTl
                .to(
                    element,
                    {
                        autoAlpha: 0,
                        xPercent: 100,
                        ease: 'power2.out'
                    }
                )

            formHideTl
                .to(
                    element,
                    {
                        autoAlpha: 0,
                        yPercent: -100,
                        xPercent: -50,
                        ease: 'power2.out'
                    }
                )

            formShowTl
                .set(
                    element, {
                    yPercent: -100,
                    xPercent: -50,
                }
                )
                .to(
                    element,
                    {
                        autoAlpha: 1,
                        yPercent: -50,
                        //xPercent: -50,
                        ease: 'power2.out'
                    }
                )

            if (status) {
                if (form === '.js-menu-mobile') {
                    menuHideTl.reverse()
                    menuShowTl.play();

                } else {
                    formHideTl.reverse();
                    formShowTl.play();
                }
            }
            else {
                if (form === '.js-menu-mobile') {
                    menuShowTl.reverse();
                    menuHideTl.play();
                    $('.menu-btn').removeClass('open');
                } else {
                    formShowTl.reverse();
                    formHideTl.play();
                }
            }
        }
    },
    lockedDOM(status) {
        if (status) {
            $('html').css('overflow', 'hidden');
            projectFunc.scrollbarPage();
        } else {
            $('html').css('overflow', 'auto');
        }
    },
    stateObject: function (form, status) {
        if (status == 'start') {
            projectFunc.popupShow(form, true);
        }
        else {
            projectFunc.popupShow(form, false);
        }
    },
    initSearch(state) {
        const searchBloc = document.querySelector('.header-search');
        const inputSearch = searchBloc.querySelector('.header-search__field');

        const showSearch = new TimelineMax({
            reversed: true,
            paused: true,
            ease: Power1.inOut,
            onComplete: () => {
                $(inputSearch).focus();
            }
        });

        const hideSearch = new TimelineMax({
            reversed: true,
            paused: true,
            ease: Power1.inOut,
            onComplete: () => {
                $(inputSearch).val('');
            }
        });

        if (searchBloc.length > 0) {
            showSearch
                .to(searchBloc, 0.7, { width: '100%', ease: 'sine.inOut' });

            hideSearch
                .to(searchBloc, 0.7, { width: '0%', ease: 'slow(0.1, 0.1, true)' });
        }

        if (state) {
            showSearch.play();
        } else {
            hideSearch.play();
            showSearch.stop();
        }
    },
    sendFilter() {
        if ($('#ds_filter_catalog').exists()) {
            try {
                let ds = '';
                ds = document.getElementById('ds_filter_catalog');

                ds.onchange = () => {
                    const json = JSON.stringify(Array.from(new FormData(ds)));
                    localStorage.setItem(ds.id, json);
                    // ds.submit(); // Отправка формы
                };
            } catch (err) {
                console.log(err);
            }
        }
    },
    clearFilter(form) {
        let ds = '';
        ds = document.getElementById(form);
        localStorage.removeItem(ds.id);
        ds.submit();
    },
    initCost() {
        if ($('.subject__item').exists()) {
            const productItem = document.querySelectorAll('.subject__item');

            productItem.forEach((element) => {
                let num = '';
                let costInfo = element.querySelector('.js-cost').textContent;
                let discounts = element.dataset.discounts

                $(element).find('.js-cost').text(costInfo);
                costInfo = +costInfo.replace(/\s+/g, '');

                $(element).find('.js-count-input').on('keyup change', function () {

                    if (element.hasAttribute('data-discounts')) {
                        num = $(this).val() * (costInfo - (costInfo / 100 * discounts));
                    } else {
                        num = $(this).val() * costInfo;
                    }

                    if (num < costInfo) {
                        num = costInfo;
                    }

                    num = num.toLocaleString();
                    $(element).find('.js-cost').text(num);
                });
            });
        }
    },
    getScrollbarWidth() {
        let div, width = projectFunc.getScrollbarWidth.width;
        if (width === undefined) {
            div = document.createElement('div');
            div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
            div = div.firstChild;
            document.body.appendChild(div);
            width = projectFunc.getScrollbarWidth.width = div.offsetWidth - div.clientWidth;
            document.body.removeChild(div);
        }
        return width;
    },
    scrollbarPage() {
        let locked = document.querySelector('html');
        locked.style.setProperty('--wScroll', projectFunc.getScrollbarWidth() + 'px');
    }
};


const showService = (element) => {
    if ($(element).exists()) {
        const serviceHover = (element, state) => {
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
                    1,
                    {
                        backgroundColor: "#2C43A1",
                        color: 'white',
                        ease: Back.easeOut.config(1.7)
                    }
                );

            serviceBgLeave
                .to(
                    element,
                    1,
                    {
                        backgroundColor: "white",
                        color: '#38393F',
                        ease: Back.easeOut.config(1.7)
                    }
                );

            if (state) {
                serviceBg.play();
                serviceBgLeave.reverse();
            }
            else {
                serviceBgLeave.play();
                serviceBg.reverse();
            }
        }

        gsap.utils.toArray(element).forEach(item => {
            item.addEventListener('mouseenter', function () {
                serviceHover(this, true);
            });

            item.addEventListener('mouseleave', function () {
                serviceHover(this, false);
            });
        });
    }
}

function init() {
    projectFunc.setTabs();
    projectFunc.createSlider();
    projectFunc.sendFilter();
    projectFunc.initCost();
    showService('.lk-menu__item');
}

window.addEventListener('load', function () {
    init();

    if ($('#map').exists()) {
        ymaps.ready(inits);

        function inits() {
            console.log("object");
            // let MyBalloonContentLayout, myPlacemark;
            var MyBalloonContentLayout;
            // Создание карты.
            var myMap = new ymaps.Map("map", {
                // Координаты центра карты.
                // Порядок по умолчанию: «широта, долгота».
                center: [53.437095, 59.074866],
                zoom: 15.5,
                controls: []
            });

            // Создание макета балуна
            var MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
                ' <div class="popover mark mark--mark1 top">' +
                ' <a class="close" href="#">× </a>' +
                ' <div class="arrow"> </div>' +
                ' <div class="mark__inner popover-inner">' +
                '$[[options.contentLayout observeSize minWidth=235 maxWidth=1200 maxHeight=350]]' +
                ' </div>' +
                ' </div>', {
                /**
                * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
                * @function
                * @name build
                */
                build: function () {
                    this.constructor.superclass.build.call(this);
                    this._$element = $('.popover', this.getParentElement());
                    this.applyElementOffset();
                    this._$element.find('.close')
                        .on('click', $.proxy(this.onCloseClick, this));
                },

                /**
                * Удаляет содержимое макета из DOM.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
                * @function
                * @name clear
                */
                clear: function () {
                    this._$element.find('.close')
                        .off('click');
                    this.constructor.superclass.clear.call(this);
                },

                /**
                * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                * @function
                * @name onSublayoutSizeChange
                */
                onSublayoutSizeChange: function () {
                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                    if (!this._isElement(this._$element)) {
                        return;
                    }
                    this.applyElementOffset();
                    this.events.fire('shapechange');
                },

                /**
                * Сдвигаем балун, чтобы середина указывала на точку привязки.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                * @function
                * @name applyElementOffset
                */
                applyElementOffset: function () {
                    this._$element.css({
                        left: -(this._$element[0].offsetWidth / 2),
                        top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                    });
                },

                /**
                * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                * @function
                * @name onCloseClick
                */
                onCloseClick: function (e) {
                    e.preventDefault();
                    console.log('close');
                    this.events.fire('userclose');
                },

                /**
                * Используется для автопозиционирования (balloonAutoPan).
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
                * @function
                * @name getClientBounds
                * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
                */
                getShape: function () {
                    if (!this._isElement(this._$element)) {
                        return MyBalloonLayout.superclass.getShape.call(this);
                    }
                    var position = this._$element.position();
                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                        [position.left, position.top], [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight]
                    ]));
                },
                /**
                * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
                * @function
                * @private
                * @name _isElement
                * @param {jQuery} [element] Элемент.
                * @returns {Boolean} Флаг наличия.
                */
                _isElement: function (element) {
                    return element && element[0] && element.find('.arrow')[0];
                }
            });
            var MyBalloonLayout2 = ymaps.templateLayoutFactory.createClass(
                ' <div class="popover mark mark--mark2 top">' +
                ' <a class="close" href="#">× </a>' +
                ' <div class="arrow"> </div>' +
                ' <div class="mark__inner popover-inner">' +
                '$[[options.contentLayout observeSize minWidth=235 maxWidth=1200 maxHeight=550]]' +
                ' </div>' +
                ' </div>', {
                /**
                * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
                * @function
                * @name build
                */
                build: function () {
                    this.constructor.superclass.build.call(this);
                    this._$element = $('.popover', this.getParentElement());
                    this.applyElementOffset();
                    this._$element.find('.close')
                        .on('click', $.proxy(this.onCloseClick, this));
                },

                /**
                * Удаляет содержимое макета из DOM.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
                * @function
                * @name clear
                */
                clear: function () {
                    this._$element.find('.close')
                        .off('click');
                    this.constructor.superclass.clear.call(this);
                },

                /**
                * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                * @function
                * @name onSublayoutSizeChange
                */
                onSublayoutSizeChange: function () {
                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                    if (!this._isElement(this._$element)) {
                        return;
                    }
                    this.applyElementOffset();
                    this.events.fire('shapechange');
                },

                /**
                * Сдвигаем балун, чтобы середина указывала на точку привязки.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                * @function
                * @name applyElementOffset
                */
                applyElementOffset: function () {
                    this._$element.css({
                        left: -(this._$element[0].offsetWidth / 2),
                        top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                    });
                },

                /**
                * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                * @function
                * @name onCloseClick
                */
                onCloseClick: function (e) {
                    e.preventDefault();
                    console.log('close');
                    this.events.fire('userclose');
                },

                /**
                * Используется для автопозиционирования (balloonAutoPan).
                * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
                * @function
                * @name getClientBounds
                * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
                */
                getShape: function () {
                    if (!this._isElement(this._$element)) {
                        return MyBalloonLayout.superclass.getShape.call(this);
                    }
                    var position = this._$element.position();
                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                        [position.left, position.top], [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight]
                    ]));
                },
                /**
                * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
                * @function
                * @private
                * @name _isElement
                * @param {jQuery} [element] Элемент.
                * @returns {Boolean} Флаг наличия.
                */
                _isElement: function (element) {
                    return element && element[0] && element.find('.arrow')[0];
                }
            }),

                // Создание вложенного макета содержимого балуна.
                MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                    ' <div class="mark__header"><div class="column-md-6">$[properties.balloonHeader] </div></div>' +
                    ' <div class="column-md-6">$[properties.balloonContent] </div>'
                );
            // Добавление метки на карту

            if ($(window).width() >= 621) {
                var myPlacemark = new ymaps.Placemark(
                    // Координаты метки
                    [53.436705, 59.075600], {
                    // Свойства
                    // Текст метки
                    balloonHeader: ' <b>ООО "Уральская Металлообрабатывающая Компания"</b>',
                    balloonContent: ' <div class="mark__box"><p>Адрес: Коммунальная улица, 10с1, Магнитогорск</p><p>E-mail: <a href="mailto:uralmetalcompany.ru">uralmetalcompany.ru</a></p><p>График работы: Пн-Чт 08:30–17.30; Пт 08:30–16:15; Сб-Вс - выходной</p</div>'
                }, {
                    balloonShadow: false,
                    balloonLayout: MyBalloonLayout,
                    balloonContentLayout: MyBalloonContentLayout,
                    balloonPanelMaxMapArea: 0,
                    // Не скрываем иконку при открытом балуне.
                    hideIconOnBalloonOpen: false,
                    // И дополнительно смещаем балун, для открытия над иконкой.
                    balloonOffset: [-250, -260],
                    preset: "islands#blueDotIcon"
                });

                // Создание метки
                var myPlacemark2 = new ymaps.Placemark(
                    // Координаты метки
                    [53.441818, 59.082698], {
                    // Свойства
                    // Текст метки
                    balloonContent: ' <div class="mark__box">Проходная ООО "Уральская Металлообрабатывающая</br>Компания"</div>'
                }, {
                    balloonShadow: false,
                    balloonLayout: MyBalloonLayout2,
                    balloonContentLayout: MyBalloonContentLayout,
                    balloonPanelMaxMapArea: 0,
                    // Не скрываем иконку при открытом балуне.
                    hideIconOnBalloonOpen: false,
                    balloonOffset: [-240, -180],
                    preset: "islands#redDotIcon",
                });
            } else {
                var myPlacemark = new ymaps.Placemark(
                    // Координаты метки
                    [53.436705, 59.075600], {
                    // Свойства
                    // Текст метки
                    balloonHeader: ' <b>ООО "Уральская Металло-</br>обрабатывающая Компания"</b>',
                    balloonContent: ' <div class="mark__box"><p>Адрес: Коммунальная улица, 10с1,</br> Магнитогорск</p><p>E-mail: <a href="mailto:uralmetalcompany.ru">uralmetalcompany.ru</a></p><p>График работы: Пн-Чт 08:30–17.30;</br> Пт 08:30–16:15; Сб-Вс - выходной</p</div>'
                }, {
                    balloonShadow: false,
                    balloonLayout: MyBalloonLayout,
                    balloonContentLayout: MyBalloonContentLayout,
                    balloonPanelMaxMapArea: 0,
                    // Не скрываем иконку при открытом балуне.
                    hideIconOnBalloonOpen: false,
                    // И дополнительно смещаем балун, для открытия над иконкой.
                    balloonOffset: [-133, -325],
                    preset: "islands#blueDotIcon"
                });

                // Создание метки
                var myPlacemark2 = new ymaps.Placemark(
                    // Координаты метки
                    [53.441818, 59.082698], {
                    // Свойства
                    // Текст метки
                    balloonContent: ' <div class="mark__box">Проходная ООО "Уральская</br> Металлообрабатывающая</br>Компания"</div>'
                }, {
                    balloonShadow: false,
                    balloonLayout: MyBalloonLayout2,
                    balloonContentLayout: MyBalloonContentLayout,
                    balloonPanelMaxMapArea: 0,
                    // Не скрываем иконку при открытом балуне.
                    hideIconOnBalloonOpen: false,
                    balloonOffset: [-160, -180],
                    preset: "islands#redDotIcon",
                });
            }

            myMap.geoObjects.add(myPlacemark);
            myMap.geoObjects.add(myPlacemark2);

            const myGeoObject = new ymaps.GeoObject({
                // Описываем геометрию геообъекта.
                geometry: {
                    // Тип геометрии - "Ломаная линия".
                    type: "LineString",
                    // Указываем координаты вершин ломаной.
                    coordinates: [
                        [53.442172, 59.082912],
                        [53.436741, 59.077092],
                        [53.436611, 59.075810]
                    ]
                }
            }, {
                // Задаем опции геообъекта.
                // Включаем возможность перетаскивания ломаной.
                draggable: false,
                // Цвет линии.
                strokeColor: "#D81A27",
                // Ширина линии.
                strokeWidth: 5,
                opacity: 0.5
            });

            var zoomControl = new ymaps.control.ZoomControl({
                options: {
                    size: "small"
                }
            });
            myMap.controls.add(zoomControl, {
                float: 'none',
                position: {
                    right: 20,
                    bottom: 290
                }
            });

            // Добавим элемент управления с собственной меткой геолокации на карте.
            var geolocationControl = new ymaps.control.GeolocationControl({
                options: { noPlacemark: true }
            });
            geolocationControl.events.add('locationchange', function (event) {
                var position = event.get('position'),
                    // При создании метки можно задать ей любой внешний вид.
                    locationPlacemark = new ymaps.Placemark(position);

                myMap.geoObjects.add(locationPlacemark);
                // Установим новый центр карты в текущее местоположение пользователя.
                myMap.panTo(position);
            });
            myMap.controls.add(geolocationControl, {
                float: 'none',
                position: {
                    right: 20,
                    bottom: 250
                }
            });

            myMap.geoObjects.add(myGeoObject);
            //myMap.geoObjects.add(mark);
            // myMap.geoObjects.add(mark2);
            myMap.behaviors.disable('scrollZoom');

            var position = myMap.getGlobalPixelCenter();
            myMap.setGlobalPixelCenter([position[0] + 100, position[1] - 120]);
        }
    }

    if ($('.js-portfolio').exists()) {

        if (window.addEventListener) {
            projectFunc.scrollbarPage();
            window.addEventListener('DOMMouseScroll', wheel, false);
        }

        function wheel(event) {
            event.preventDefault();
            event.returnValue = false;
        };

        Scrollbar.init(document.querySelector('.js-portfolio'));

        const blocPortfolio = document.querySelector('.js-portfolio');

        blocPortfolio.addEventListener('mouseenter', function () {
            projectFunc.lockedDOM(true);
        });

        blocPortfolio.addEventListener('mouseleave', function () {
            projectFunc.lockedDOM(false);
        });
    }

    if ($('.js-dropdown').exists()) {
        let accordions = document.getElementsByClassName("js-dropdown");

        for (let i = 0; i < accordions.length; i++) {
            accordions[i].onclick = function () {
                this.classList.toggle('is-open');

                let content = $(this).find('.menu-mobile__sub')[0];

                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            };
        }
    }

    if ($('.js-footer-acc').exists()) {
        let accordions = document.getElementsByClassName("js-footer-acc");

        for (let i = 0; i < accordions.length; i++) {
            accordions[i].onclick = function () {
                this.classList.toggle('is-open');

                let content = $(this).find('.footer__list')[0];

                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            };
        }
    }

    if ($('.lk-cart__item').exists()) {
        try {
            const cartItem = document.querySelectorAll('.lk-cart__item');
            let btn = '';
            let panel = '';
            let content = '';
            let btnTxt = '';


            cartItem.forEach((item, _) => {
                btn = item.querySelectorAll('.js-btn-cartInfo');
                panel = item.querySelectorAll('.lk-cart__detail');

                // btnComment = item.querySelector('.js-btn-comment')[0];
                // btnTxt = item.querySelector('.js-btn-txt');

                btn.forEach((item, index) => {
                    panel.forEach((pEl, indexP) => {
                        item.addEventListener('click', function () {
                            if (index == indexP) {
                                this.classList.toggle('is-open');

                                if (this.classList.contains('btn--delivery') && this.classList.contains('is-open')) {
                                    console.log($(this).find('.js-btn-txt'));
                                    $(this).find('.js-btn-txt').text('Удалить доставку');
                                } else if (this.classList.contains('btn--delivery') && !this.classList.contains('is-open')) {
                                    $(this).find('.js-btn-txt').text('Добавить доставку');
                                }

                                content = panel[index];
                                if (content.style.maxHeight) {
                                    content.style.maxHeight = null;
                                } else {
                                    content.style.maxHeight = content.scrollHeight + "px";
                                }
                            }
                        });
                    });
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.lk-profile__item').exists()) {
        let accordions = document.getElementsByClassName('lk-profile__item');
        let btn = '';

        for (let i = 0; i < accordions.length; i++) {
            if (!accordions[i].classList.contains('disable')) {
                btn = accordions[i].querySelector('.js-btn-edit');

                btn.onclick = function () {
                    accordions[i].classList.toggle('is-open');
                    let content = $(this).closest('.lk-profile__row').next().find('.lk-edit')[0];
                    let box = $(this).closest('.lk-profile__row').next()[0];

                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        box.style.maxHeight = content.scrollHeight + "px";
                    }

                    $(this).closest('.lk-profile__row').animate({ "maxHeight": "0px", "opacity": "0" }, { duration: 500, queue: false, complete: function (e) { $(this).closest('.lk-profile__row').css('overflowY', 'hidden'); $(content).find('input').focus(); } });
                };
            }
        }

        if ($('.js-close-edit').exists()) {
            let closeEdit = document.querySelectorAll('.js-close-edit');
            for (let i = 0; i < closeEdit.length; i++) {
                closeEdit[i].onclick = function () {
                    accordions[i].classList.toggle('is-open');
                    let content = $(accordions[i]).find('.lk-profile__row').next().find('.lk-edit')[0];
                    let box = $(accordions[i]).find('.lk-profile__row').next()[0];

                    box.style.maxHeight = null;
                    $(accordions[i]).find('.lk-profile__row').animate({ "maxHeight": "24px", "opacity": "1" }, { duration: 500, queue: false, complete: function (e) { $(accordions[i]).find('.lk-profile__row').css('overflowY', 'visible'); } });
                };
            }
        }
    }

    if ($('.js-clear-filter').exists()) {
        const btnReset = document.querySelector('.js-clear-filter');
        btnReset.onclick = (event) => {
            event.preventDefault();
            projectFunc.clearFilter('ds_filter_catalog');
        };
    }

    if ($('.js-btn-resume').exists()) {
        $('.js-btn-resume').on('click', () => {
            projectFunc.showOverlay('.js-modal-resume', true);
        });
    }

    if ($('.js-overlay').exists()) {
        $('.js-overlay').on('click', () => {
            projectFunc.showOverlay('.js-modal-order', false);
            projectFunc.showOverlay('.js-modal-success', false);
            projectFunc.showOverlay('.js-modal-resume', false);
            projectFunc.showOverlay('.js-modal-delivery', false);
            projectFunc.showOverlay('.js-menu-mobile', false);
        });
    }

    if ($('.js-select').exists()) {
        $(window).resize(function () {
            $('.js-select').select2({
                minimumResultsForSearch: Infinity,
                width: 'element',
            });
        }).resize();
    }

    if ($('.js-btn-search').exists()) {
        $('.js-btn-search').on('click', () => {
            projectFunc.initSearch(true);
        });
    }

    if ($('.js-close-search').exists()) {
        $('.js-close-search').on('click', function (event) {
            event.preventDefault();
            projectFunc.initSearch(false);
        });
    }

    if ($('.js-example-basic-single').exists()) {
        $('.js-example-basic-single').select2();
    }

    if ($('.js-open-auth').exists()) {
        try {
            $(window).on('resize load', function () {
                if ($(window).width() <= 620) {
                    const refs = document.querySelectorAll('.js-open-auth');

                    refs.forEach((item, index) => {
                        item.addEventListener('click', function (event) {
                            event.preventDefault();
                            projectFunc.popupShow('.js-modal-reg', false);
                            projectFunc.popupShow('.js-modal-auth', true);
                        }, false);
                    });
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-open-reg').exists()) {
        try {
            $(window).on('resize load', function () {
                if ($(window).width() <= 620) {
                    const ref = document.querySelector('.js-open-reg');
                    ref.addEventListener('click', function (event) {
                        event.preventDefault();
                        projectFunc.popupShow('.js-modal-reg', true);
                        projectFunc.popupShow('.js-modal-auth', false);
                    }, false);
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-open-res').exists()) {
        try {
            $(window).on('resize load', function () {
                if ($(window).width() <= 620) {
                    const ref = document.querySelector('.js-open-res');
                    ref.addEventListener('click', function (event) {
                        event.preventDefault();
                        projectFunc.popupShow('.js-modal-res', true);
                        projectFunc.popupShow('.js-modal-auth', false);
                        projectFunc.popupShow('.js-modal-reg', false);
                    }, false);
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    if ($('.js-btn-menu').exists()) {
        const popup = document.querySelector('.js-menu-popup');
        gsap.set(popup, { yPercent: -100 });

        $(window).on('resize load', function () {
            $('.js-btn-menu').on('click', () => {
                if ($(window).width() > 1024) {
                    if (popup) {
                        $('.menu-btn').addClass('open');
                        projectFunc.formShow(popup, true);
                    }
                } else {
                    if (!$('.menu-btn').hasClass('open')) {
                        projectFunc.showOverlay('.js-menu-mobile', false);
                    } else {
                        projectFunc.showOverlay('.js-menu-mobile', true);
                    }
                }
            });
        }).resize();
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

    if ($('.js-btn-reset').exists()) {
        $('.js-btn-reset').on('click', () => {
            $('.form-group').each((_, element) => {
                $(element).removeClass('on-focus');
            });
        });
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
                    $('.header').addClass('mf-small-header');
                    // return;
                } else {
                    $target.removeClass('mf-scroll');
                    $('.header').removeClass('mf-small-header');
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
                label.removeClass('withFile').text(label.data('default'));
            }
            else {
                let file = this.files[0];
                let name = file.name;
                label.addClass('withFile').text(name);
            }
        }
        else {
            let name = this.value.split("\\");
            label.addClass('withFile').text(name[name.length - 1]);
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
            projectFunc.showOverlay('.js-modal-success', false);
            projectFunc.showOverlay('.js-modal-resume', false);
            projectFunc.showOverlay('.js-modal-order', false);
            projectFunc.showOverlay('.js-modal-delivery', false);
        });
    }

    if ($('.js-close-modal_auth').exists()) {
        try {
            $('.js-close-modal_auth').on('click', () => {
                projectFunc.popupShow('.js-modal-auth', false);
                projectFunc.popupShow('.js-modal-reg', false);
                projectFunc.popupShow('.js-modal-res', false);
            });
        }
        catch (err) {
            console.log(err);
        }
    }



    if ($('.lk-documentation__row--contract').exists()) {
        const date = document.querySelector('.js-dogovor-date').dataset.date;
        const dogovorBloc = document.querySelector('.lk-documentation__row--contract');
        let title = dogovorBloc.querySelector('.lk-documentation__title');

        title.textContent = `Договор действителен до ${date}`;
    }

    if ($('.js-accordion-head').exists()) {
        const $head = '.js-accordion-head';

        $(document).off('click.toggle');
        $(document).on('click.toggle', $head, function (e) {
            e.preventDefault();

            const $this = $(this);
            const $item = $this.parents('.js-accordion-item:first');

            $item.toggleClass('active');
            $item.find('.js-accordion-body:first').slideToggle();
        });
    }

    if ($('.js-tab-btn').exists()) {
        $('.js-tab-btn').click(function (e) {
            e.preventDefault();
            $('.js-tab-btn').removeClass('active');
            $(this).addClass('active');
            $('.js-tab-body').removeClass('active');
            const tabID = $(this).attr('data-tab-btn');
            $('.js-tab-body[data-tab-body="' + tabID + '"]').addClass('active');
        });
    }

    if ($('.js-btn-success').exists()) {
        $('.js-btn-success').on('click', () => {
            event.preventDefault();
            projectFunc.showOverlay('.js-modal-success', true);
        });
    }

    if ($('.js-btn-delivery').exists()) {
        $('.js-btn-delivery').on('click', () => {
            event.preventDefault();
            projectFunc.showOverlay('.js-modal-delivery', true);
        });
    }

    const stateRadio = (radio, status) => {
        let radioEl = document.querySelectorAll(radio);
        if (radioEl) {
            if (status) {
                radioEl.forEach((item, index) => {
                    item.disabled = false;

                    if (index === 0) {
                        item.checked = true;
                    }
                });
            } else {
                radioEl.forEach((item, _) => {
                    item.disabled = true;
                    item.checked = false;
                });
            }
        }
    };

    if ($('.js-modal-delivery').exists()) {
        const panelBloc = document.querySelector('.modal-delivery__box');
        let btn = this.document.querySelectorAll('.modal-delivery__btn');

        if (panelBloc) {
            if (panelBloc.classList.contains('disable')) {
                // $('.js-select').prop("disabled", true);
            }
        }

        if (btn) {
            btn.forEach((item, i) => {
                item.addEventListener('click', function () {
                    this.classList.add('active');
                    btn.forEach((el, index) => {
                        if (index !== i) {
                            el.classList.remove('active');
                        }
                    });

                    if (this.classList.contains('js-delivery-way')) {
                        if (panelBloc.classList.contains('disable')) {
                            panelBloc.classList.remove('disable');
                            // $('.js-select').prop("disabled", false);
                            stateRadio('.lk-radio', true);
                        }
                    } else {
                        panelBloc.classList.add('disable');
                        // $('.js-select').prop("disabled", true);
                        stateRadio('.lk-radio', false);
                    }
                });
            });
        }
    }

    // .js-btn-delivery

    // if ($('.js-order-info').exists()) {
    //     $('.js-order-info').on('click', () => {
    //         projectFunc.showOverlay('.js-modal-order', true);
    //     });
    // }

    if ($('.order-card').exists()) {
        const card = document.querySelectorAll('.order-card');
        let orderInfo = '';
        let modal = '';

        card.forEach((item, _) => {
            orderInfo = item.querySelector('.js-order-info');

            orderInfo.addEventListener('click', function () {
                modal = item.querySelector('.modal');
                projectFunc.showOverlay(modal, true);
            });
        });
    }
});
