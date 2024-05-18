import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef, OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import 'swiper/swiper-bundle.css';
import Swiper from "swiper";
import 'swiper/swiper-bundle.css';
import {SliderComponent} from "../slider/slider.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOptimizedImage, SliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  @ViewChild('progressBar') progressBar!: ElementRef;
  swiper: any;
  progress: number = 0;
  activeIndex: number = 0;
  progressInterval: any;
  currentSlideAutoplay: number = 3000;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initSwiper();
    this.startProgressBar();
  }

  ngOnDestroy(): void {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  initSwiper(): void {
    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      effect: 'fade',
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      spaceBetween: 30,
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
      // breakpoints: {
      //   // When window width is >= 320px
      //   320: {
      //     slidesPerView: 1,
      //     spaceBetween: 10
      //   },
      //   // When window width is >= 640px
      //   640: {
      //     slidesPerView: 1,
      //     spaceBetween: 20
      //   },
      //   768: {
      //     slidesPerView: 1,
      //     spaceBetween: 20
      //   },
      //   // When window width is >= 1024px
      //   1024: {
      //     slidesPerView: 1,
      //     spaceBetween: 30
      //   }
      // }
    });

    this.swiper.on('slideChange', () => {
      if (this.activeIndex !== this.swiper.realIndex) {
        this.activeIndex = this.swiper.realIndex;
        this.updateProgressBar();
      }
    });
  }


  startProgressBar(): void {
    this.resetProgressBar();
    this.progressInterval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 100 / (this.currentSlideAutoplay / 100);
      } else {
        this.progress = 0;
        this.swiper.slideNext();
        this.currentSlideAutoplay = parseInt(this.swiper.slides[this.activeIndex].dataset.swiperAutoplay, 10);
      }
      this.updateProgressBarWidth();
    }, 100);
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
  }

  updateProgressBarWidth(): void {
    const progressBarElement = this.progressBar.nativeElement.querySelector('.progress-bar') as HTMLElement;
    if (progressBarElement) {
      this.renderer.setStyle(progressBarElement, 'width', `${this.progress}%`);
    }
  }



  links = ['Home', 'Details', 'Info', 'Contact'];

  isActive: boolean = false;
  searchText: string = '';

  onFocus() {
    this.isActive = true;
  }

  onBlur() {
    if (this.searchText.length === 0) {
      this.isActive = false;
    }
  }
}
