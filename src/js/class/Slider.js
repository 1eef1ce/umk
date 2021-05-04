import $ from '../../local_modules/jquery/dist/jquery.min';
import Swiper from '../../local_modules/swiper/swiper-bundle.min';

class Slider {
    constructor(name, view, space) {
        this.init = true;
        this.name = name;
        this.view = view;
        this.space = space;
    }

    createSlider() {
        if (this.pagination || this.arrow) {
            let pagEl = $(this.name).find('.pagination');
            let arrowNext = $(this.name).find('.arrow__link--next');
            let arrowPrev = $(this.name).find('.arrow__link--prev');

            let settings = {
                slidesPerView: this.view,
                spaceBetween: this.space,
                slidesPerColumn: this.column,
                slidesPerColumnFill: 'row',
                touchRatio: this.ratio,
                effect: this.effect,
                navigation: {
                    nextEl: arrowNext,
                    prevEl: arrowPrev,
                },
                pagination: {
                    el: pagEl,
                    type: "custom",
                    renderCustom: function (swiper, current, total) {
                        let i = current ? current : 0;
                        return `${("0" + i).slice(-2)} / ${("0" + total).slice(-2)}`;
                    }
                },
            };

            if (this.custom === true) {
                console.log(this.custom);
                this.slider = new Swiper(this.name, settings);
            }
            else {
                this.slider = new Swiper(this.name, {
                    slidesPerView: this.view,
                    spaceBetween: this.space,
                    slidesPerColumn: this.column,
                    slidesPerColumnFill: 'row',
                    touchRatio: this.ratio,
                    effect: this.effect,
                    fade: { crossFade: true },
                    loop: this.loop,
                    direction: this.direction,
                    pagination: {
                        el: pagEl,
                        clickable: true,
                    },
                    navigation: {
                        nextEl: arrowNext,
                        prevEl: arrowPrev,
                    },
                });

                setTimeout(() => {
                    $(this.name).css('opacity', 1);
                }, 600);
            }
        } else {
            this.slider = new Swiper(this.name, {
                slidesPerView: this.view,
                spaceBetween: this.space,
            });

            setTimeout(() => {
                $(this.name).css('opacity', 1);
            }, 600);
        }
        return this.slider;
    }

    updateSlider(props, res = '') {
        switch (props) {
            case 'space':
                this.slider.params.spaceBetween = res;
                this.slider.update();
                break;
            case 'view':
                this.slider.params.slidesPerView = res;
                this.slider.update();
                break;
            case 'center':
                this.slider.params.centeredSlides = res;
                this.slider.update();
                break;
            case 'initialSlide':
                this.slider.params.initialSlide = res;
                this.slider.update();
                break;
            case 'slideActiveClass':
                this.slider.params.slideActiveClass = res;
                this.slider.update();
                break;
            case 'autoHeight':
                this.slider.params.autoHeight = res;
                this.slider.update();
                break;
            case 'slideToClickedSlide':
                this.slider.params.slideToClickedSlide = res;
                this.slider.update();
                break;
            case 'controller':
                this.slider.params.controller = res;
                this.slider.update();
                console.log(this.slider.params.controller);
                break;
            case 'loop':
                this.slider.params.loop = false;
                this.slider.update();
                break;
            case 'group':
                this.slider.params.slidesPerGroup = res;
                this.slider.params.speed = 1000;
                this.slider.update();
                break;
            case 'skip':
                this.slider.params.slidesPerGroupSkip = res;
                this.slider.update();
                break;
            case 'autoHeight':
                this.slider.params.autoHeight = res;
                this.slider.update();
                break;
            case 'pagination':
                let pagEl = $(this.name).find('.pagination')[0];
                let settings = {
                    slidesPerView: this.view,
                    spaceBetween: this.space,
                    slidesPerColumn: this.column,
                    pagination: {
                        el: pagEl,
                        clickable: true,
                    },
                };
                this.slider.destroy();
                this.slider = new Swiper(this.name, settings);
                break;
        }
    }
}

export default Slider;