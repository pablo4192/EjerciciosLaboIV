import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { RegistroComponent } from './components/registro/registro.component';
import { VistaPrincipalComponent } from './components/vista-principal/vista-principal.component';
import { ChatComponent } from './components/chat/chat.component';
import { PuntajesComponent } from './components/puntajes/puntajes.component';
import { UnauthorizedGuard } from './guards/unauthorized.guard';

const routes: Routes = [
  {path: 'home', title: 'Home principal' , component:VistaPrincipalComponent},
  {path: 'registro', title: 'Registrarme' ,component:RegistroComponent},
  {path: 'login', title: 'Login' , component: LoginComponent},
  {path: 'quienSoy', title: 'Quien soy' , component: QuienSoyComponent},
  {path: 'chat', title: 'Chat' , component:ChatComponent},
  {path: 'juegos', title: 'Juegos', loadChildren: () => import('./juegos/juegos.module').then(m => m.JuegosModule), canActivate:[UnauthorizedGuard]},
  {path: 'puntajes', title: 'Puntajes', component:PuntajesComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
