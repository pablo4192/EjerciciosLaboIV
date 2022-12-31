import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegosComponent } from './juegos.component';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './components/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { TecladoComponent } from './components/teclado/teclado.component';
import { ModalFinJuegoComponent } from './components/modal-fin-juego/modal-fin-juego.component';
import { ModalDerrotaComponent } from './components/modal-derrota/modal-derrota.component';
import { ModalVictoriaComponent } from './components/modal-victoria/modal-victoria.component';
import { ModalPreguntaComponent } from './components/modal-pregunta/modal-pregunta.component';


@NgModule({
  declarations: [
    JuegosComponent,
    AhorcadoComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    TecladoComponent,
    ModalFinJuegoComponent,
    ModalDerrotaComponent,
    ModalVictoriaComponent,
    ModalPreguntaComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
