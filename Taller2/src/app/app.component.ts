import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  ROOT_URL = 'https://dummyjson.com';

  title = 'Taller2';

  txtUser: string = '';

  constructor(private http: HttpClient) {}

  //Variable
  usuario: User | null = null;

  searchUser() {
    this.http
      .get<{ users: User[] }>(`${this.ROOT_URL}/users/search?q=${this.txtUser}`)
      .subscribe({
        next: (userInfo) => {
          if (userInfo.users.length > 0) {
            this.usuario = userInfo.users[0];
          } else {
            this.usuario = null;
          }
        },
      });
  }
}
