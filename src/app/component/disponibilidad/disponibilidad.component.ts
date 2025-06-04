import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disponibilidad',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="main">
      <div class="divprincipal">
        <div class="header">
          <button class="back-button" (click)="goBack()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          <h1>Disponibilidad de Vehículos</h1>
        </div>

        <div *ngIf="loading" class="loading">
          Cargando información de vehículos...
        </div>

        <div class="tabs">
          <button 
            [class.active]="tabActiva === 'disponibles'" 
            (click)="tabActiva = 'disponibles'">
            Disponibles ({{ disponibles.length }})
          </button>
          <button 
            [class.active]="tabActiva === 'rentados'" 
            (click)="tabActiva = 'rentados'">
            Rentados ({{ rentados.length }})
          </button>
        </div>

        <div *ngIf="tabActiva === 'disponibles'">
          <h2>Vehículos Disponibles</h2>
          <div *ngIf="disponibles.length === 0" class="no-vehiculos">
            No hay vehículos disponibles actualmente.
          </div>
          <ul class="vehiculos-list">
            <li *ngFor="let vehiculo of disponibles" class="vehiculo-item disponible">
              <div class="vehiculo-info">
                <h3>{{ vehiculo.modeloVehiculo }}</h3>
                <p><strong>Matrícula:</strong> {{ vehiculo.matricula }}</p>
              </div>
              <div class="vehiculo-image">
                <img [src]="getImagePath(vehiculo.imagen)" alt="Imagen del vehículo" class="car-image">
              </div>
            </li>
          </ul>
        </div>

        <div *ngIf="tabActiva === 'rentados'">
          <h2>Vehículos Rentados</h2>
          <div *ngIf="rentados.length === 0" class="no-vehiculos">
            No hay vehículos rentados actualmente.
          </div>
          <ul class="vehiculos-list">
            <li *ngFor="let vehiculo of rentados" class="vehiculo-item rentado">
              <div class="vehiculo-info">
                <h3>{{ vehiculo.modeloVehiculo }}</h3>
                <p><strong>Matrícula:</strong> {{ vehiculo.matricula }}</p>
                <p><strong>Rentador:</strong> {{ vehiculo.rentador }}</p>
                <p><strong>Fecha de Renta:</strong> {{ vehiculo.fechaIngreso | date: 'shortDate' }}</p>
              </div>
              <div class="vehiculo-image">
                <img [src]="getImagePath(vehiculo.imagen)" alt="Imagen del vehículo" class="car-image">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .main {
      width: 100%;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      box-sizing: border-box;
      position: relative;
      background-color: #f5f7fa;
    }

    .divprincipal {
      max-width: 900px;
      width: 100%;
      padding: 2rem;
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .back-button {
      background: none;
      border: none;
      color: #2c3e50;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }

    .back-button:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .back-button svg {
      fill: currentColor;
    }

    .loading, .no-vehiculos {
      text-align: center;
      padding: 2rem;
      color: #555;
    }

    .tabs {
      display: flex;
      margin-bottom: 2rem;
      border-bottom: 1px solid #ddd;
    }

    .tabs button {
      padding: 0.75rem 1.5rem;
      background: none;
      border: none;
      border-bottom: 3px solid transparent;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s;
      margin-right: 1rem;
    }

    .tabs button.active {
      border-bottom-color: #2c3e50;
      font-weight: bold;
    }

    .tabs button:hover:not(.active) {
      border-bottom-color: #ccc;
    }

    .vehiculos-list {
      list-style: none;
      padding: 0;
    }

    .vehiculo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .disponible {
      background-color: #e8f5e9;
      border-left: 4px solid #2e7d32;
    }

    .rentado {
      background-color: #ffebee;
      border-left: 4px solid #c62828;
    }

    .vehiculo-info {
      flex: 1;
    }

    .vehiculo-info h3 {
      margin-top: 0;
      color: #2c3e50;
    }

    .vehiculo-info p {
      margin: 0.5rem 0;
    }

    .vehiculo-image {
      flex: 0 0 200px;
      margin-left: 1.5rem;
      text-align: center;
    }

    .car-image {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      max-height: 150px;
    }

    @media (max-width: 768px) {
      .divprincipal {
        padding: 1rem;
      }

      .vehiculo-item {
        flex-direction: column;
      }

      .vehiculo-image {
        margin-left: 0;
        margin-top: 1rem;
        flex: 1;
        width: 100%;
      }
    }
  `]
})
export class DisponibilidadComponent implements OnInit {
  disponibles: any[] = [];
  rentados: any[] = [];
  loading = true;
  tabActiva = 'disponibles';

  // Lista completa de vehículos
  private todosLosVehiculos = [
    { matricula: 'ABC-1234', modeloVehiculo: 'Honda Civic', imagen: 'honda.jpg' },
    { matricula: 'DEF-5678', modeloVehiculo: 'Toyota Corolla', imagen: 'toyota.jpg' },
    { matricula: 'GHI-9012', modeloVehiculo: 'Mercedes Benz', imagen: 'mercedes.jpeg' },
    { matricula: 'JKL-3456', modeloVehiculo: 'Jeep Wrangler', imagen: 'jeep.jpg' }
  ];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.http.get<any[]>('http://localhost:8080/rentasAuto/renta/getAll').subscribe({
      next: (rentas) => {
        this.rentados = rentas;
        
        // Filtrar vehículos disponibles
        const matriculasRentadas = rentas.map(r => r.matricula);
        this.disponibles = this.todosLosVehiculos.filter(
          v => !matriculasRentadas.includes(v.matricula)
        );
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar datos:', error);
        this.loading = false;
      }
    });
  }

  getImagePath(imageName: string): string {
    // Las imágenes están en la carpeta public
    return `/${imageName}`;
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}