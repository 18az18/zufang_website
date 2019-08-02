import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room/room.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  types: string[];
  selected: boolean;
  adminForm: FormGroup;
  rentStatus: string;
  selectedRoom: string;
  showMsg: boolean;
  message: string;

  constructor(private roomService: RoomService, private fb: FormBuilder, private adminSerivce: AdminService) { }

  ngOnInit() {
    this.selectedRoom = null;
    this.showMsg = false;
    this.rentStatus = '';
    this.adminForm = this.fb.group({
      rent: [this.rentStatus, Validators.required]
    });

    this.roomService.getAvailableTypes().subscribe(res => {
      this.types = res;
    });

    this.selected = false;
  }

  onSelect(selected: string) {
    console.log('in admin page' + selected);
    if (selected) {
      // call api to get the corresponding room's status
      this.selectedRoom = selected;
      this.selected = true;
    } else {
      this.selected = false;
    }
  }

  onSubmit() {
    // submit admin form through api request
    const rentedBy = this.adminForm.get('rent').value === 'rented' ? true : false;
    this.adminSerivce.updateRentStatus(this.selectedRoom, rentedBy).subscribe(res => {

    });
    return;
  }

}
