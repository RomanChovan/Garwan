import { DataService } from './../../service/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  items = [];
  page = 1;
  perPage = 5;
  lastPage;

  sortBy = 'repositories';
  sortDirection = true;

  sub: Subscription;

  constructor(private data: DataService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.sub = this.data.changes.subscribe(() => {
      this.onChange(null);
    });
    this.loadData();
  }

  loadData() {
    this.data.sortItems(this.sortBy, this.sortDirection);
    this.items = this.data.getItems(this.page, this.perPage);
    this.lastPage = this.data.getLastPage();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onChange(change) {
    switch(change) {
      case null: this.page = 1;break;
      case true: this.page++;break;
      case false: this.page--;break;
      default: break;
    }
    this.items = this.data.getItems(this.page, this.perPage);
    this.lastPage = this.data.getLastPage();
  }

  openDetail(user) {
    this.router.navigate(['/detail', user.id]);
  }

  sort(sortBy) {
    this.sortBy = sortBy;
    this.sortDirection = !this.sortDirection;

    this.data.sortItems(this.sortBy, this.sortDirection);
    this.onChange(null);
  }

}
