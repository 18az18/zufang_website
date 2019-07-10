import {Component,OnInit} from "@angular/core";

@Component({
	selector: 'pic-roller',
	templateUrl: './pic-roller.component.html',
  	styleUrls: ['./pic-roller.component.css']
})
export class TestComponent implements OnInit {
	currentPic = 0;
	constructor() {
	setInterval(() => {
        let id = (this.currentPic + 1) % 3;
            this.currentPic = id;},3000);
    }

    changebanner(id) {
        console.log(id)
        this.currentPic = id;
    }
    ngOnInit() { }
}