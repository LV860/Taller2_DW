import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-usuario-posts',
  templateUrl: './usuario-posts.component.html',
  styleUrls: ['./usuario-posts.component.css'],
})
export class UsuarioPostsComponent {
  //RECIBIR DATOS DEL MAIN COMPONENT
  @Input() publicacion: Post | null = null;

  comentarios: Comment[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.publicacion) {
      this.http
        .get<{ comments: Comment[] }>(
          `https://dummyjson.com/comments/post/${this.publicacion.id}`
        )
        .subscribe((response) => {
          this.comentarios = response.comments;
        });
    }
  }
}
