import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCommentComponent } from './usuario-comment.component';

describe('UsuarioCommentComponent', () => {
  let component: UsuarioCommentComponent;
  let fixture: ComponentFixture<UsuarioCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioCommentComponent]
    });
    fixture = TestBed.createComponent(UsuarioCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
