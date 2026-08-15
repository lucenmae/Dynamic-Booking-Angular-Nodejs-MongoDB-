import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  // Signal to track sidebar visibility on mobile/desktop
  isOpen = signal(false);

  // Toggle sidebar visibility
  toggleSidebar() {
    this.isOpen.update((open) => !open);
  }

  // Close sidebar (useful for mobile when navigating)
  closeSidebar() {
    this.isOpen.set(false);
  }
}
