import { VideoPlayer, DifferenceEdu, Form, ShowInfo,Download } from './modules';
import { MainSlider } from './modules/slider/slider-main';
import { MiniSlider } from './modules/slider/slider-mini';

window.addEventListener('DOMContentLoaded', () => {
  new MainSlider({
    btns: '.next',
    container: '.page'
  }).render();

  new MainSlider({
    container: '.moduleapp',
    btns: '.next',
    prevModule: '.prevmodule',
    nextModule: '.nextmodule'
  }).render();

  new MiniSlider({
    container: '.showup__content-slider',
    prev: '.showup__prev',
    next: '.showup__next',
    activeClass: 'card-active',
    animate: true
  }).init();

  new MiniSlider({
    container: '.modules__content-slider',
    prev: '.modules__info-btns .slick-prev',
    next: '.modules__info-btns .slick-next',
    activeClass: 'card-active',
    animate: true,
    autoplay: true
  }).init();

  new MiniSlider({
    container: '.feed__slider',
    prev: '.feed__slider .slick-prev',
    next: '.feed__slider .slick-next',
    activeClass: 'feed__item-active'
  }).init();

  new VideoPlayer('.showup .play', '.overlay').init();
  new VideoPlayer('.module__video-item .play', '.overlay').init();

  new DifferenceEdu('.officerold', '.officernew', '.officer__card-item').init();

  new Form('.form').init();

  new ShowInfo('.module__info-show .plus').init();

  new Download('.download').init();
});
