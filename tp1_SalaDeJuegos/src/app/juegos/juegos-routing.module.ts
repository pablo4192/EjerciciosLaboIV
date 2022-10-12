import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './components/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { JuegosComponent } from './juegos.component';

const routes: Routes = [
  { path: '', component: JuegosComponent },
  {path: 'ahorcado', component: AhorcadoComponent},
  {path: 'mayor-menor', component: MayorMenorComponent},
  {path: 'preguntados', component: PreguntadosComponent},
  //{path: 'juego-propio', component: },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
