import { Component } from '@angular/core';
import { HlmBadgeImports } from '../../../../libs/ui/badge/src';
import { HlmButtonImports } from '../../../../libs/ui/button/src';
import { HlmCardImports } from '../../../../libs/ui/card/src';
import { HlmInputImports } from '../../../../libs/ui/input/src';

@Component({
  selector: 'app-landing',
  imports: [...HlmButtonImports, ...HlmCardImports, ...HlmInputImports, ...HlmBadgeImports],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {}
