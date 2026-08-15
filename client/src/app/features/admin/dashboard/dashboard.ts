import { Component } from '@angular/core';
import { Sidebar } from '../../../shared/layout/sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Sidebar],
  templateUrl: './dashboard.html',
})
export class Dashboard {}
