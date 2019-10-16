import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from 'src/app/services/announcement/announcement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcement-section',
  templateUrl: './announcement-section.component.html',
  styleUrls: ['./announcement-section.component.css']
})
export class AnnouncementSectionComponent implements OnInit {

  announcements: {title: string, context: string}[];

  constructor(private announcementService: AnnouncementService, private router: Router) { }

  ngOnInit() {
    // this.announcementService.getAnnouncements('0', '5').subscribe(res => {
    //   console.log('getting announcements', res);
    //   this.announcements = res;
    // }, error => {
    //   console.log('getting annoucnement error', error);
    // });
    this.announcements = [
      {title: '1', context: 'a1'},
      {title: '2', context: 'a2'}
    ];
  }

  readMore() {
    this.router.navigate(['/announcement']);
  }

}
