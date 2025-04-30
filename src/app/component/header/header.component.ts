import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule, RouterOutlet],
  template: `
<main class="main"> 
    <div class="divprincipal">
        <header>
            <div class="imagenes">
                <img src="nike.png" class="nike">
                <img src="jordan.png" class="jordan">
            </div>
            <h1 class="css-ingresa">
                Ingresa tu correo electrónico para unirte o iniciar sesión.
            </h1>
        </header>
        <div class="css-llenado">
            <div class="css-pais">
                <span>México</span>
                <div class="css-cambiar">
                    <p class="Cambiar">Cambiar</p>
                    <select class="select">
                    </select>
                </div>
            </div>
        </div>
        <div>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">

                <input class="input" type="text" formControlName="nombre" placeholder="Nombre*" required>
                <input class="input" type="text" formControlName="telefono" placeholder="Teléfono*" required>
                <input class="input" type="email" formControlName="correo" placeholder="Correo Electrónico*" required>
                <input class="input" type="text" formControlName="contacto" placeholder="Contacto*" required>
                
                <label> Actividad
                    <select formControlName="sector" required>
                        <option value="">Selecciona una opción</option>
                        <option value="comercio">Comercio</option>
                        <option value="servicio">Servicio</option>
                        <option value="educacion">Docencia</option>
                    </select>
                </label>

                <label> Lenguajes de programación que utilizas
                    <select multiple formControlName="leng">
                        <option value="angular">Angular</option>
                        <option value="javascript">JavaScript</option>
                    </select>
                </label>

                <button type="submit" class="Boton"><strong>Continuar</strong></button>
            </form>
        
            <h2>Valores</h2>
            <h3>Interpolación | JSON</h3>
            <pre>{{ form.value | json }}</pre>
        </div>
        <div>
            <div class="css-cuadroterm">
                <div class="cuadroterm2">Al continuar, aceptas la
                    <a target="_blank" class="polter" rel="noopener noreferrer"
                        href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=privacyPolicy&country=MX&language=es&requestType=redirect&uxId=4fd2d5e7db76e0f85a6bb56721bd51df">
                        Política de privacidad</a>
                    y los
                    <a target="_blank" class="polter" rel="noopener noreferrer"
                        href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=termsOfUse&country=MX&language=es&requestType=redirect&uxId=4fd2d5e7db76e0f85a6bb56721bd51df">
                        Términos de uso</a>
                    de Nike.
                </div>
            </div>
        </div>
    </div>
</main>
  `,
   styles: [`
   .main {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    box-sizing: border-box;
    position: relative;
}

.divprincipal {
    max-width: 460px;
    min-width: 250px;
    width: 100%;
    padding: 1rem;
}

.imagenes {
    height: 80px;
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: flex-start;
    gap: 10px;
}

.nike {
    width: 48px; 
    height: 15px;
}

.jordan {
    width: 38px; 
    height: 38px;
}

.divboton {
    display: flex;
    justify-content: right;
    margin-top: 10px;
}

.Boton {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 24px;
    background-color: black;
    color: white;
    border-radius: 30px;
    width: 121.63px;
    font-size: medium;
    line-height: 16px;
    cursor: pointer;
    border: 1.5px solid black;
}

.Cambiar {
    color: gray;
    text-decoration: underline;
    font-size: medium;
    display: inline-block;
    width: max-content;
}

.select {
    cursor: pointer;
    opacity: 0;
    position: absolute;
    font-size: medium;
    font-family: inherit;
}

.input {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    border-radius: 8px;
    font: 400 1rem/1.5 'Helvetica Now Text', Helvetica, Arial, sans-serif;
    padding: 16px 12px;
    color: #111111;
    background: transparent;  
    margin-bottom: 10px;
}

.css-cuadroterm {
    width: 90%;
    margin: 24px 0px;
    text-align: left;
}

.cuadroterm2 {
    color: gray;
}

.polter {
    color: gray;
    cursor: pointer;
    text-decoration: underline;
}

.css-ingresa {
    font-size: 28px;
    font-weight: normal;
    line-height: 32px;
    margin-top: 0;
    margin-bottom: 12px;
    text-align: left;
}

.css-cambiar {
    max-width: min-content;
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: -18px;
}

.css-pais {
    min-height: 40px;
    position: relative;
    margin-bottom: 16px;
    padding-top: 2px;
    display: flex;
    justify-content: space-between;
    overflow: clip;
}

.css-llenado {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

//Responsivo 
@media (max-width: 1024px) {
    .divprincipal {
        max-width: 600px;
        padding: 0 20px;
    }
}

@media (max-width: 768px) {
    .divprincipal {
        vertical-align: top;
        max-width: 100%;
        padding: 0 -20px;
    }

    .imagenes {
        justify-content: flex-start;
    }

    .css-ingresa {
        font-size: 24px;
        text-align: left;
    }

    .input {
        font-size: 16px;
    }

    .main{
        align-items: flex-start;
    }
}

@media (max-width: 480px) {
    .css-ingresa {
        font-size: 22px;
        line-height: 28px;
        text-align: left;
    }

    .input {
        height: 45px;
        font-size: 14px;
    }

    .Boton {
        width: 100%;
        font-size: 14px;
    }

    .css-cuadroterm {
        width: 100%;
    }

    .main{
        vertical-align: top;
    }
}
     `]
})
export class HeaderComponent {
  title = 'Mycarp';

  //manejar formularios reactivos que permite agrupar
  form = new FormGroup({
    nombre: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    contacto: new FormControl('', Validators.required),
    sector: new FormControl('', Validators.required),
    leng: new FormControl('', Validators.required)
  });
  

//maneja la validación del formulario de manera reactiva en Angular.
    onSubmit() {
      console.log(this.form.status); // Agregar esto para ver si el formulario está en 'VALID'
      if (this.form.valid) {
        console.log('Formulario enviado:', this.form.value);
      } else {
        alert('Todos los campos son obligatorios.');
      }
    }
  }