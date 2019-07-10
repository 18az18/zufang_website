import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-account-header',
  templateUrl: './account-header.component.html',
  styleUrls: ['./account-header.component.css']
})
export class AccountHeaderComponent implements OnInit {

  @Input() user: any;

  constructor() { }

  ngOnInit() {
  }

}
