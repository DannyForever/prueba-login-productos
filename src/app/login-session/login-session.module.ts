import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importación formulario reactivo
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginSessionPageRoutingModule } from './login-session-routing.module';

import { LoginSessionPage } from './login-session.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    LoginSessionPageRoutingModule
  ],
  declarations: [LoginSessionPage]
})
export class LoginSessionPageModule {}
