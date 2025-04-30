import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { NavComponent } from './component/nav/nav.component';
import { RentasComponent } from './component/rentas/rentas.component';
import { ParentComponent } from './component/parent/parent.component';
import { ChildComponent } from './component/child/child.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent,LoginComponent,RentasComponent, RegisterComponent],
  template: `
  <app-nav></app-nav>
  <app-register></app-register>
  
  
  
  
  `,
  styles:[],
})  
export class AppComponent {
  title = 'AppRentita';
}
// <app-header><app-header/>
   // <app-nav></app-nav>    
   // <router-outlet/>
   //<app-rentas></app-rentas>