import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient) { }

  initGithub() {
    return this.http.get('https://api.github.com/search/users?q=location:bratislava&per_page=23');
    // return this.http.get('https://api.github.com/users?location=bratislava&sort=created&order=asc&per_page=50');
    // return this.http.get('/github/search?q=location:bratislava&type=Users');

    // sort by:
    // followers
    // repositories - default
    // account created date

    // default je desc
  }

}
