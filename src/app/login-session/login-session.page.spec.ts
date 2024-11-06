import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginSessionPage } from './login-session.page';

describe('LoginSessionPage', () => {
  let component: LoginSessionPage;
  let fixture: ComponentFixture<LoginSessionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
