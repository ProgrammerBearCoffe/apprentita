// src/app/services/car.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = 'http://localhost:8080/rentasAuto/car';

  constructor(private http: HttpClient) {}

  getAllCars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAll`);
  }

  getCarById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getById/${id}`);
  }

  addCar(car: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, car);
  }

  updateCar(id: number, car: any): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/update/${id}`, car);
  }

  deleteCar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/delete/${id}`);
  }
}