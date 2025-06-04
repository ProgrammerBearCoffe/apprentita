import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './component/nav/nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, CommonModule],
  template: `
    <app-nav *ngIf="showNav"></app-nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class AppComponent {
  title = 'AppRentita';
  showNav = true; // Muestra el nav en todas las páginas
}