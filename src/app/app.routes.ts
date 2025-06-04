import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { HomeAdminComponent } from './component/home-admin/homeadmin.component';
import { RentasComponent } from './component/rentas/rentas.component';
import { RentadosComponent } from './component/rentados/rentados.component';
import { DisponibilidadComponent } from './component/disponibilidad/disponibilidad.component';
import { VehiculosComponent } from './component/vehiculos/vehiculos.component';
import { ConductoresComponent } from './component/conductores/conductores.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'homeadmin', component: HomeAdminComponent },
  { path: 'rentas', component: RentasComponent },
  { path: 'rentados', component: RentadosComponent },
  { path: 'disponibilidad', component: DisponibilidadComponent },
  { path: 'vehiculos', component: VehiculosComponent },
  { path: 'conductores', component: ConductoresComponent },
];