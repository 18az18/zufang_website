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

  constructor(private roomService: RoomService, private fb: FormBuilder, private adminSerivce: AdminService) { }

  ngOnInit() {

    this.adminForm = this.fb.group({
      rent: ['rented', Validators.required]
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
      this.selected = true;
    } else {
      this.selected = false;
    }
  }

  onSubmit() {
    // submit admin form through api request
    return;
  }

}
