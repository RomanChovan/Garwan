import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  changes: EventEmitter<any> = new EventEmitter();

  private items = [];

  private users = [];

  private lastPage;

  constructor() { }

  setItems(items) {
    this.items = items;
    this.changes.emit();
  }

  getItems(page, perPage) {
    this.setLastPage(perPage);
    return this.items.slice((page - 1) * perPage, page * perPage);
  }

  sortItems(sortBy, sortDirection) {
    if (sortDirection) {
      this.items.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1);
    } else {
      this.items.sort((a, b) => (a[sortBy] < b[sortBy]) ? 1 : -1);
    }
  }

  getItem(id) {
    return this.users.filter(item => item.id === id)[0];
  }

  setUsers(users) {
    this.users = users;
  }

  getUsers() {
    return this.users;
  }

  setLastPage(perPage) {

    this.lastPage = this.items.length === 0 ? 1 : Math.ceil(this.items.length / perPage);
  }

  getLastPage() {
    return this.lastPage;
  }
}
