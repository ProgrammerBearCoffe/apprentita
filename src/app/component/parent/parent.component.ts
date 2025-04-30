import { Component } from '@angular/core';
import { Producto } from '../interfaz/interfaz';
import { ChildComponent } from '../child/child.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../interfaz/shared';
import { VehiculosService } from '../interfaz/VehiculosService';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent, CommonModule, SharedModule],
  template: `
    <h1>Catálogo de Autos</h1>
    <div class="catalogo">
      <h2>Vehículos Disponibles</h2>
      <div class="vehiculos-disponibles">
        <app-child *ngFor="let p of productosDisponibles" [producto]="p"></app-child>
      </div>

      <h2>Vehículos Rentados</h2>
      <div class="vehiculos-rentados">
        <app-child *ngFor="let p of vehiculosRentados" [producto]="p" [mostrarUbicacion]="true"></app-child>
      </div>
    </div>
  `,
  styles: [`
    /* ESTILOS ORIGINALES PRESERVADOS */
    .catalogo { 
      display: flex; 
      flex-direction: column; 
      gap: 20px; 
    }
    .vehiculos-disponibles, .vehiculos-rentados { 
      display: flex; 
      flex-wrap: wrap; 
      gap: 20px; 
    }
  `]
})
export class ParentComponent {
  public productos: Producto[] = [
    { Id: 4, Name: 'Jeep', Precio: 30000, Imagen: 'jeep.jpg', Matricula: 'JKL-3456' },
    { Id: 3, Name: 'Mercedes', Precio: 25000, Imagen: 'mercedes.jpeg', Matricula: 'GHI-9012' },
    { Id: 2, Name: 'Toyota', Precio: 28000, Imagen: 'toyota.jpg', Matricula: 'DEF-5678' },
    { Id: 1, Name: 'Honda', Precio: 30000, Imagen: 'honda.jpg', Matricula: 'ABC-1234' },
  ];

  get productosDisponibles(): Producto[] {
    return this.productos.filter(p => !this.vehiculosService.estaRentado(p.Id));
  }

  get vehiculosRentados(): Producto[] {
    return this.vehiculosService.getVehiculosRentados();
  }

  constructor(public vehiculosService: VehiculosService) {}
}