import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-reservationform',
  templateUrl: './reservationform.component.html',
  styleUrls: ['./reservationform.component.css']
})
export class ReservationformComponent implements OnInit {

  reservationForm:FormGroup;
  floors = [];
  rooms = [];

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.reservationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      floors: [null, Validators.required],
      rooms: [null, Validators.required],
      message: ['']
    })
  
    this.getFloor();
    this.getRoom();
    
  }

  getFloor() {
    this.floors = 
    [{ id: '1', name: 'floor 1' },
      { id: '2', name: 'floor 2' },
      { id: '3', name: 'floor 3' },
      { id: '4', name: 'floor 4' }];
  }

  getRoom() {
    this.rooms = 
    [{ id: '1', name: 'Unit 1' },
      { id: '2', name: 'Unit 2' },
      { id: '3', name: 'Unit 3' },
      { id: '4', name: 'Unit 4' }];
  }


  onSubmit() {
    console.log(this.reservationForm);
  }
}
