import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  LucideArrowRight,
  LucideCircleCheck,
  LucideLockKeyhole,
  LucideMail,
  LucideShieldCheck,
  LucideSparkles,
  LucideUserRound,
} from '@lucide/angular';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ...HlmButtonImports,
    ...HlmCardImports,
    ...HlmCheckboxImports,
    ...HlmInputImports,
    LucideArrowRight,
    LucideCircleCheck,
    LucideLockKeyhole,
    LucideMail,
    LucideShieldCheck,
    LucideSparkles,
    LucideUserRound,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';
  isSubmitting = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  async onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    const fullName = `${this.firstName} ${this.lastName}`.trim();

    if (!fullName || !this.email.trim() || !this.password) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isSubmitting = true;

    try {
      const response = await this.authService.signUp({
        name: fullName,
        email: this.email.trim(),
        password: this.password,
      });

      this.successMessage = response?.user ? 'Account created successfully.' : 'Account created.';
      this.router.navigate(['/app']);
    } catch (error: any) {
      this.errorMessage = error?.message || 'Unable to create account right now.';
    } finally {
      this.isSubmitting = false;
    }
  }
}
