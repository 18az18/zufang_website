import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})
export class ContactformComponent implements OnInit {
  contactForm: FormGroup;

  // name:string;
  // email:string;
  // message:string;

  constructor(private fb: FormBuilder, private formService: FormService) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      message: ['', Validators.required]
    });
  }

  // onSubmit() {
  //   this.formService.submitContactForm(this.contactForm.value.name, this.contactForm.value.email, this.contactForm.value.message).subscribe(res => );
  // }

  onSubmit() {
    const name = this.contactForm.get('name').value;
    const email = this.contactForm.get('email').value;
    const text = this.contactForm.get('message').value;
    console.log('Sending contact form with name: ' + name);
    console.log('Sending contact form with email: ' + email);
    console.log('Sending contact form with text: ' + text);
    this.contactForm.reset();
    this.formService.submitContactForm(name, email, text).subscribe(res => {
      console.log('success sending contact form ' + res);
    }, err => {
      console.log(err);
    });
  }

}
