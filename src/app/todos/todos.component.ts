import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { NgIf } from '@angular/common';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos.pipe';

@Component({
  selector: 'app-todos',
  imports: [TodoItemComponent, FormsModule,FilterTodosPipe],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
  todoservice = inject(TodosService);
  todoItems= signal<Array<Todo>>([]);
  searchTerm = signal<string>('');

  ngOnInit(): void {
    this.todoservice.getTodosFromApi().pipe(
      catchError((err)=>{
        console.error(err);
        throw err;
      })).subscribe((todos)=>{
        this.todoItems.set(todos);
      })
  }

  updateTodoItem(todoItems: Todo){
    this.todoItems.update((todos)=>{
      return todos.map(todo =>{
        if(todo.id === todoItems.id){
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      })
    })
  }

}
