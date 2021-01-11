import { DataService } from './service/data.service';
import { CommunicationService } from './service/communication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  init = false;

  constructor(private service: CommunicationService, private data: DataService) {
  }

  ngOnInit(): void {
    this.prepareData()
    this.init = true;
  }

  prepareData() {
    const names = ['Jozef', 'Peter', 'Ivan', 'Lubo', 'Roman', 'Tester', 'Sisa'];
    const second = ['Mrkva', 'Zeler', 'Zemiak', 'Cibulka', 'Fester', 'Patizon'];
    const myUsers = [];
    for (let i of Array(23).keys()) {
      const user = {} as User;
      user.followers = Math.floor(Math.random() * 19);
      user.repositories = Math.floor(Math.random() * 50)
      user.createDate = new Date( Math.floor(Math.random() * (1609693651124 - 1209693651124) + 1209693651124) )
      user.name = names[Math.floor(Math.random() * 7)] + ' ' + second[Math.floor(Math.random() * 6)];
      user.id = i + '';
      myUsers.push(user);
    }
    this.data.setUsers(myUsers);
  }
}

export class User {
  followers: number;
  repositories: number;
  createDate: Date;
  name: string;
  id: string;
}
