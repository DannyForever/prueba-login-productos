import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { loginGuard } from './guard/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-session',
    pathMatch: 'full'
  },
  {
    path: 'login-session',
    loadChildren: () => import('./login-session/login-session.module').then( m => m.LoginSessionPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule),
    canActivate: [loginGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
