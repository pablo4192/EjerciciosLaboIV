import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { RegistroComponent } from './components/registro/registro.component';
import { VistaPrincipalComponent } from './components/vista-principal/vista-principal.component';

const routes: Routes = [
  {path: 'registro', component:RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'quienSoy', component: QuienSoyComponent},
  {path: '**', component:VistaPrincipalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
