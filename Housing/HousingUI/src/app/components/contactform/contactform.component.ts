import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form/form.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})
export class ContactformComponent implements OnInit {
  contactForm: FormGroup;

  // name:string;
  // email:string;
  // message:string;

  constructor(private formService:FormService, private fb:FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      message: ['', Validators.required]
    })
  }

  // onSubmit() {
  //   this.formService.submitContactForm(this.contactForm.value.name, this.contactForm.value.email, this.contactForm.value.message).subscribe(res => );
  // }

  onSubmit() {
    console.log(this.contactForm.get('email').errors)
    this.contactForm.reset();
  }

}
