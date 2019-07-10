import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private userService: UserService) { }

  user: any;

  ngOnInit() {
    this.userService.userUpdated.pipe(take(1)).subscribe(res => {
      console.log(res);
      this.user = res;
    });
  }

}
