import { Component, ElementRef, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Todo } from '../models/todo-model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  placeholderTodo: string = 'Please, write new task...';

  newTodo: Todo;
  todo: string;
  todos: Todo[] = [];
  notVisible: boolean = true;
  selectedItem: Todo;
  isImportant: boolean;
  i: number;

  constructor() { }

  ngOnInit(): void {
    this.getItemes();
  }

  getItemes() {
    if (localStorage.getItem('items')) {
      this.todos = JSON.parse(localStorage.getItem('items'));
    }
  }

  createTodo() {
    this.newTodo = new Todo(this.todo);
    this.todos.unshift(this.newTodo);
    this.todo = '';
    localStorage.setItem('items', JSON.stringify(this.todos));
  }

  checkChange(event, item) {
    if (event.target.checked) {
      this.newTodo = item;
      this.newTodo.checked = true;
    } else if (!event.target.checked) {
      this.newTodo = item;
      this.newTodo.checked = false;
    }
    localStorage.setItem('items', JSON.stringify(this.todos));
  }

  makeImportant(item, imp) {
    if (imp == false) {
      this.newTodo = item;
      this.newTodo.important = true;
    } else if (imp == true) {
      this.newTodo = item;
      this.newTodo.important = false;
    }
    localStorage.setItem('items', JSON.stringify(this.todos));
  }

  showModal(event) {
    this.i = event.target.parentElement.id;
    this.notVisible = false;
  }

  closeModal() {
    this.notVisible = true;
  }

  delTodo() {
    this.todos.splice(this.i, 1);
    localStorage.setItem('items', JSON.stringify(this.todos));
    this.closeModal();
  }
}
