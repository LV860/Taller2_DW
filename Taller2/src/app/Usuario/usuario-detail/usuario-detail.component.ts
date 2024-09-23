import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.css'],
})
export class UsuarioDetailComponent {
  //RECIBIR DATOS DEL MAIN COMPONENT
  @Input() usuario: User | null = null;
}
