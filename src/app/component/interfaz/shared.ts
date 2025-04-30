import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculosService } from './VehiculosService';

@NgModule({
  imports: [CommonModule],
  providers: [VehiculosService] // Proveemos el servicio aquí
})
export class SharedModule {}