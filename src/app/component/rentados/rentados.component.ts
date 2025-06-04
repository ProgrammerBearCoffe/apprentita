import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rentados',
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
          <h1>Vehículos Rentados</h1>
        </div>

        <div *ngIf="loading" class="loading">
          Cargando información de vehículos rentados...
        </div>

        <div *ngIf="!loading && rentados.length === 0" class="no-rentas">
          No hay vehículos rentados actualmente.
        </div>

        <ul class="rentas-list">
          <li *ngFor="let renta of rentados" class="renta-item">
            <div class="renta-info">
              <h3>{{ renta.modeloVehiculo }}</h3>
              <p><strong>Matrícula:</strong> {{ renta.matricula }}</p>
              <p><strong>Rentador:</strong> {{ renta.rentador }}</p>
              <p><strong>Número de Renta:</strong> {{ renta.numeroRenta }}</p>
              <p><strong>Horas de Renta:</strong> {{ renta.horasRenta }}</p>
              <p><strong>Fecha de Ingreso:</strong> {{ renta.fechaIngreso | date: 'shortDate' }}</p>
              <p><strong>Ubicación:</strong> {{ renta.ubicacion }}</p>
            </div>
            <div *ngIf="renta.imagen" class="renta-image">
              <img [src]="getImagePath(renta.imagen)" alt="Imagen del vehículo" class="car-image">
            </div>
          </li>
        </ul>
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

    .loading, .no-rentas {
      text-align: center;
      padding: 2rem;
      color: #555;
    }

    .rentas-list {
      list-style: none;
      padding: 0;
    }

    .renta-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      background-color: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .renta-info {
      flex: 1;
    }

    .renta-info h3 {
      margin-top: 0;
      color: #2c3e50;
    }

    .renta-info p {
      margin: 0.5rem 0;
    }

    .renta-image {
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

      .renta-item {
        flex-direction: column;
      }

      .renta-image {
        margin-left: 0;
        margin-top: 1rem;
        flex: 1;
        width: 100%;
      }
    }
  `]
})
export class RentadosComponent implements OnInit {
  rentados: any[] = [];
  loading = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.cargarVehiculosRentados();
  }

  cargarVehiculosRentados() {
    this.http.get<any[]>('http://localhost:8080/rentasAuto/renta/getAll').subscribe({
      next: (rentas) => {
        this.rentados = rentas;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar vehículos rentados:', error);
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