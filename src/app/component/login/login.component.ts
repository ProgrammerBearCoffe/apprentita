import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';

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
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <h2>Iniciar Sesión</h2>
      
      <form (ngSubmit)="onSubmit()" class="login-form">
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
          >
        </div>
        
        <button type="submit" [disabled]="loading">
          {{ loading ? 'Cargando...' : 'Iniciar Sesión' }}
        </button>
      </form>
      
      <div *ngIf="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .login-container {
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
    
    .login-form {
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
      background-color: #4285f4;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
      transition: background-color 0.3s;
    }
    
    button:hover {
      background-color: #3367d6;
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
  `]
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  };
  
  loading = false;
  errorMessage = '';
  private auth: any;

  constructor(private router: Router) {}

  ngOnInit() {
    // Inicializar Firebase directamente aquí
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
  }

  async onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    
    try {
      await signInWithEmailAndPassword(
        this.auth,
        this.credentials.email,
        this.credentials.password
      );
      
      // Redirigir al dashboard después de login exitoso
      this.router.navigate(['/dashboard']);
      
    } catch (error: any) {
      console.error('Error en login:', error);
      this.errorMessage = this.getErrorMessage(error.code);
    } finally {
      this.loading = false;
    }
  }

  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/invalid-email': return 'Email inválido';
      case 'auth/user-disabled': return 'Usuario deshabilitado';
      case 'auth/user-not-found': return 'Usuario no encontrado';
      case 'auth/wrong-password': return 'Contraseña incorrecta';
      default: return 'Error al iniciar sesión';
    }
  }
}