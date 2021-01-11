import { DataService } from './../service/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  user: any;
  sub: Subscription;

  constructor(private router: Router, private data: DataService) {
    this.router.events.subscribe((change: any) => {
      if (change instanceof NavigationEnd && change.url) {
        if (change.url.includes('detail')) {
          const id = change.url.slice(-2).includes('/') ? change.url.slice(-1) : change.url.slice(-2);
          this.user = this.data.getItem(id);
          const followers = [];
          const users = Object.assign([], this.data.getUsers());
          for (let i of Array(this.user.followers)) {
            followers.push(users.splice(Math.floor(Math.random() * users.length), 1)[0]);
          }
          this.data.setItems(followers);
        } else {
          this.user = null;
          this.data.setItems(this.data.getUsers());
        }
      }
    });
   }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
  }

}
