import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoomService } from 'src/app/services/room/room.service';

export interface Type {
  id: string;
  unitNumber: string;
}

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  @Input() type: string;
  unitNumbers: Type[];
  showDetail: boolean;
  @Output() selected = new EventEmitter<string>();


  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.roomService.getAllUnits(this.type).subscribe(res => {
      console.log('unit numbers are:' + res);
      console.log(res);
      this.unitNumbers = res.apartments;
      // this.unitNumbers = [
      //   {id: '1', unitNumber: '101'},
      //   {id: '2', unitNumber: '102'}];
    });
    this.showDetail = false;
  }

  onSelect(selected: string) {
    this.selected.emit(selected);
  }

  onClick() {
    this.showDetail = !this.showDetail;
  }

}
