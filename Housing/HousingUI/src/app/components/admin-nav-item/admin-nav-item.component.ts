import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-nav-item',
  templateUrl: './admin-nav-item.component.html',
  styleUrls: ['./admin-nav-item.component.css']
})
export class AdminNavItemComponent implements OnInit {

  @Input() unitNumber: string;
  @Output() selected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.selected.emit(this.unitNumber);
  }

}
