import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../interfaz/interfaz';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="producto">
      <div class="id-producto">{{ producto.Id }}</div>
      <div *ngIf="estaRentado" class="rentado-indicativo">Rentado</div>
      <h2>{{ producto.Name }}</h2>
      <!-- Mostrar matrícula SIEMPRE -->
      <p class="matricula-texto">{{ producto.Matricula }}</p>
      <img [src]="producto.Imagen" alt="{{ producto.Name }}" class="imagen-producto" />
      <p *ngIf="!estaRentado" class="precio-texto">Precio: {{ producto.Precio | currency }}</p>
      <!-- Ubicación solo para rentados -->
      <p *ngIf="mostrarUbicacion && producto.Ubicacion" class="ubicacion-texto">
        Ubicación: {{ producto.Ubicacion }}
      </p>
    </div>
  `,
  styles: [`
    /* ESTILOS ORIGINALES (igual que antes) */
    .producto { 
      position: relative; 
      text-align: center; 
      margin: 10px; 
      padding: 10px; 
      border: 1px solid #ccc; 
      border-radius: 8px; 
      width: 250px; 
      background-color: white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .id-producto { 
      position: absolute; 
      top: 10px; 
      left: 10px; 
      background-color: rgba(0, 0, 0, 0.7); 
      color: white; 
      padding: 5px 10px; 
      border-radius: 5px; 
      font-size: 14px; 
    }
    .rentado-indicativo { 
      position: absolute; 
      top: 10px; 
      right: 10px; 
      background-color: rgba(255, 0, 0, 0.7); 
      color: white; 
      padding: 5px 10px; 
      border-radius: 5px; 
      font-size: 14px; 
    }
    .imagen-producto { 
      width: 100%; 
      height: 150px; 
      object-fit: cover; 
      border-radius: 8px; 
      margin: 10px 0;
    }
    /* Nuevos estilos para matrícula y textos (coherentes con el diseño original) */
    .matricula-texto {
      font-weight: bold;
      color: #333;
      margin: 5px 0;
      font-size: 15px;
    }
    .precio-texto, .ubicacion-texto {
      margin: 5px 0;
      font-size: 14px;
      color: #555;
    }
  `]
})
export class ChildComponent {
  @Input() producto!: Producto;
  @Input() mostrarUbicacion: boolean = false;
  @Input() estaRentado: boolean = false;
}