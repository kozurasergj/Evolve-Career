import { Slider } from "./slider";
export class MainSlider extends Slider {
  constructor(btns, prevModule, nextModule) {
    super(btns, prevModule, nextModule);
  }

  showSlides(n) {
    if (this.slides) {
      if (n > this.slides.length) {
        this.slideIndex = 1;
      }
      if (n < 1) {
        this.slideIndex = this.slides.length;
      }
      if (this.showBlockByTime && n === 3) {
        this.showBlockByTime.style.opacity = '0';
        this.showBlockByTime.classList.add('animated');
        setTimeout(() => {
          this.showBlockByTime.style.opacity = '1';
          this.showBlockByTime.classList.add('slideInUp');
        }, 3000)
      } else {
        this.showBlockByTime?.classList.remove('slideInUp');
      }
      Array.from(this.slides).forEach(slide => {
        slide.style.display = 'none';
      });
      this.slides[this.slideIndex - 1].style.display = 'block';
    }
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  bindTriggers(triggersPrev, triggersNext) {
    triggersPrev.forEach(trigger => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        this.plusSlides(-1);
      });
    });
    triggersNext.forEach(trigger => {
      trigger.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.plusSlides(1);
      });
    });
  }

  render() {
    this.showBlockByTime = document.querySelector('.hanson');
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.plusSlides(1);
      });
      btn?.parentNode?.previousElementSibling?.addEventListener('click', (event) => {
        event.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });
    this.showSlides(this.slideIndex);
    this.bindTriggers(this.prevModule, this.nextModule);
  }
}
