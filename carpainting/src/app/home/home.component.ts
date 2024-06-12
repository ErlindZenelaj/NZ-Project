import {Component, OnInit, Renderer2} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import 'swiper/swiper-bundle.css';
import {SliderComponent} from "../slider/slider.component";
import {ContactformComponent} from "../contactform/contactform.component";
import {FooterComponent} from "../footer/footer.component";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgOptimizedImage, SliderComponent, ContactformComponent, FooterComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})
export class HomeComponent  {
  currentLayout: string = 'layout1';


  constructor(private renderer: Renderer2) {}


  slides = [
    { before: 'assets/images/slide-images/slide-img1.jpg', after: 'assets/images/slide-images/slide-img2.jpg' },
    { before: 'assets/images/slide-images/slide-img3.jpg', after: 'assets/images/slide-images/slide-img3.jpg' },
  ];

  position: number = 50;

  onSliderInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.position = inputElement.valueAsNumber;
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
    this.currentLayout = layout;
  }

  ngOnInit(): void {
  }

  sliderValue: number = 50;

}
