import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegosComponent } from './juegos.component';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './components/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { TecladoComponent } from './components/teclado/teclado.component';
import { ModalFinJuegoComponent } from './components/modals/modal-fin-juego/modal-fin-juego.component';
import { ModalDerrotaComponent } from './components/modals/modal-derrota/modal-derrota.component';
import { ModalVictoriaComponent } from './components/modals/modal-victoria/modal-victoria.component';
import { ModalPreguntaComponent } from './components/modal-pregunta/modal-pregunta.component';
import { ModalCategoriaComponent } from './components/modal-categoria/modal-categoria.component';
import { ColorCategoriaDirective } from './directives/color-categoria.directive';
import { JuegoPropioComponent } from './components/juego-propio/juego-propio.component';
import { ModalFinJuegoMeteoritosComponent } from './components/modals/modal-fin-juego-meteoritos/modal-fin-juego-meteoritos.component';




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
    ModalPreguntaComponent,
    ModalCategoriaComponent,
    ColorCategoriaDirective,
    JuegoPropioComponent,
    ModalFinJuegoMeteoritosComponent
    
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
  ]
})
export class JuegosModule { }
