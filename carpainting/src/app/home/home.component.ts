import {Component, OnInit, Renderer2} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import 'swiper/swiper-bundle.css';
import {SliderComponent} from "../slider/slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOptimizedImage, SliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  activeLanguage: string = 'en';
  links = ['Home', 'Details', 'Info', 'Contact'];

  constructor(private renderer: Renderer2) {
  }

  setActiveLanguage(language: string) {
    this.activeLanguage = language;
  }

  ngOnInit(): void {
  }

  sliderValue: number = 50;

}
