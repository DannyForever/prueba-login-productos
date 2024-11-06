import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginSessionPage } from './login-session.page';

const routes: Routes = [
  {
    path: '',
    component: LoginSessionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginSessionPageRoutingModule {}
