import { Component } from '@angular/core';
import {LowerCasePipe, NgClass, NgForOf, NgOptimizedImage} from "@angular/common";
import {SliderComponent} from "../slider/slider.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    LowerCasePipe,
    NgForOf,
    NgOptimizedImage,
    SliderComponent,
    NgClass
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  activeLanguage: string = 'en';

  links = ['Home', 'Details', 'Info', 'Contact'];


  setActiveLanguage(language: string) {
    this.activeLanguage = language;
  }


}
