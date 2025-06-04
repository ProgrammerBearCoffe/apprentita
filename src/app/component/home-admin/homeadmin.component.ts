import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homeadmin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <div class="header">
        <h1>Bienvenido Administrador {{currentUser?.nombre}}</h1>
        <p>Panel de administración del sistema</p>
      </div>

      <div class="admin-features">
        <div class="feature-card" (click)="navigateTo('vehiculos')">
          <h3>Gestión de Vehículos</h3>
          <p>Administra el inventario de vehículos</p>
        </div>
        
        <div class="feature-card" (click)="navigateTo('conductores')">
          <h3>Gestión de Conductores</h3>
          <p>Administra los conductores del sistema</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1000px;
      margin: 2rem auto;
      padding: 2rem;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .header {
      text-align: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eee;
    }

    .header h1 {
      color: #dc3545;
      margin-bottom: 0.5rem;
    }

    .header p {
      color: #6c757d;
      font-size: 1.1rem;
    }

    .admin-features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .feature-card {
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      border-left: 4px solid #dc3545;
    }

    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      background: #fff;
    }

    .feature-card h3 {
      color: #343a40;
      margin-top: 0;
      margin-bottom: 0.5rem;
    }

    .feature-card p {
      color: #6c757d;
      margin: 0;
    }

    @media (max-width: 768px) {
      .admin-features {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeAdminComponent {
  currentUser: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser = this.authService.getCurrentUser();
    
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/home']);
    }
  }

  navigateTo(route: string) {
    if (route === 'vehiculos') {
      this.router.navigate(['/vehiculos']);
    } else if (route === 'conductores') {
      this.router.navigate(['/conductores']);
    }
  }
}