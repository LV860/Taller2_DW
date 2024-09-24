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
  usuarioBuscado: boolean = false;

  constructor(private http: HttpClient) {}

  // Variables
  usuario: User | null = null;
  publicaciones: Post[] = []; // Arreglo de publicaciones
  comentarios: { [postId: number]: Comment[] } = {}; // Diccionario de comentarios por publicación

  searchUser() {
    this.http
      .get<{ users: User[] }>(`${this.ROOT_URL}/users/filter?key=username&value=${this.txtUser}`)
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

  getComments(postId: number) {
    this.http
      .get<{ comments: Comment[] }>(`${this.ROOT_URL}/posts/${postId}/comments`)
      .subscribe({
        next: (commentInfo) => {
          this.comentarios[postId] = commentInfo.comments; // Asignar comentarios al postId
        },
        error: (err) => {
          console.error('Error al obtener comentarios:', err);
        },
      });
  }

  getUserPostComments() {
    this.http
      .get<{ users: User[] }>(`${this.ROOT_URL}/users/filter?key=username&value=${this.txtUser}`)
      .pipe(
        mergeMap((userInfo: any) => {
          if (userInfo.users.length > 0) {
            this.usuario = userInfo.users[0];
            return this.http.get<{ posts: Post[] }>(
              `${this.ROOT_URL}/posts/user/` + this.usuario!.id
            );
          } else {
            this.usuario = null;
            return of([]);
          }
        })
      )
      .subscribe({
        next: (postInfo: any) => {
          this.publicaciones = postInfo.posts;
          // Obtener comentarios para cada post automáticamente
          this.publicaciones.forEach(post => {
            this.getComments(post.id);
          });
        },
        error: (err) => {
          console.error('Error fetching posts:', err);
        },
      });
  }
}
