import {Component} from '@angular/core';
import {LowerCasePipe, NgClass, NgForOf, NgOptimizedImage} from "@angular/common";
import {SliderComponent} from "../slider/slider.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    LowerCasePipe,
    NgForOf,
    NgOptimizedImage,
    SliderComponent,
    NgClass,
    TranslateModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  links = ['Home', 'Work', 'Contact', 'Gallery'];
  selectedLanguage: string = 'EN';
  isEnglish: boolean = true;

  constructor(public translateService: TranslateService) {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  getTranslatedLink(link: string): string {
    return this.translateService.instant(`navbar.${link}`);
  }


  toggleLanguage() {
    this.isEnglish = !this.isEnglish;
    const lang = this.isEnglish ? 'en' : 'al';
    this.translateService.use(lang);
    this.selectedLanguage = this.isEnglish ? 'EN' : 'AL';
  }

}
