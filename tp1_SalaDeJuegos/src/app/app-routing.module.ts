import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { RegistroComponent } from './components/registro/registro.component';
import { VistaPrincipalComponent } from './components/vista-principal/vista-principal.component';
import {canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { ChatComponent } from './components/chat/chat.component';
import { JuegosComponent } from './juegos/juegos.component';

const routes: Routes = [
  {path: 'registro', component:RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'quienSoy', component: QuienSoyComponent},
  //{path: 'home', component:HomeComponent , ...canActivate(() => redirectUnauthorizedTo(['/registro']))}, //Hacer con guard, visto en clase
  {path: 'home', component:HomeComponent},
  {path: 'inicio', component:VistaPrincipalComponent},
  //{path: 'chat', component:ChatComponent, ...canActivate(() => redirectUnauthorizedTo(['/registro']))},
  {path: 'chat', component:ChatComponent},
  { path: 'juegos', loadChildren: () => import('./juegos/juegos.module').then(m => m.JuegosModule) },  //Cargado con lazy loading (lo trae solo cuando lo llama) Hacer con guard, visto en clase
  {path: '**', component:VistaPrincipalComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
