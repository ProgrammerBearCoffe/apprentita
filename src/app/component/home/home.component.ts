import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <h1>Bienvenido {{currentUser?.nombre}}</h1>
      <p>Esta es tu página principal</p>

      <div class="button-group">
        <button (click)="goToRentas()">Registrar Renta</button>
        <button (click)="goToRentados()">Vehículos Rentados</button>
        <button (click)="goToDisponibilidad()">Disponibilidad</button>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .button-group {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
      flex-wrap: wrap;
    }
    
    button {
      padding: 0.75rem 1.5rem;
      background-color: #2c3e50;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s;
      flex: 1;
      min-width: 200px;
    }
    
    button:hover {
      background-color: #1a252f;
      transform: translateY(-2px);
    }
  `]
})
export class HomeComponent {
  currentUser: any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getCurrentUser();
    
    // Si el usuario es admin, redirigir a homeadmin
    if (this.authService.isAdmin()) {
      this.router.navigate(['/homeadmin']);
    }
  }

  goToRentas() {
    this.router.navigate(['/rentas']);
  }

  goToRentados() {
    this.router.navigate(['/rentados']);
  }

  goToDisponibilidad() {
    this.router.navigate(['/disponibilidad']);
  }
}