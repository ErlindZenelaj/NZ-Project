import {AfterViewInit, Component, ElementRef, Renderer2} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import 'swiper/swiper-bundle.css';
import {SliderComponent} from "../slider/slider.component";
import {ContactformComponent} from "../contactform/contactform.component";
import {FooterComponent} from "../footer/footer.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgOptimizedImage, SliderComponent, ContactformComponent, FooterComponent, NavbarComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent implements AfterViewInit {
  currentLayout: string = 'layout1';
  showFadeIn: boolean = true;
  private touched = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    const slider = this.elementRef.nativeElement.querySelector('.comparison-slider');
    const divider = this.elementRef.nativeElement.querySelector('.divider');
    const resize = this.elementRef.nativeElement.querySelector('.resize');

    this.initSlider(slider, divider, resize);
  }

  onMouseMove(event: MouseEvent, overlayId: string): void {
    if (window.innerWidth > 1023) {
      const overlay = document.getElementById(overlayId);
      if (overlay) {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.renderer.setStyle(overlay, 'left', `${x}px`);
        this.renderer.setStyle(overlay, 'top', `${y}px`);
        this.renderer.addClass(overlay, 'visible');
      }
    }
  }

  onMouseLeave(overlayId: string): void {
    if (window.innerWidth > 1023) {
      const overlay = document.getElementById(overlayId);
      if (overlay) {
        this.renderer.removeClass(overlay, 'visible');
      }
    }
  }

  setLayout(layout: string): void {
    if (this.currentLayout !== layout) {
      this.showFadeIn = false;
      this.currentLayout = layout;
      setTimeout(() => {
        this.showFadeIn = true;
      }, 10);
    }
  }

  scrollToContactForm(): void {
    const contactFormElement = document.getElementById('contact');
    if (contactFormElement) {
      window.scrollTo({
        top: contactFormElement.offsetTop,
        behavior: 'smooth'
      });
    } else {
      console.log('Contact form element not found.');
    }
  }

  private initSlider(slider: HTMLElement, divider: HTMLElement, resize: HTMLElement) {
    const onMove = (event: MouseEvent | TouchEvent) => {
      const containerOffset = slider.getBoundingClientRect().left;
      const containerWidth = slider.offsetWidth;
      const dragWidth = divider.offsetWidth;

      let moveX = this.getEventX(event);
      let leftValue = moveX - containerOffset - dragWidth / 2;

      if (leftValue < 0) leftValue = 0;
      if (leftValue > containerWidth - dragWidth) leftValue = containerWidth - dragWidth;

      const widthValue = ((leftValue + dragWidth / 2) * 100) / containerWidth + '%';

      divider.style.left = widthValue;
      resize.style.width = widthValue;
    };

    const startDragging = (event: MouseEvent | TouchEvent) => {
      this.touched = event.type === 'touchstart';
      document.body.classList.add('no-scroll');
      window.addEventListener(this.touched ? 'touchmove' : 'mousemove', onMove, { passive: true });
      window.addEventListener(this.touched ? 'touchend' : 'mouseup', stopDragging, { passive: true });
    };

    const stopDragging = () => {
      document.body.classList.remove('no-scroll');
      window.removeEventListener(this.touched ? 'touchmove' : 'mousemove', onMove);
      window.removeEventListener(this.touched ? 'touchend' : 'mouseup', stopDragging);
    };

    divider.addEventListener('mousedown', startDragging, { passive: true });
    divider.addEventListener('touchstart', startDragging, { passive: true });
  }


  private getEventX(event: MouseEvent | TouchEvent): number {
    if (event instanceof MouseEvent) {
      return event.pageX;
    } else {
      return event.touches[0].pageX;
    }
  }
}
