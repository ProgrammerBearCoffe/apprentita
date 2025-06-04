import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-conductores',
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
          <h1>Gestión de Conductores</h1>
        </div>

        <div class="tabs">
          <button 
            [class.active]="tabActiva === 'lista'" 
            (click)="tabActiva = 'lista'">
            Lista de Conductores
          </button>
          <button 
            [class.active]="tabActiva === 'nuevo'" 
            (click)="tabActiva = 'nuevo'; resetForm()">
            Nuevo Conductor
          </button>
        </div>

        <div *ngIf="tabActiva === 'lista'">
          <div *ngIf="loading" class="loading">
            Cargando lista de conductores...
          </div>

          <div *ngIf="!loading && conductores.length === 0" class="no-conductores">
            No hay conductores registrados.
          </div>

          <table *ngIf="!loading && conductores.length > 0" class="conductores-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Licencia</th>
                <th>Email</th>
                <th>Estado</th>
                <th>Viajes Totales</th>
                <th>Detalles</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let conductor of conductores">
                <td>{{ conductor.id }}</td>
                <td>{{ conductor.driver_name }}</td>
                <td>{{ conductor.driver_license }}</td>
                <td>{{ conductor.email }}</td>
                <td>
                  <span [class.active]="conductor.driver_status" [class.inactive]="!conductor.driver_status">
                    {{ conductor.driver_status ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td>{{ conductor.total_trips }}</td>
                <td>{{ conductor.trip_details }}</td>
                <td class="actions">
                  <button (click)="editarConductor(conductor)" class="edit-btn">Editar</button>
                  <button (click)="eliminarConductor(conductor.id)" class="delete-btn">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div *ngIf="tabActiva === 'nuevo'" class="form-container">
          <form [formGroup]="conductorForm" (ngSubmit)="onSubmit()" class="conductor-form">
            <div class="form-row">
              <div class="form-group">
                <label for="driver_name">Nombre Completo</label>
                <input 
                  type="text" 
                  id="driver_name" 
                  formControlName="driver_name" 
                  required
                >
              </div>
              <div class="form-group">
                <label for="driver_license">Número de Licencia</label>
                <input 
                  type="text" 
                  id="driver_license" 
                  formControlName="driver_license" 
                  required
                >
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  formControlName="email" 
                  required
                >
              </div>
              <div class="form-group">
                <label for="total_trips">Viajes Totales</label>
                <input 
                  type="text" 
                  id="total_trips" 
                  formControlName="total_trips" 
                  required
                >
              </div>
            </div>

            <div class="form-group full-width">
              <label for="trip_details">Detalles de Viajes</label>
              <textarea
                id="trip_details" 
                formControlName="trip_details" 
                rows="3"
              ></textarea>
            </div>

            <div class="form-group checkbox-group">
              <label for="driver_status">
                <input 
                  type="checkbox" 
                  id="driver_status" 
                  formControlName="driver_status"
                >
                Estado Activo
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
                [disabled]="!conductorForm.valid || loading"
              >
                {{ loading ? 'Procesando...' : conductorId ? 'Actualizar' : 'Guardar' }}
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

    .loading, .no-conductores {
      text-align: center;
      padding: 2rem;
      color: #555;
    }

    .conductores-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }

    .conductores-table th, .conductores-table td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    .conductores-table th {
      background-color: #f5f7fa;
      font-weight: 600;
    }

    .conductores-table tr:hover {
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

    .conductor-form {
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

    .full-width {
      flex: 0 0 100%;
    }

    label {
      font-size: 0.9rem;
      color: #555;
      font-weight: 500;
    }

    input, textarea {
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      width: 100%;
    }

    textarea {
      resize: vertical;
      min-height: 80px;
    }

    input:focus, textarea:focus {
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

      .conductores-table {
        display: block;
        overflow-x: auto;
      }
    }
  `]
})
export class ConductoresComponent implements OnInit {
  conductores: any[] = [];
  loading = false;
  tabActiva: 'lista' | 'nuevo' = 'lista';
  conductorForm: FormGroup;
  conductorId: number | null = null;
  errorMessage = '';
  successMessage = '';

  constructor(
    private driverService: DriverService,
    private router: Router
  ) {
    this.conductorForm = new FormGroup({
      driver_name: new FormControl('', [Validators.required]),
      driver_license: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      driver_status: new FormControl(true),
      total_trips: new FormControl('', [Validators.required]),
      trip_details: new FormControl('')
    });
  }

  ngOnInit() {
    this.cargarConductores();
  }

  cargarConductores() {
    this.loading = true;
    this.driverService.getAllDrivers().subscribe({
      next: (conductores) => {
        this.conductores = conductores;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los conductores';
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.conductorForm.invalid) {
      this.errorMessage = 'Por favor complete todos los campos requeridos';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const conductorData = this.conductorForm.value;

    if (this.conductorId) {
      // Actualizar conductor existente
      this.driverService.updateDriver(this.conductorId, conductorData).subscribe({
        next: (success) => {
          if (success) {
            this.successMessage = 'Conductor actualizado correctamente';
            this.cargarConductores();
            this.resetForm();
            this.tabActiva = 'lista';
          } else {
            this.errorMessage = 'Error al actualizar el conductor';
          }
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar el conductor';
          console.error('Error:', error);
          this.loading = false;
        }
      });
    } else {
      // Crear nuevo conductor
      this.driverService.addDriver(conductorData).subscribe({
        next: (conductor) => {
          this.successMessage = 'Conductor creado correctamente';
          this.conductores.unshift(conductor);
          this.resetForm();
          this.tabActiva = 'lista';
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error al crear el conductor';
          console.error('Error:', error);
          this.loading = false;
        }
      });
    }
  }

  editarConductor(conductor: any) {
    this.conductorId = conductor.id;
    this.conductorForm.patchValue({
      driver_name: conductor.driver_name,
      driver_license: conductor.driver_license,
      email: conductor.email,
      driver_status: conductor.driver_status,
      total_trips: conductor.total_trips,
      trip_details: conductor.trip_details
    });
    this.tabActiva = 'nuevo';
  }

  eliminarConductor(id: number) {
    if (confirm('¿Está seguro que desea eliminar este conductor?')) {
      this.driverService.deleteDriver(id).subscribe({
        next: (success) => {
          if (success) {
            this.successMessage = 'Conductor eliminado correctamente';
            this.conductores = this.conductores.filter(c => c.id !== id);
          } else {
            this.errorMessage = 'Error al eliminar el conductor';
          }
        },
        error: (error) => {
          this.errorMessage = 'Error al eliminar el conductor';
          console.error('Error:', error);
        }
      });
    }
  }

  resetForm() {
    this.conductorForm.reset({
      driver_status: true,
      trip_details: ''
    });
    this.conductorId = null;
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