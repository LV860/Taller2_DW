import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { UsuarioDetailComponent } from './Usuario/usuario-detail/usuario-detail.component';
import { UsuarioPostsComponent } from './Usuario/usuario-posts/usuario-posts.component';
import { UsuarioCommentComponent } from './Usuario/usuario-comment/usuario-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioDetailComponent,
    UsuarioPostsComponent,
    UsuarioCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //Realizar peticiones http
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
