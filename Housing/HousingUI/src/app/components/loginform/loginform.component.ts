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

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const username = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;
    console.log('logging in with username: ' + username);
    console.log('and password: ' + password);
    this.userService.login(username, password).subscribe(res => {
      console.log(res);
      this.router.navigate(['']);
    }, error => {
      console.log(error.error.message);
    });
  }

  signup() {
    this.router.navigate(['/signup']);
  }

}
