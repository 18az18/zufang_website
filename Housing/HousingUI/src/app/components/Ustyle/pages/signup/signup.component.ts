import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  showMessage: boolean;
  errMessage: string;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.showMessage = false;
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required]
    });
    }

  onSubmit() {
    const username = this.signupForm.get('userName').value;
    const password = this.signupForm.get('password').value;
    const email = this.signupForm.get('email').value;
    const phoneNumber = this.signupForm.get('phoneNumber').value;
    console.log('Signning up with username:' + username + '/' + 'password:' + password +  '/' + 'email:' + email);
    console.log('Phone number: ' + phoneNumber);
    this.userService.signup(username, password, email, phoneNumber).subscribe(res => {
      console.log(res);
      this.signupForm.reset();
    }, err => {
      console.log(err);
      console.log(err.error.message);
      this.errMessage = err.error.message;
      this.showMessage = true;
    });
  }

  signin() {
    this.router.navigate(['/ustyle/login']);
  }
}
