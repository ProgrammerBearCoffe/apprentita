import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="navbar">
      <div class="navbar-logo">
        <img src="iconoCarro.jpg" class="logo-img" alt="Logo">
      </div>
      
      <div class="navbar-menu">
        <ul>
          <li><a routerLink="/lo-nuevo">Lo nuevo</a></li>
          <li><a routerLink="/hombre">Hombre</a></li>
          <li><a routerLink="/mujer">Mujer</a></li>
          <li><a routerLink="/nino">Niño/a</a></li>
          <li><a routerLink="/ofertas">Ofertas</a></li>
          <li><a routerLink="/snkrs">SNKRS</a></li>
        </ul>
      </div>

      <div class="navbar-user">
        <a href="#">Buscar tienda</a>
        <a href="#">Ayuda</a>
        <a href="#">Únete</a>
        <a href="#">Iniciar sesión</a>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      background-color: #fff;
      border-bottom: 1px solidrgb(32, 55, 78);
    }

    .navbar-logo {
      flex: 1;
      display: flex;
      align-items: center;
    }

    .logo-img {
      height: 55px;
      width: auto;
    }

    .navbar-menu {
      flex: 3;
      text-align: center;
    }

    .navbar-menu ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
    }

    .navbar-menu ul li {
      margin: 0 25px;
    }

    .navbar-menu ul li a {
      text-decoration: none;
  color: #141414;
  margin-left: 15px;
  font-size: 14px;
    }

    .navbar-menu ul li a:hover {
      text-decoration: underline;
    }

    .navbar-user {
      flex: 2;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .navbar-user a {
      text-decoration: Arial;
      color: #141414;
      margin-left: 15px;
      font-size: 14px;
    }

    .navbar-user a:hover {
      text-decoration: underline;
    }
  `]
})
export class NavComponent {}
