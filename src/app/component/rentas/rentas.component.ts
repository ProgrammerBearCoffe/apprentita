import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehiculosService } from '../interfaz/VehiculosService';
import { Producto } from '../interfaz/interfaz';
import { SharedModule } from '../interfaz/shared';

@Component({
  selector: 'app-rentas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  template: `
    <main class="main">
      <div class="divprincipal">
        <h1>Número de rentas: {{ numberTask }}</h1>
        <span>Título de renta: {{ titleTask }}</span>
        <div class="form-container">
          <div class="form-fields" [formGroup]="form">
            <input formControlName="car" type="text" placeholder="Ingresa No. de renta" [(ngModel)]="titleTask" class="input">
            <input formControlName="carro" type="text" placeholder="Ingresa las horas de renta (ej. 5:30 PM)" class="input">
            <div *ngIf="form.get('carro')?.hasError('invalidTimeFormat') && form.get('carro')?.touched" class="error-message">
              Formato de hora inválido. Usa el formato HH:MM AM/PM (ej. 5:30 PM).
            </div>
            <input formControlName="renter" type="text" placeholder="Ingresa el nombre del rentador" class="input">
            <input formControlName="renterName" type="date" placeholder="Fecha de ingreso" class="input">
            <input formControlName="ubicacion" type="text" placeholder="Ubicación del vehículo (ej. Parqueo A-1)" class="input">
            
            <label>Vehículo
              <select formControlName="matricula" class="select-field" (change)="onCarSelect($event)">
                <option value="">Selecciona por matrícula</option>
                <option *ngFor="let car of cars" [value]="car.matricula" [disabled]="vehiculosService.estaRentado(car.value)">
                  {{ car.matricula }} - {{ car.name }} {{ vehiculosService.estaRentado(car.value) ? '(R)' : '' }}
                </option>
              </select>
            </label>

            <button (click)="onButtonClick()" 
                    [disabled]="!form.valid" 
                    [ngClass]="{'boton-valido': form.valid, 'boton-invalido': !form.valid}" 
                    [class.boton-presionado]="botonPresionado"
                    class="boton">
              Ingresa Renta
            </button>

            <div *ngIf="mostrarMensaje" class="mensaje-temporal">
              Renta guardada correctamente!
            </div>

            <h2>Valores</h2>
            <h3>Interpolación | JSON</h3>
            <pre>{{ form.value | json }}</pre>
          </div>

          <div *ngIf="selectedCarImage" class="car-image-container">
            <img [src]="selectedCarImage" alt="Imagen del vehículo seleccionado" class="car-image">
          </div>
        </div>

        <h2>Rentas Guardadas:</h2>
        <ul class="rentas-list">
          <li *ngFor="let renta of rentas" class="renta-item">
            <div class="renta-info">
              <strong>No. de renta:</strong> {{ renta.car }}<br>
              <strong>Horas de renta:</strong> {{ renta.carro }}<br>
              <strong>Rentador:</strong> {{ renta.renter }}<br>
              <strong>Fecha de ingreso:</strong> {{ renta.renterName | date: 'shortDate' }}<br>
              <strong>Ubicación:</strong> {{ renta.ubicacion }}<br>
              <strong>Matrícula:</strong> {{ renta.matricula }}
            </div>
            <div *ngIf="renta.image" class="renta-image">
              <img [src]="renta.image" alt="Imagen del vehículo" class="car-image-small">
            </div>
          </li>
        </ul>
      </div>
    </main>
  `,
  styles: [
    `
      .main {
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        box-sizing: border-box;
        position: relative;
      }

      .divprincipal {
        max-width: 800px;
        width: 100%;
        padding: 1rem;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .form-container {
        display: flex;
        gap: 20px;
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
        border: 1px solid #ccc;
      }

      .boton {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px 24px;
        border-radius: 30px;
        width: 100%;
        font-size: medium;
        line-height: 16px;
        cursor: pointer;
        border: 1.5px solid black;
        margin-top: 10px;
        transition: background-color 0.3s ease;
      }

      .boton-invalido {
        background-color: #ccc;
        color: #666;
        cursor: not-allowed;
      }

      .boton-valido {
        background-color: blue;
        color: white;
      }

      .boton-presionado {
        background-color: green;
      }

      .mensaje-temporal {
        margin-top: 10px;
        padding: 10px;
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
        border-radius: 4px;
        text-align: center;
      }

      pre {
        background-color: #f0f0f0;
        padding: 10px;
        border-radius: 4px;
        overflow-x: auto;
        margin-top: 10px;
      }

      .rentas-list {
        list-style: none;
        padding: 0;
      }

      .renta-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #ccc;
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
    `,
  ],
})
export class RentasComponent {
  numberTask = 10;
  titleTask = "tarea1";
  rentas: any[] = [];
  botonPresionado = false;
  mostrarMensaje = false;
  selectedCarImage: string | null = null;

  cars = [
    { value: 1, matricula: 'ABC-1234', name: 'Honda', image: 'honda.jpg' },
    { value: 2, matricula: 'DEF-5678', name: 'Toyota', image: 'toyota.jpg' },
    { value: 3, matricula: 'GHI-9012', name: 'Mercedes', image: 'mercedes.jpeg' },
    { value: 4, matricula: 'JKL-3456', name: 'Jeep', image: 'jeep.jpg' },
  ];

  form = new FormGroup({
    car: new FormControl('', [Validators.required]),
    carro: new FormControl('', [Validators.required, this.validateTimeFormat]),
    renter: new FormControl('', [Validators.required]),
    renterName: new FormControl('', [Validators.required]),
    ubicacion: new FormControl('', [Validators.required]),
    matricula: new FormControl('', [Validators.required])
  });

  constructor(public vehiculosService: VehiculosService) {}

  validateTimeFormat(control: FormControl): { [key: string]: any } | null {
    const timePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
    return !control.value || timePattern.test(control.value) ? null : { invalidTimeFormat: true };
  }

  onCarSelect(event: Event): void {
    const matricula = (event.target as HTMLSelectElement).value;
    const car = this.cars.find(c => c.matricula === matricula);
    this.selectedCarImage = car ? car.image : null;
  }

  onButtonClick(): void {
    if (this.form.valid) {
      const matricula = this.form.value.matricula!; // Usamos ! para indicar que sabemos que no es null
      const ubicacion = this.form.value.ubicacion || undefined; // Convertimos null/undefined a undefined
      const car = this.cars.find(c => c.matricula === matricula);
      
      if (car && !this.vehiculosService.estaRentado(car.value)) {
        this.botonPresionado = true;
        this.rentas.push({
          ...this.form.value,
          image: this.selectedCarImage,
          leng: car.name
        });
        
        const producto: Producto = {
          Id: car.value,
          Name: car.name,
          Precio: 0,
          Imagen: car.image,
          Matricula: car.matricula,
          Ubicacion: ubicacion || undefined // Aseguramos que sea string o undefined
        };
        
        this.vehiculosService.rentarVehiculo(producto, ubicacion);
        this.mostrarMensaje = true;
        this.form.reset();
        this.selectedCarImage = null;
  
        setTimeout(() => {
          this.botonPresionado = false;
          this.mostrarMensaje = false;
        }, 3000);
      }
    }
  }
}