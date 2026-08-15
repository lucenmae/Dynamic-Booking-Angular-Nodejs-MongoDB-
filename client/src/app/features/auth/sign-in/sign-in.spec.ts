import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { SignIn } from './sign-in';

describe('SignIn', () => {
  let component: SignIn;
  let fixture: ComponentFixture<SignIn>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['signIn']);
    authService.signIn.and.resolveTo({
      token: 'token-123',
      user: { email: 'admin@example.com', name: 'Admin User', role: 'super-admin' },
    });

    await TestBed.configureTestingModule({
      imports: [SignIn],
      providers: [{ provide: AuthService, useValue: authService }, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SignIn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sign in the user when the form is submitted', async () => {
    component.email = 'admin@example.com';
    component.password = 'Admin123!';

    await component.onSubmit();

    expect(authService.signIn).toHaveBeenCalledWith({
      email: 'admin@example.com',
      password: 'Admin123!',
    });
  });
});
