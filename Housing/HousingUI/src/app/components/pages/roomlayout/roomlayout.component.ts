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
    this.types = ['Type 1', 'Type 2', 'Type 3', 'Type 5', 'Type 6', 'Type 7', 'Type 8', 'Type 9', 'Type 10'];
  }

}
