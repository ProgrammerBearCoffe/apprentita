import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <main class="main">
      <div class="divprincipal">
        <div class="header">
          <button class="back-button" (click)="goBack()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          <h1>Gestión de Vehículos</h1>
        </div>

        <div class="tabs">
          <button 
            [class.active]="tabActiva === 'lista'" 
            (click)="tabActiva = 'lista'">
            Lista de Vehículos
          </button>
          <button 
            [class.active]="tabActiva === 'nuevo'" 
            (click)="tabActiva = 'nuevo'; resetForm()">
            Nuevo Vehículo
          </button>
        </div>

        <div *ngIf="tabActiva === 'lista'">
          <div *ngIf="loading" class="loading">
            Cargando lista de vehículos...
          </div>

          <div *ngIf="!loading && vehiculos.length === 0" class="no-vehiculos">
            No hay vehículos registrados.
          </div>

          <table *ngIf="!loading && vehiculos.length > 0" class="vehiculos-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Placa</th>
                <th>Propietario</th>
                <th>Tarifa</th>
                <th>Precio Base</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let vehiculo of vehiculos">
                <td>{{ vehiculo.id }}</td>
                <td>{{ vehiculo.car_brand }}</td>
                <td>{{ vehiculo.car_model }}</td>
                <td>{{ vehiculo.plate }}</td>
                <td>{{ vehiculo.owner }}</td>
                <td>{{ vehiculo.fee | currency }}</td>
                <td>{{ vehiculo.base_price | currency }}</td>
                <td>
                  <span [class.active]="vehiculo.status" [class.inactive]="!vehiculo.status">
                    {{ vehiculo.status ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td class="actions">
                  <button (click)="editarVehiculo(vehiculo)" class="edit-btn">Editar</button>
                  <button (click)="eliminarVehiculo(vehiculo.id)" class="delete-btn">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div *ngIf="tabActiva === 'nuevo'" class="form-container">
          <form [formGroup]="vehiculoForm" (ngSubmit)="onSubmit()" class="vehiculo-form">
            <div class="form-row">
              <div class="form-group">
                <label for="car_brand">Marca</label>
                <input 
                  type="text" 
                  id="car_brand" 
                  formControlName="car_brand" 
                  required
                >
              </div>
              <div class="form-group">
                <label for="car_model">Modelo</label>
                <input 
                  type="text" 
                  id="car_model" 
                  formControlName="car_model" 
                  required
                >
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="plate">Placa</label>
                <input 
                  type="text" 
                  id="plate" 
                  formControlName="plate" 
                  required
                >
              </div>
              <div class="form-group">
                <label for="owner">Propietario</label>
                <input 
                  type="text" 
                  id="owner" 
                  formControlName="owner" 
                  required
                >
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="fee">Tarifa por hora</label>
                <input 
                  type="number" 
                  id="fee" 
                  formControlName="fee" 
                  step="0.01" 
                  min="0" 
                  required
                >
              </div>
              <div class="form-group">
                <label for="base_price">Precio base</label>
                <input 
                  type="number" 
                  id="base_price" 
                  formControlName="base_price" 
                  step="0.01" 
                  min="0" 
                  required
                >
              </div>
            </div>

            <div class="form-group checkbox-group">
              <label for="status">
                <input 
                  type="checkbox" 
                  id="status" 
                  formControlName="status"
                >
                Disponible
              </label>
            </div>

            <div class="form-actions">
              <button 
                type="button" 
                class="cancel-button" 
                (click)="cancelar()"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                class="submit-button" 
                [disabled]="!vehiculoForm.valid || loading"
              >
                {{ loading ? 'Procesando...' : vehiculoId ? 'Actualizar' : 'Guardar' }}
              </button>
            </div>

            <div *ngIf="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
            <div *ngIf="successMessage" class="success-message">
              {{ successMessage }}
            </div>
          </form>
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
      max-width: 1200px;
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

    .loading, .no-vehiculos {
      text-align: center;
      padding: 2rem;
      color: #555;
    }

    .vehiculos-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }

    .vehiculos-table th, .vehiculos-table td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    .vehiculos-table th {
      background-color: #f5f7fa;
      font-weight: 600;
    }

    .vehiculos-table tr:hover {
      background-color: #f9f9f9;
    }

    .active {
      color: #2e7d32;
      font-weight: 500;
    }

    .inactive {
      color: #c62828;
      font-weight: 500;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }

    .edit-btn, .delete-btn {
      padding: 0.25rem 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.85rem;
    }

    .edit-btn {
      background-color: #2196F3;
      color: white;
    }

    .delete-btn {
      background-color: #f44336;
      color: white;
    }

    .form-container {
      margin-top: 1.5rem;
    }

    .vehiculo-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-row {
      display: flex;
      gap: 1.5rem;
    }

    .form-group {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-size: 0.9rem;
      color: #555;
      font-weight: 500;
    }

    input {
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      width: 100%;
    }

    input:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }

    .checkbox-group {
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
    }

    .checkbox-group input {
      width: auto;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .cancel-button, .submit-button {
      padding: 0.8rem 1.5rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .cancel-button {
      background-color: #f5f5f5;
      color: #555;
      border: 1px solid #ddd;
    }

    .cancel-button:hover {
      background-color: #eaeaea;
    }

    .submit-button {
      background-color: #27ae60;
      color: white;
      border: none;
    }

    .submit-button:hover:not(:disabled) {
      background-color: #219653;
    }

    .submit-button:disabled {
      background-color: #95a5a6;
      cursor: not-allowed;
    }

    .error-message {
      color: #c62828;
      padding: 0.75rem;
      background-color: #ffebee;
      border-radius: 8px;
      margin-top: 1rem;
    }

    .success-message {
      color: #2e7d32;
      padding: 0.75rem;
      background-color: #e8f5e9;
      border-radius: 8px;
      margin-top: 1rem;
    }

    @media (max-width: 768px) {
      .divprincipal {
        padding: 1rem;
      }

      .form-row {
        flex-direction: column;
        gap: 1rem;
      }

      .vehiculos-table {
        display: block;
        overflow-x: auto;
      }
    }
  `]
})
export class VehiculosComponent implements OnInit {
  vehiculos: any[] = [];
  loading = false;
  tabActiva: 'lista' | 'nuevo' = 'lista';
  vehiculoForm: FormGroup;
  vehiculoId: number | null = null;
  errorMessage = '';
  successMessage = '';

  constructor(
    private carService: CarService,
    private router: Router
  ) {
    this.vehiculoForm = new FormGroup({
      car_brand: new FormControl('', [Validators.required]),
      car_model: new FormControl('', [Validators.required]),
      plate: new FormControl('', [Validators.required]),
      owner: new FormControl('', [Validators.required]),
      fee: new FormControl(0, [Validators.required, Validators.min(0)]),
      base_price: new FormControl(0, [Validators.required, Validators.min(0)]),
      status: new FormControl(true)
    });
  }

  ngOnInit() {
    this.cargarVehiculos();
  }

  cargarVehiculos() {
    this.loading = true;
    this.carService.getAllCars().subscribe({
      next: (vehiculos) => {
        this.vehiculos = vehiculos;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los vehículos';
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.vehiculoForm.invalid) {
      this.errorMessage = 'Por favor complete todos los campos requeridos';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const vehiculoData = this.vehiculoForm.value;

    if (this.vehiculoId) {
      // Actualizar vehículo existente
      this.carService.updateCar(this.vehiculoId, vehiculoData).subscribe({
        next: (success) => {
          if (success) {
            this.successMessage = 'Vehículo actualizado correctamente';
            this.cargarVehiculos();
            this.resetForm();
            this.tabActiva = 'lista';
          } else {
            this.errorMessage = 'Error al actualizar el vehículo';
          }
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar el vehículo';
          console.error('Error:', error);
          this.loading = false;
        }
      });
    } else {
      // Crear nuevo vehículo
      this.carService.addCar(vehiculoData).subscribe({
        next: (vehiculo) => {
          this.successMessage = 'Vehículo creado correctamente';
          this.vehiculos.unshift(vehiculo);
          this.resetForm();
          this.tabActiva = 'lista';
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error al crear el vehículo';
          console.error('Error:', error);
          this.loading = false;
        }
      });
    }
  }

  editarVehiculo(vehiculo: any) {
    this.vehiculoId = vehiculo.id;
    this.vehiculoForm.patchValue({
      car_brand: vehiculo.car_brand,
      car_model: vehiculo.car_model,
      plate: vehiculo.plate,
      owner: vehiculo.owner,
      fee: vehiculo.fee,
      base_price: vehiculo.base_price,
      status: vehiculo.status
    });
    this.tabActiva = 'nuevo';
  }

  eliminarVehiculo(id: number) {
    if (confirm('¿Está seguro que desea eliminar este vehículo?')) {
      this.carService.deleteCar(id).subscribe({
        next: (success) => {
          if (success) {
            this.successMessage = 'Vehículo eliminado correctamente';
            this.vehiculos = this.vehiculos.filter(v => v.id !== id);
          } else {
            this.errorMessage = 'Error al eliminar el vehículo';
          }
        },
        error: (error) => {
          this.errorMessage = 'Error al eliminar el vehículo';
          console.error('Error:', error);
        }
      });
    }
  }

  resetForm() {
    this.vehiculoForm.reset({
      fee: 0,
      base_price: 0,
      status: true
    });
    this.vehiculoId = null;
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelar() {
    this.resetForm();
    this.tabActiva = 'lista';
  }

  goBack() {
    this.router.navigate(['/homeadmin']);
  }
}