import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideCircleCheck, LucideLockKeyhole, LucideMail, LucideShieldCheck, LucideSparkles } from '@lucide/angular';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmInputImports } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-sign-in',
  imports: [
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
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {}
