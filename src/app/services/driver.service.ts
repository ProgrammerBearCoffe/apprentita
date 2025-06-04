import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private baseUrl = 'http://localhost:8080/rentasAuto/driver';

  constructor(private http: HttpClient) {}

  getAllDrivers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAll`);
  }

  getDriverById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getById/${id}`);
  }

  addDriver(driver: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, driver);
  }

  updateDriver(id: number, driver: any): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/update/${id}`, driver);
  }

  deleteDriver(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/delete/${id}`);
  }
}