import { DataService } from './../../service/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  user: any;
  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private data: DataService) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.user = this.data.getItem(params.id);
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
