import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

const ACCESS_TOKEN_KEY = 'dynamic-booking.access-token';
const USER_KEY = 'dynamic-booking.user';

export interface AuthUser {
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly baseUrl = `${environment.apiUrl}/auth`;
  private readonly browser = typeof localStorage !== 'undefined';

  private readonly currentUserSignal = signal<AuthUser | null>(this.readStoredUser());
  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.currentUserSignal());

  async signUp(payload: SignUpPayload): Promise<AuthResponse> {
    return this.authenticate('signup', payload);
  }

  async signIn(payload: SignInPayload): Promise<AuthResponse> {
    return this.authenticate('signin', payload);
  }

  signOut(): void {
    if (this.browser) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    this.currentUserSignal.set(null);
    this.router.navigate(['/sign-in']);
  }

  getToken(): string | null {
    return this.browser ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;
  }

  getCurrentUser(): AuthUser | null {
    return this.readStoredUser();
  }

  private async authenticate(
    endpoint: 'signup' | 'signin',
    payload: SignUpPayload | SignInPayload,
  ): Promise<AuthResponse> {
    const response = await firstValueFrom(
      this.http.post<AuthResponse>(`${this.baseUrl}/${endpoint}`, payload).pipe(
        catchError((error: HttpErrorResponse) => {
          const message =
            error.error?.message ?? error.error?.error ?? 'Something went wrong. Please try again.';
          return throwError(() => new Error(message));
        }),
      ),
    );

    if (response?.token) {
      this.persistSession(response);
    }

    return response;
  }

  private persistSession(response: AuthResponse): void {
    if (this.browser) {
      localStorage.setItem(ACCESS_TOKEN_KEY, response.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    }
    this.currentUserSignal.set(response.user);
  }

  private readStoredUser(): AuthUser | null {
    if (!this.browser) return null;
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }
}
