import {Component,OnInit} from '@angular/core';

@Component({
  selector: 'app-pic-roller',
  templateUrl: './pic-roller.component.html',
  styleUrls: ['./pic-roller.component.css']
})
export class PicRollerComponent implements OnInit {
  currentPic = 0;
  constructor() {
  setInterval(() => {
      const id = (this.currentPic + 1) % 5;
      this.currentPic = id;
    }, 3000);
  }
  changebanner(id: number) {
    console.log(id);
    this.currentPic = id;
  }

  ngOnInit() {
  }

}
