import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-project-section',
  templateUrl: './project-section.component.html',
  styleUrls: ['./project-section.component.css']
})
export class ProjectSectionComponent implements OnInit {

  @Input() name: string;
  imgPath: string;

  constructor(private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.imgPath = '../../../assets/img/' + this.name + '.png';
  }

  enter() {
    this.router.navigate(['/' + this.name.toLowerCase()]);
  }

}
