import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form/form.service';
import { UserService } from 'src/app/services/user/user.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {

  @Input() user: any;

  accountForm: FormGroup;

  userMsg: string;

  showMsg: boolean;

  constructor(private fb: FormBuilder, private formService: FormService, private userService: UserService) { }

  ngOnInit() {
    this.accountForm = this.fb.group({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      email: [this.user.email],
      phone: [this.user.phoneNumber]
    });
    this.showMsg = false;
  }

  onSubmit() {
    console.log(this.user);
    const firstName = this.accountForm.get('firstName').value;
    const lastName = this.accountForm.get('lastName').value;
    const email = this.accountForm.get('email').value;
    const phoneNumber = this.accountForm.get('phone').value;
    this.userService.updateUserProfile(firstName, lastName, email, null, phoneNumber, null, this.user.id).subscribe(res => {
      this.showMsg = true;
      this.userMsg = 'You have successfully updated your profile info';
    });
  }

}
