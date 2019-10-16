import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-s-announcement',
  templateUrl: './s-announcement.component.html',
  styleUrls: ['./s-announcement.component.css']
})
export class SAnnouncementComponent implements OnInit {

  @Input() announcement: any;

  constructor() { }

  ngOnInit() {
  }

}
