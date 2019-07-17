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

  constructor(private fb: FormBuilder, private formService: FormService, private userService: UserService) { }

  ngOnInit() {
    this.accountForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: ['']
    });

  }

  onSubmit() {

  }

}
