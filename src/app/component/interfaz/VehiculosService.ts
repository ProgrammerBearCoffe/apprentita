import { Injectable } from '@angular/core';
import { Producto } from './interfaz';

@Injectable()
export class VehiculosService {
  private vehiculosRentados: Producto[] = [];

  rentarVehiculo(vehiculo: Producto, ubicacion?: string): void {
    if (ubicacion) {
      vehiculo.Ubicacion = ubicacion;
    }
    this.vehiculosRentados.push(vehiculo);
  }

  getVehiculosRentados(): Producto[] {
    return this.vehiculosRentados;
  }

  estaRentado(id: number): boolean {
    return this.vehiculosRentados.some((v) => v.Id === id);
  }
}