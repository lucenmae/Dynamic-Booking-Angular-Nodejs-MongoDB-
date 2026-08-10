import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

const ACCESS_TOKEN_KEY = 'dynamic-booking.access-token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  async signUp(payload: { name: string; email: string; password: string }) {
    const response = await firstValueFrom(
      this.http.post<{ token: string; user: { email: string; name: string; role: string } }>(
        'http://localhost:4000/api/auth/signup',
        payload,
      ),
    );

    if (response?.token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, response.token);
    }

    return response;
  }

  async signIn(payload: { email: string; password: string }) {
    const response = await firstValueFrom(
      this.http.post<{ token: string; user: { email: string; name: string; role: string } }>(
        'http://localhost:4000/api/auth/signin',
        payload,
      ),
    );

    if (response?.token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, response.token);
    }

    return response;
  }

  signOut() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['/sign-in']);
  }

  isAuthenticated() {
    return typeof localStorage !== 'undefined' && !!localStorage.getItem(ACCESS_TOKEN_KEY);
  }
}
