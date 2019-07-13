import { Component, OnInit, Input } from '@angular/core';
import { RoomService } from 'src/app/services/room/room.service';

@Component({
  selector: 'app-room-display',
  templateUrl: './room-display.component.html',
  styleUrls: ['./room-display.component.css']
})
export class RoomDisplayComponent implements OnInit {
  @Input() type: any;
  imgPath: string;
  availableUnits = [
    {id: 1, unitNumber: '502'}
  ];

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.imgPath = '../../../assets/img/' + this.type + '.png';
    this.roomService.getAvailableUnits(this.type).subscribe(res => {
      // this.availableUnits = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
