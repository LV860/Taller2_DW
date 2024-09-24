import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/models/Comment';

@Component({
  selector: 'app-usuario-comment',
  templateUrl: './usuario-comment.component.html',
  styleUrls: ['./usuario-comment.component.css'],
})
export class UsuarioCommentComponent {
  @Input() comentario: Comment | null = null; 
}
