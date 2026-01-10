import {Component} from '@angular/core';
import {NgOptimizedImage } from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-navbar',
  imports: [
    NgOptimizedImage,
    TranslateModule,
    FormsModule,
],
  templateUrl: './navbar.component.html',
  standalone: true,
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
