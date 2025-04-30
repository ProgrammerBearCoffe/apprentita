import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Configuración directa de Firebase (reemplaza con tus datos)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO_ID",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <h2>Crear Cuenta</h2>
      
      <form (ngSubmit)="onSubmit()" class="register-form">
        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            [(ngModel)]="credentials.email" 
            name="email" 
            required
            placeholder="tu@email.com"
          >
        </div>
        
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input 
            type="password" 
            id="password" 
            [(ngModel)]="credentials.password" 
            name="password" 
            required
            placeholder="••••••••"
            minlength="6"
          >
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirmar Contraseña:</label>
          <input 
            type="password" 
            id="confirmPassword" 
            [(ngModel)]="credentials.confirmPassword" 
            name="confirmPassword" 
            required
            placeholder="••••••••"
            minlength="6"
          >
        </div>
        
        <button type="submit" [disabled]="loading || !passwordsMatch()">
          {{ loading ? 'Creando cuenta...' : 'Registrarse' }}
        </button>
      </form>
      
      <div *ngIf="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <div *ngIf="successMessage" class="success-message">
        {{ successMessage }}
      </div>

      <div class="login-link">
        ¿Ya tienes cuenta? <a (click)="goToLogin()">Inicia sesión</a>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 20px;
    }
    
    .register-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
    }
    
    label {
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }
    
    input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }
    
    button {
      padding: 12px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
      transition: background-color 0.3s;
    }
    
    button:hover {
      background-color: #45a049;
    }
    
    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
    
    .error-message {
      color: #d32f2f;
      margin-top: 15px;
      padding: 10px;
      background-color: #fde0e0;
      border-radius: 4px;
      text-align: center;
    }

    .success-message {
      color: #388e3c;
      margin-top: 15px;
      padding: 10px;
      background-color: #e8f5e9;
      border-radius: 4px;
      text-align: center;
    }

    .login-link {
      text-align: center;
      margin-top: 20px;
      color: #555;
    }

    .login-link a {
      color: #4285f4;
      cursor: pointer;
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  credentials = {
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  loading = false;
  errorMessage = '';
  successMessage = '';
  private auth: any;

  constructor(private router: Router) {
    // Inicializar Firebase
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
  }

  passwordsMatch(): boolean {
    return this.credentials.password === this.credentials.confirmPassword;
  }

  async onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Validar que las contraseñas coincidan
    if (!this.passwordsMatch()) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.loading = false;
      return;
    }

    try {
      // Crear usuario con Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.credentials.email,
        this.credentials.password
      );
      
      // Registro exitoso
      this.successMessage = '¡Cuenta creada con éxito! Redirigiendo...';
      console.log('Usuario registrado:', userCredential.user);
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        this.router.navigate(['/dashboard']); // Cambia por tu ruta deseada
      }, 2000);
      
    } catch (error: any) {
      console.error('Error en registro:', error);
      this.errorMessage = this.getErrorMessage(error.code);
    } finally {
      this.loading = false;
    }
  }

  goToLogin() {
    this.router.navigate(['']); // Asegúrate de tener esta ruta configurada
  }

  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Este email ya está registrado';
      case 'auth/invalid-email':
        return 'Email inválido';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres';
      case 'auth/operation-not-allowed':
        return 'Operación no permitida';
      default:
        return 'Error al registrar usuario';
    }
  }
}