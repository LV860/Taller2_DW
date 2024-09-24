import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-usuario-comment',
  templateUrl: './usuario-comment.component.html',
  styleUrls: ['./usuario-comment.component.css']
})
export class UsuarioCommentComponent {
  @Input() comentarios: Comment[] | null  = null;
}
