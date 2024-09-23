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
}
