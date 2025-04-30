import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { RegisterComponent } from './component/register/register.component';
import { NavComponent } from './component/nav/nav.component';
import { RentasComponent } from './component/rentas/rentas.component';
import { ParentComponent } from './component/parent/parent.component';
import { ChildComponent } from './component/child/child.component';
import { ErrorComponent } from './component/error/error.component';
import { LoginComponent } from './component/login/login.component';
export const routes: Routes = [
    {path:'',component: Component},
    {path:'registro',component:RegisterComponent},
    {path:'nav', component:NavComponent},
    {path: 'rentas', component:RentasComponent},
    {path: 'Parent', component:ParentComponent},
    {path: 'Child', component:ChildComponent},
    {path: '**', component:ErrorComponent},
    {path: 'login', component: LoginComponent}
];
