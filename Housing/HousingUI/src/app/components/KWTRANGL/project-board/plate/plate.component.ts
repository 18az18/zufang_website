import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.css']
})
export class PlateComponent implements OnInit {

  names: string[];

  constructor() { }

  ngOnInit() {
    this.names = ['K2', 'USTYLE', 'XXX'];
  }

}
