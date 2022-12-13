import { Component, OnInit } from '@angular/core';

import { FirestoreService } from 'src/app/services/firestore.service';

import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {

  puntaje:number = 0;
  numeroAnterior: number = 0;
  paloAnterior:string = "";

  flagDerrota = false;
  flagFinJuego = false;

  arrayPalos:string[] = [
    "oro", "espada", "basto", "copa"
  ];

  arrayNumeros:string[] = [
    "1", "2", "3", "4", "5", "6", "7", "10", "11", "12"
  ];

  cartas:string[] = [];

  constructor(private loginService:LoginService,
              private firestoreService:FirestoreService) {

   }

  ngOnInit(): void {
   
    this.darCarta("");
    
  }

  //Capturo el evento del componente modal para reiniciar el juego
  eventoReiniciarModal($event:any){
    this.reiniciar();
  }

  eventoCancelarModal($event:any){
    this.flagFinJuego = $event;
  }

  darCarta(seleccionUsr:string){

    if(!this.flagDerrota) //Todo esto pasa mientras el jugador este jugando, si perdio tiene que reiniciar
    {
      let ruta:string;
      let numero:number;
      let palo:string;

      if(this.cartas.length < 40)
      {
        do{
          let iPalo = this.numeroRandom(0,3);
          let iNumero = this.numeroRandom(0,9);
    
          palo = this.arrayPalos[iPalo];
          numero = parseInt(this.arrayNumeros[iNumero]);

          ruta = "./../../../../assets/img_mayor-menor/" + palo + "/" + numero + ".png";
          
        }while(this.cartas.includes(ruta));

        //Me fijo si el usuario acerto
        this.verificarCarta(seleccionUsr, numero);
        
        //Piso el numero anterior con el nuevo para proxima comparacion
        this.numeroAnterior = numero;

        //Agrego la carta al array a mostrar
        this.cartas.push(ruta);
      }
    }
  }

  private verificarCarta(seleccionUsr:string , numero:number){
    
    switch(seleccionUsr)
    {
      case "Mayor":
        if(numero > this.numeroAnterior)
        {
          this.puntaje++;
          
          if(this.cartas.length == 40)
          {
            this.avisarVictoria();
          }
        }
        else if(numero < this.numeroAnterior)
        {
          this.avisarDerrota();
        }
        break;
        case "Menor":
          if(numero < this.numeroAnterior)
          {
            this.puntaje++;

            if(this.cartas.length == 40)
            {
              this.avisarVictoria();
            }
          }
          else if(numero > this.numeroAnterior)
          {
            this.avisarDerrota();
          }
          break;
          default:
            break;
    }
  }

  avisarDerrota(){
    this.flagDerrota = true;
  }

  avisarVictoria(){
    //Sumar 100 puntos extras por llegar al final habiendo adivinado todas las cartas
    if(this.loginService.usuario != null && !this.flagDerrota)
    {
      this.loginService.usuario.puntaje_acumulado += 100;
      this.firestoreService.updateScoreUsr(this.loginService.usuario);

      this.flagFinJuego = true; //Utilizar otra flag para abrir otro modal para la victoria
    }
  }

  reiniciar(){
    this.cartas.splice(0);
    this.numeroAnterior = 0;
    this.paloAnterior = "";
    this.flagDerrota = false;
    this.flagFinJuego = false;
    this.puntaje = 0;

    this.darCarta("");
    
  }

  retirarse(){ 

    if(this.loginService.usuario != null && !this.flagDerrota && !this.flagFinJuego) 
    {
      this.flagFinJuego = true; 
    }
  }

  numeroRandom(min:number, max:number) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

}
