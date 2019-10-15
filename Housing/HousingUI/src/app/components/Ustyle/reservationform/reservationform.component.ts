import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { FormService } from 'src/app/services/form/form.service';


@Component({
  selector: 'app-reservationform',
  templateUrl: './reservationform.component.html',
  styleUrls: ['./reservationform.component.css']
})
export class ReservationformComponent implements OnInit {

  reservationForm: FormGroup;
  hasFloorOption: boolean;
  floors = [];
  rooms = [];
  types = [];

  constructor(private fb: FormBuilder, private formService: FormService) { }

  ngOnInit() {

    this.reservationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      types: [null, Validators.required],
      floors: [null, Validators.required],
      rooms: [null, Validators.required],
      message: ['']
    });

    this.getType();
    this.onTypeChanges();
    this.onFloorChanges();
  }

  getType() {
    this.types = [
      { id: '1', name: 'type 1'},
      { id: '2', name: 'type 2'},
      { id: '3', name: 'type 3'}
    ];
    // this.formService.getApartmentTypes().subscribe(res => {
    //   this.types = res;
    // }, err => {
    //   console.log('Failed to retrieve data from server');
    // });
  }

  updateRoomList(floorNum: number) {
    console.log(floorNum);
    this.rooms =
    [{ id: '1', name: 'Unit 1' },
      { id: '2', name: 'Unit 2' },
      { id: '3', name: 'Unit 3' },
      { id: '4', name: 'Unit 4' }];
  }

  updateFloorList(type: string) {
    console.log(type);
    this.floors =
    [{ id: '1', name: 'floor 1' },
      { id: '2', name: 'floor 2' },
      { id: '3', name: 'floor 3' },
      { id: '4', name: 'floor 4' }];
    console.log(this.floors.length);
    // this.formService.getAvailableFloors(type).subscribe(res => {
    //   this.floors = res;
    // }, err => {
    //   console.log('Failed to retrieve data from server');
    // });
    this.hasFloorOption = (this.floors.length === 0) ? false : true;


  }


  onSubmit() {
    console.log(this.reservationForm);
  }

  onFloorChanges(): void {
    this.reservationForm.get('floors').valueChanges.subscribe((val) => {
      console.log(val);
      if (val !== null) {
        this.updateRoomList(val);
      }
    });
  }

  onTypeChanges(): void {
    this.reservationForm.get('types').valueChanges.subscribe((val) => {
      console.log(val);
      if (val !== null) {
        this.updateFloorList(val);
      }
    });
  }
}
