export class Todo {
    id:number;
    title:string;
    completed:boolean;
  }

 
// import { Todo } from ... to use it in other component file
// import {Input} from angular/core to grab the passed in attribute from other html 
// @Input() attribute_name:type;
// [ngClass] to set the class attributes to a selector
// ng g s services/xx to generate services
// ng g c components/xx to generate component
// import { Observable } from 'rxjs'