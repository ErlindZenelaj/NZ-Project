import {Component} from '@angular/core';
import { JsonPipe, NgClass } from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactform',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    TranslateModule,
    JsonPipe
],
  templateUrl: './contactform.component.html',
  standalone: true,
  styleUrl: './contactform.component.scss'
})
export class ContactformComponent {
  contactForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private translate: TranslateService) {
    const emailPattern = /^[-!#$%&'*+/=?^_`{|}~A-Za-z0-9]+(?:\.[-!#$%&'*+/=?^_`{|}~A-Za-z0-9]+)*@([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9]/;
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailPattern), Validators.email]],
      message: ['', Validators.required]
    });
  }


  async onSubmit() {
    if (this.contactForm.valid) {
      this.isLoading = true;
      emailjs.init('thbSO3e4tg66ygkSE');

      try {
        const response = await emailjs.send("service_ye8us49", "template_lbipmq1", {
          name: this.contactForm.value.name,
          email: this.contactForm.value.email,
          message: this.contactForm.value.message,
        });

        Swal.fire({
          icon: 'success',
          title: this.translate.instant('contact.email_sent_title'),
          confirmButtonText: this.translate.instant('contact.confirm_button'),
        });
      } catch (error) {
      } finally {
        this.isLoading = false;
        this.contactForm.reset();
      }
    } else {
      this.contactForm.markAllAsTouched();
    }
  }


}
