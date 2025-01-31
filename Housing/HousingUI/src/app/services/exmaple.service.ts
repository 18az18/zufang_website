import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExmapleService {
  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http:HttpClient) { }

  getTodos():Observable<Todo[]> {
      return this.http.get<Todo[]>(this.todosUrl)
      // this.todoService.getTodos().subscribe(todos=>{}
      //
      //this.todos=todos})
      //
  }
}
