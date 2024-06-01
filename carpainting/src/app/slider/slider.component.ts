import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import Swiper from "swiper";
import 'swiper/swiper-bundle.css';

@Component({
  selector: 'app-slider',
  standalone: true,
    imports: [
        NgOptimizedImage
    ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;
  @ViewChild('progressBar') progressBar!: ElementRef;
  swiper: any;
  progress: number = 0;
  activeIndex: number = 0;
  progressInterval: any;
  currentSlideAutoplay: number = 3000;
  isPaused = false;
  interval: any;
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initSwiper();
    this.startProgressBar();
    this.updateTotalSlidesNumber();
    this.updateCurrentSlideNumber();
  }

  ngOnDestroy(): void {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  initSwiper(): void {
    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      effect: 'fade',
      fadeEffect: { crossFade: true },
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: true,
      grabCursor: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      watchOverflow: true,
      watchSlidesProgress: true,
      roundLengths: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
    });

    this.updateTotalSlidesNumber();

    this.swiper.on('slideChange', () => {
      if (this.activeIndex !== this.swiper.realIndex) {
        this.activeIndex = this.swiper.realIndex;
        this.updateProgressBar();
        this.updateCurrentSlideNumber();
      }
    });

    this.startProgress();
  }

  startProgress(): void {
    clearInterval(this.interval);
    this.startProgressBar();
    this.interval = setInterval(() => {
      if (!this.isPaused) {
        this.swiper.slideNext();
        this.startProgressBar();
      }
    }, 3000);
  }

  startProgressBar(): void {
    this.progress = 0;
    this.updateProgressBarWidth();
    setTimeout(() => {
      this.progress = 100;
      this.updateProgressBarWidth();
    }, 30);
  }
  resetProgressBar(): void {
    this.progress = 0;
    this.updateProgressBarWidth();
  }

  updateProgressBar(): void {
    clearInterval(this.progressInterval);
    this.currentSlideAutoplay = parseInt(this.swiper.slides[this.activeIndex].dataset.swiperAutoplay, 10);
    this.resetProgressBar();
    this.startProgressBar();
    this.updateCurrentSlideNumber();
  }

  updateProgressBarWidth(): void {
    const progressBarElement = this.progressBar.nativeElement.querySelector('.progress-bar') as HTMLElement;
    if (progressBarElement) {
      this.renderer.setStyle(progressBarElement, 'width', `${this.progress}%`);
    }
  }

  updateCurrentSlideNumber(): void {
    const currentSlideNumberElement = document.getElementById('current-slide-number');
    if (currentSlideNumberElement) {
      currentSlideNumberElement.textContent = String(this.swiper.realIndex + 1).padStart(2, '0');
    }
  }

  updateTotalSlidesNumber(): void {
    const totalSlideNumberElement = document.getElementById('total-slide-number');
    if (totalSlideNumberElement) {
      totalSlideNumberElement.textContent = String(this.swiper.slides.length).padStart(2, '0');
    }
  }


}
