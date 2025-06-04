import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentaService {
  private baseUrl = 'http://localhost:8080/rentasAuto/renta';

  constructor(private http: HttpClient) {}

  agregarRenta(renta: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, renta);
  }

  obtenerRentasRecientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAll`);
  }

  obtenerRentasActivas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getActive`);
  }

  finalizarRenta(id: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/end/${id}`, {});
  }
}