import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import Swiper from "swiper";
import 'swiper/swiper-bundle.css';
import {LangChangeEvent, TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass,
    TranslateModule
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;
  @ViewChild('progressBar') progressBar!: ElementRef;
  swiper: any;
  progress: number = 0;
  progressInterval: any;
  currentSlideAutoplay: number = 3000;
  isPaused = false;
  interval: any;
  selectedLanguage: string = '';


  constructor(public translateService: TranslateService,private renderer: Renderer2) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.selectedLanguage = event.lang.toUpperCase();
    });
    this.translateService.use('en');
  }


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
      effect: "fade",
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
      roundLengths: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      fadeEffect: {
        crossFade: true
      }
    });

    this.updateTotalSlidesNumber();

    this.swiper.on('slideChange', () => {
      this.updateProgressBar();
      this.updateCurrentSlideNumber();
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
    }, this.currentSlideAutoplay || 3000);
  }

  startProgressBar(): void {
    this.progress = 0;
    this.updateProgressBarWidth(0);
    setTimeout(() => {
      this.progress = 100;
      this.updateProgressBarWidth(this.currentSlideAutoplay);
    }, 30);
  }

  resetProgressBar(): void {
    this.progress = 0;
    this.updateProgressBarWidth(0);
  }

  updateProgressBar(): void {
    clearInterval(this.progressInterval);
    const currentSlide = this.swiper.slides[this.swiper.realIndex];
    this.currentSlideAutoplay = parseInt(currentSlide.dataset.swiperAutoplay, 10) || 3000; // Get the autoplay duration for the current slide or use default
    this.resetProgressBar();
    this.startProgressBar();
    this.updateProgressInterval();
  }

  updateProgressInterval(): void {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (!this.isPaused) {
        this.swiper.slideNext();
        this.startProgressBar();
      }
    }, this.currentSlideAutoplay);
  }

  updateProgressBarWidth(duration: number): void {
    const progressBarElement = this.progressBar.nativeElement.querySelector('.progress-bar') as HTMLElement;
    if (progressBarElement) {
      this.renderer.setStyle(progressBarElement, 'width', `${this.progress}%`);
      this.renderer.setStyle(progressBarElement, 'transition', `width ${duration}ms linear`);
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
  scrollToContactForm(): void {
    const contactFormElement = document.getElementById('contact-form');
    if (contactFormElement) {
      window.scrollTo({
        top: contactFormElement.offsetTop,
        behavior: 'smooth'
      });
    } else {
      console.log('Contact form element not found.');
    }
  }

}
