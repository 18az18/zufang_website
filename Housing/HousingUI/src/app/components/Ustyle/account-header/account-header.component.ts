import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-account-header',
  templateUrl: './account-header.component.html',
  styleUrls: ['./account-header.component.css']
})
export class AccountHeaderComponent implements OnInit {

  @Input() user: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
