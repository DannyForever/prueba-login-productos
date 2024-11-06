import { Component } from '@angular/core';
// Ciclo de vida: Para cuando entre, va a ejecutar cosas
import { ViewWillEnter, ViewDidLeave } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Importación de servicio
import { AuthService } from '../service/auth/auth.service';
// Importación para crear suscripción
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login-session',
  templateUrl: './login-session.page.html',
  styleUrls: ['./login-session.page.scss'],
})
export class LoginSessionPage implements ViewWillEnter {
  // Formulario
  public form!: FormGroup; // Inicia vacío
  public loading_block: boolean = false;
  private subLoading!: Subscription;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.form = fb.group({
      // Interface
      user: ['', [Validators.required]], // Vacío inicial
      pass: ['', [Validators.required]]
    })
  }

  // Método inyectable en submit para validar que todo es correcto
  public validateForm(){
    const itsValid = this.form.valid;
    if(!itsValid){
      return
    }
    const data = this.form.getRawValue();
    const user = data['user'];
    const pass = data['pass'];
    // Llamado del servicio
    this.auth.loggingIn(user, pass);
  }

  // Método suscribir
  public ionViewWillEnter(): void {
    // Cuando la página esté cargando
    this.subLoading = this.auth.loading.subscribe(newValue =>{
      this.loading_block = newValue;
    })
  }

  // Método desuscribir
  public ionViewDidLeave(): void {
    if(this.subLoading){
      this.subLoading.unsubscribe(); // Liberar suscripción
    }
  }

}
