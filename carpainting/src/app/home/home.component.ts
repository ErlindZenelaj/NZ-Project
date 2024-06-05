import {Component, OnInit, Renderer2} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import 'swiper/swiper-bundle.css';
import {SliderComponent} from "../slider/slider.component";
import {ContactformComponent} from "../contactform/contactform.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgOptimizedImage, SliderComponent, ContactformComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent  {
  activeLanguage: string = 'en';
  links = ['Home', 'Details', 'Info', 'Contact'];


  setActiveLanguage(language: string) {
    this.activeLanguage = language;
  }

  ngOnInit(): void {
  }

  sliderValue: number = 50;

}
