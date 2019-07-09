import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {

  @Input() user: any;

  accountForm: FormGroup;

  constructor(private fb: FormBuilder, private formService: FormService) { }

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
