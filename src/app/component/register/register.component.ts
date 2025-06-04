import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <div class="header">
        <h1>Crear Cuenta</h1>
        <p>Únete a nuestra plataforma</p>
      </div>
      
      <div class="user-type-selector">
        <button 
          [class.active]="userType === 'uscomun'"
          (click)="selectUserType('uscomun')"
        >
          Usuario Común
        </button>
        <button 
          [class.active]="userType === 'admin'"
          (click)="selectUserType('admin')"
        >
          Administrador
        </button>
      </div>
      
      <form (ngSubmit)="onSubmit()" class="register-form">
        <div class="form-group">
          <label for="nombre">Nombre Completo</label>
          <input 
            type="text" 
            id="nombre" 
            [(ngModel)]="credentials.nombre" 
            name="nombre" 
            required
          >
        </div>
        
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input 
            type="email" 
            id="email" 
            [(ngModel)]="credentials.email" 
            name="email" 
            required
          >
        </div>
        
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            [(ngModel)]="credentials.password" 
            name="password" 
            required
            minlength="6"
          >
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">Confirmar Contraseña</label>
          <input 
            type="password" 
            id="confirmPassword" 
            [(ngModel)]="credentials.confirmPassword" 
            name="confirmPassword" 
            required
          >
          <small *ngIf="!passwordsMatch() && credentials.confirmPassword" class="error-text">
            Las contraseñas no coinciden
          </small>
        </div>
        
        <button 
          type="submit" 
          [disabled]="loading || !passwordsMatch() || !userType" 
          class="register-button"
        >
          {{ loading ? 'Creando cuenta...' : 'Registrarse' }}
        </button>
      </form>
      
      <div class="footer">
        <p>¿Ya tienes una cuenta? <a (click)="goToLogin()">Inicia sesión</a></p>
      </div>
      
      <div *ngIf="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <div *ngIf="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .header h1 {
      color: #333;
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }
    
    .header p {
      color: #666;
      font-size: 0.9rem;
    }
    
    .user-type-selector {
      display: flex;
      justify-content: center;
      margin-bottom: 1.5rem;
      gap: 1rem;
    }
    
    .user-type-selector button {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      background: #f5f5f5;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .user-type-selector button.active {
      background: #4CAF50;
      color: white;
      border-color: #4CAF50;
    }
    
    .register-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .form-group label {
      font-size: 0.9rem;
      color: #555;
    }
    
    .form-group input {
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
    }
    
    .form-group input:focus {
      outline: none;
      border-color: #4CAF50;
    }
    
    .register-button {
      padding: 0.8rem;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s ease;
      margin-top: 1rem;
    }
    
    .register-button:disabled {
      background: #cccccc;
      cursor: not-allowed;
    }
    
    .register-button:hover:not(:disabled) {
      background: #45a049;
    }
    
    .footer {
      text-align: center;
      margin-top: 1.5rem;
      font-size: 0.9rem;
      color: #666;
    }
    
    .footer a {
      color: #4CAF50;
      text-decoration: none;
      cursor: pointer;
    }
    
    .footer a:hover {
      text-decoration: underline;
    }
    
    .error-message {
      color: #f44336;
      margin-top: 1rem;
      text-align: center;
      font-size: 0.9rem;
    }
    
    .success-message {
      color: #4CAF50;
      margin-top: 1rem;
      text-align: center;
      font-size: 0.9rem;
    }
    
    .error-text {
      color: #f44336;
      font-size: 0.8rem;
    }
  `]
})
export class RegisterComponent {
  credentials = {
    email: '',
    password: '',
    confirmPassword: '',
    nombre: ''
  };
  
  userType: 'uscomun' | 'admin' | null = null;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  selectUserType(type: 'uscomun' | 'admin') {
    this.userType = type;
  }

  passwordsMatch(): boolean {
    return this.credentials.password === this.credentials.confirmPassword;
  }

  onSubmit() {
    if (!this.userType) {
      this.errorMessage = 'Por favor selecciona un tipo de usuario';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.passwordsMatch()) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.loading = false;
      return;
    }

    const userData = {
      email: this.credentials.email,
      password: this.credentials.password,
      nombre: this.credentials.nombre,
      activo: true
    };

    this.authService.register(userData, this.userType).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = '¡Cuenta creada con éxito! Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Error al registrar usuario';
        console.error('Error en registro:', error);
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}