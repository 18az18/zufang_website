import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  loginForm: FormGroup;
  errMessage: string;
  showError: boolean;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.showError = false;
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const username = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;
    this.userService.login(username, password).subscribe(res => {
      console.log(res);
      this.router.navigate(['']);
    }, error => {
      console.log(error.error.message);
      this.errMessage = error.error.message;
      this.showError = true;
    });
  }

  signup() {
    this.router.navigate(['/signup']);
  }

}
