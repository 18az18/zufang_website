import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room/room.service';

@Component({
  selector: 'app-roomlayout',
  templateUrl: './roomlayout.component.html',
  styleUrls: ['./roomlayout.component.css']
})
export class RoomlayoutComponent implements OnInit {

  types: string[];

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.roomService.getAvailableTypes().subscribe(res => {
      this.types = res;
    });
  }

}
