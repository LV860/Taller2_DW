import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { mergeMap, of } from 'rxjs';
import { Post } from './models/Post';
import { User } from './models/User';
import { Comment } from './models/Comment';

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
  publicacion: Post | null = null;
  comentario: Comment | null = null;

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

  getPost(id: Number) {
    this.http
      .get<{ posts: Post[] }>(`${this.ROOT_URL}/posts/user/${this.txtUser}`)
      .subscribe({
        next: (postInfo) => {
          if (postInfo.posts.length > 0) {
            this.publicacion = postInfo.posts[0];
          } else {
            this.usuario = null;
          }
        },
      });
  }

  getComments(postId: number) {
    this.http
      .get<{ comments: Comment[] }>(`${this.ROOT_URL}/posts/${postId}/comments`)
      .subscribe({
        next: (commentInfo) => {
          this.comentario = commentInfo.comments[0];
        },
        error: (err) => {
          console.error('Error al obtener comentarios:', err);
        },
      });
  }

  //ESTE ES EL QUE BUSCA A AMBOS EN ESTE MOMENTO
  getUserAndPost() {
    this.http
      .get<{ users: User[] }>(`${this.ROOT_URL}/users/search?q=` + this.txtUser)
      .pipe(
        mergeMap((userInfo: any) => {
          if (userInfo.users.length > 0) {
            this.usuario = userInfo.users[0];
            return this.http.get<{ posts: Post[] }>(
              `${this.ROOT_URL}/posts/user/` + this.usuario!.id
            );
          } else {
            this.usuario = null;
            return of(0);
          }
        })
      )
      .subscribe({
        next: (postInfo: any) => {
          this.publicacion = postInfo.posts[0];
        },
      });
  }

  getUserPostComments() {
    this.http
      .get<{ users: User[] }>(`${this.ROOT_URL}/users/search?q=` + this.txtUser)
      .pipe(
        mergeMap((userInfo: any) => {
          if (userInfo.users.length > 0) {
            this.usuario = userInfo.users[0];
            return this.http.get<{ posts: Post[] }>(
              `${this.ROOT_URL}/posts/user/` + this.usuario!.id
            );
          } else {
            this.usuario = null;
            return of(null);
          }
        }),
        mergeMap((postInfo: any) => {
          if (postInfo && postInfo.posts.length > 0) {
            this.publicacion = postInfo.posts[0];
            return this.http.get<{ comments: Comment[] }>(
              `${this.ROOT_URL}/posts/${this.publicacion!.id}/comments`
            );
          } else {
            this.publicacion = null;
            return of(null);
          }
        })
      )
      .subscribe({
        next: (commentInfo: any) => {
          if (commentInfo && commentInfo.comments.length > 0) {
            this.comentario = commentInfo.comments[0];
          } else {
            this.comentario = null;
          }
        },
        error: (err) => {
          console.error('Error fetching data:', err);
        },
      });
  }
}
