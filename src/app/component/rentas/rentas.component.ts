import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RentaService } from '../../services/renta.service';

@Component({
  selector: 'app-rentas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  template: `
    <main class="main">
      <div class="divprincipal">
        <h1>Nueva Renta de Vehículo</h1>
        
        <div class="form-container">
          <div class="form-fields" [formGroup]="rentaForm">
            <input formControlName="numeroRenta" type="text" placeholder="Número de Renta" class="input">
            <input formControlName="horasRenta" type="text" placeholder="Horas de renta (ej. 5:30 PM)" class="input">
            <div *ngIf="rentaForm.get('horasRenta')?.hasError('invalidTimeFormat') && rentaForm.get('horasRenta')?.touched" class="error-message">
              Formato de hora inválido. Usa el formato HH:MM AM/PM (ej. 5:30 PM).
            </div>
            <input formControlName="rentador" type="text" placeholder="Nombre del Rentador" class="input">
            <input formControlName="fechaIngreso" type="date" placeholder="Fecha de ingreso" class="input">
            <input formControlName="ubicacion" type="text" placeholder="Ubicación del vehículo (ej. Parqueo A-1)" class="input">
            
            <label>Vehículo
              <select formControlName="matricula" class="select-field" (change)="onCarSelect($event)">
                <option value="">Selecciona por matrícula</option>
                <option *ngFor="let car of cars" 
                        [value]="car.matricula" 
                        [disabled]="car.rentado">
                  {{ car.matricula }} - {{ car.modeloVehiculo }} 
                  <span *ngIf="car.rentado">(Rentado)</span>
                </option>
              </select>
            </label>

            <div *ngIf="selectedCarImage" class="car-image-container">
              <img [src]="getImagePath(selectedCarImage)" alt="Imagen del vehículo seleccionado" class="car-image">
            </div>

            <button (click)="registrarRenta()" 
                    [disabled]="!rentaForm.valid || loading" 
                    [ngClass]="{'boton-valido': rentaForm.valid, 'boton-invalido': !rentaForm.valid}" 
                    [class.boton-presionado]="botonPresionado"
                    class="boton">
              {{ loading ? 'Registrando...' : 'Confirmar Renta' }}
            </button>

            <div *ngIf="successMessage" class="mensaje-temporal">
              {{ successMessage }}
            </div>

            <div *ngIf="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
          </div>
        </div>

        <h2>Rentas Recientes:</h2>
        <ul class="rentas-list">
          <li *ngFor="let renta of rentasRecientes" class="renta-item">
            <div class="renta-info">
              <strong>No. de renta:</strong> {{ renta.numeroRenta }}<br>
              <strong>Horas de renta:</strong> {{ renta.horasRenta }}<br>
              <strong>Rentador:</strong> {{ renta.rentador }}<br>
              <strong>Fecha de ingreso:</strong> {{ renta.fechaIngreso | date: 'shortDate' }}<br>
              <strong>Ubicación:</strong> {{ renta.ubicacion }}<br>
              <strong>Matrícula:</strong> {{ renta.matricula }}<br>
              <strong>Modelo:</strong> {{ renta.modeloVehiculo }}
            </div>
            <div *ngIf="renta.imagen" class="renta-image">
              <img [src]="getImagePath(renta.imagen)" alt="Imagen del vehículo" class="car-image-small">
            </div>
          </li>
        </ul>
      </div>
    </main>
  `,
  styles: [`
    /* Estilos anteriores se mantienen igual */
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

    .form-container {
      display: flex;
      gap: 20px;
      margin-bottom: 2rem;
    }

    .form-fields {
      flex: 1;
    }

    .car-image-container {
      flex: 0 0 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border-radius: 8px;
      padding: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .car-image {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      max-height: 200px;
    }

    .input, .select-field {
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      border-radius: 8px;
      font: 400 1rem/1.5 'Helvetica Now Text', Helvetica, Arial, sans-serif;
      padding: 16px 12px;
      color: #111111;
      background: transparent;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      background-color: #f9f9f9;
    }

    .input:focus, .select-field:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
      background-color: white;
    }

    .boton {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 12px 24px;
      border-radius: 8px;
      width: 100%;
      font-size: medium;
      line-height: 16px;
      cursor: pointer;
      border: none;
      margin-top: 10px;
      transition: all 0.2s;
      font-weight: 500;
    }

    .boton-invalido {
      background-color: #95a5a6;
      color: white;
      cursor: not-allowed;
    }

    .boton-valido {
      background-color: #27ae60;
      color: white;
    }

    .boton-valido:hover:not(:disabled) {
      background-color: #219653;
      transform: translateY(-1px);
    }

    .boton-presionado {
      background-color: #219653;
    }

    .mensaje-temporal {
      margin-top: 10px;
      padding: 10px;
      background-color: #e8f5e9;
      color: #2e7d32;
      border: 1px solid #a5d6a7;
      border-radius: 4px;
      text-align: center;
    }

    .error-message {
      margin-top: 10px;
      padding: 10px;
      background-color: #ffebee;
      color: #c62828;
      border: 1px solid #ef9a9a;
      border-radius: 4px;
    }

    .rentas-list {
      list-style: none;
      padding: 0;
    }

    .renta-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      margin-bottom: 10px;
      background-color: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .renta-info {
      flex: 1;
    }

    .renta-image {
      flex: 0 0 100px;
      text-align: right;
    }

    .car-image-small {
      max-width: 100px;
      height: auto;
      border-radius: 8px;
    }

    @media (max-width: 768px) {
      .divprincipal {
        padding: 1rem;
      }

      .form-container {
        flex-direction: column;
      }

      .car-image-container {
        flex: 1;
        margin-top: 20px;
      }

      .renta-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .renta-image {
        margin-top: 10px;
        text-align: left;
      }
    }
  `]
})
export class RentasComponent implements OnInit {
  rentaForm = new FormGroup({
    numeroRenta: new FormControl('', [Validators.required]),
    horasRenta: new FormControl('', [Validators.required, this.validateTimeFormat]),
    rentador: new FormControl('', [Validators.required]),
    fechaIngreso: new FormControl('', [Validators.required]),
    ubicacion: new FormControl('', [Validators.required]),
    matricula: new FormControl('', [Validators.required]),
    modeloVehiculo: new FormControl(''),
    imagen: new FormControl('')
  });

  cars = [
    { matricula: 'ABC-1234', modeloVehiculo: 'Honda Civic', imagen: 'honda.jpg', rentado: false },
    { matricula: 'DEF-5678', modeloVehiculo: 'Toyota Corolla', imagen: 'toyota.jpg', rentado: false },
    { matricula: 'GHI-9012', modeloVehiculo: 'Mercedes Benz', imagen: 'mercedes.jpeg', rentado: false },
    { matricula: 'JKL-3456', modeloVehiculo: 'Jeep Wrangler', imagen: 'jeep.jpg', rentado: false }
  ];

  selectedCarImage: string | null = null;
  rentasRecientes: any[] = [];
  loading = false;
  botonPresionado = false;
  successMessage = '';
  errorMessage = '';

  constructor(private rentaService: RentaService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.cargarRentasRecientes();
  }

  getImagePath(imageName: string): string {
    // Las imágenes están en la carpeta public, así que usamos la ruta directa
    return `/${imageName}`;
  }

  validateTimeFormat(control: FormControl): { [key: string]: any } | null {
    const timePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
    return !control.value || timePattern.test(control.value) ? null : { invalidTimeFormat: true };
  }

  onCarSelect(event: Event): void {
    const matricula = (event.target as HTMLSelectElement).value;
    const car = this.cars.find(c => c.matricula === matricula);
    if (car) {
      this.selectedCarImage = car.imagen;
      this.rentaForm.patchValue({
        modeloVehiculo: car.modeloVehiculo,
        imagen: car.imagen
      });
    } else {
      this.selectedCarImage = null;
      this.rentaForm.patchValue({
        modeloVehiculo: '',
        imagen: ''
      });
    }
  }

  cargarRentasRecientes() {
    this.http.get<any[]>('http://localhost:8080/rentasAuto/renta/getAll').subscribe({
      next: (rentas) => {
        this.rentasRecientes = rentas;
        this.marcarVehiculosRentados();
      },
      error: (error) => {
        console.error('Error al cargar rentas recientes:', error);
      }
    });
  }

  marcarVehiculosRentados() {
    this.cars.forEach(car => {
      car.rentado = this.rentasRecientes.some(renta => renta.matricula === car.matricula);
    });
  }

  registrarRenta() {
    if (this.rentaForm.valid) {
      this.loading = true;
      this.botonPresionado = true;
      this.errorMessage = '';
      this.successMessage = '';

      const rentaData = {
        ...this.rentaForm.value,
        fechaIngreso: new Date(this.rentaForm.value.fechaIngreso!).toISOString().split('T')[0]
      };

      this.rentaService.agregarRenta(rentaData).subscribe({
        next: (response) => {
          this.loading = false;
          this.botonPresionado = false;
          this.successMessage = '¡Renta registrada con éxito!';
          
          const matricula = this.rentaForm.value.matricula;
          const car = this.cars.find(c => c.matricula === matricula);
          if (car) {
            car.rentado = true;
          }
          
          this.rentasRecientes.unshift(response);
          this.rentaForm.reset();
          this.selectedCarImage = null;
          
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error) => {
          this.loading = false;
          this.botonPresionado = false;
          this.errorMessage = error.error?.message || 'Error al registrar la renta';
          console.error('Error:', error);
        }
      });
    }
  }

  cancelar() {
    this.rentaForm.reset();
    this.selectedCarImage = null;
    this.router.navigate(['/home']);
  }
}