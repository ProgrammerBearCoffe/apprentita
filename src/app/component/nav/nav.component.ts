import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="navbar-logo">
        <img src="iconoCarro.jpg" class="logo-img" alt="Logo">
      </div>
      
      <div class="navbar-menu">
        <ul>
          <li><a routerLink="/lo-nuevo">Lo nuevo</a></li>
          <li><a routerLink="/hombre">Hombre</a></li>
          <li><a routerLink="/mujer">Mujer</a></li>
          <li><a routerLink="/nino">Niño/a</a></li>
          <li><a routerLink="/ofertas">Ofertas</a></li>
          <li><a routerLink="/snkrs">SNKRS</a></li>
        </ul>
      </div>

      <div class="navbar-user">
        <a href="#">Buscar tienda</a>
        <a href="#">Ayuda</a>
        <ng-container *ngIf="!isLoggedIn; else userLoggedIn">
          <a routerLink="/register">Únete</a>
          <a routerLink="/login">Iniciar sesión</a>
        </ng-container>
        <ng-template #userLoggedIn>
          <a (click)="logout()">Cerrar sesión</a>
          <span class="user-name">{{currentUser?.nombre}}</span>
        </ng-template>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .navbar-logo img {
      height: 40px;
      width: auto;
    }
    .navbar-menu ul {
      display: flex;
      list-style: none;
      gap: 1.5rem;
      margin: 0;
      padding: 0;
    }
    .navbar-menu a {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.3s;
    }
    .navbar-menu a:hover {
      color: #007bff;
    }
    .navbar-user {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .navbar-user a {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      cursor: pointer;
      transition: color 0.3s;
    }
    .navbar-user a:hover {
      color: #007bff;
    }
    .user-name {
      margin-left: 0.5rem;
      font-weight: 500;
      color: #007bff;
    }
  `]
})
export class NavComponent {
  isLoggedIn = false;
  currentUser: any;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.currentUser = this.authService.getCurrentUser();
    }
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.currentUser = null;
  }
}