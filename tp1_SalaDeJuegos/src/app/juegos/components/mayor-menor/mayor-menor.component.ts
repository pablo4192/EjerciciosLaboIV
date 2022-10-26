import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';
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

  arrayPalos:string[] = [
    "oro", "espada", "basto", "copa"
  ];

  arrayNumeros:string[] = [
    "1", "2", "3", "4", "5", "6", "7", "10", "11", "12"
  ];

  cartas:string[] = [];

  constructor(private loginService:LoginService) {

   }

  ngOnInit(): void {
    //Doy la primer carta al entrar al juego
    this.darCarta("");
    
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
    
    console.log(this.numeroAnterior);
    console.log(numero);
    console.log("--------------");

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
     //Que aparesca un div preguntando si quiere reiniciar
    //En caso de que si reiniciar valores de numAnterior, paloAnterior, cartas, puntaje y dar carta
    //En caso de que no redirigir a juegos
  }

  reiniciar(){
    this.cartas.splice(0);
    this.numeroAnterior = 0;
    this.paloAnterior = "";
    this.flagDerrota = false;

    this.darCarta("");
    
  }

  retirarse(){

    //Sumar el puntaje obtenido en este juego al puntaje general del usuario
    if(this.loginService.usuario != null)
    {
      this.loginService.usuario.puntaje_acumulado += this.puntaje;
      //Actualizarlo en la base de datos
    }


    
    //Que aparesca un div preguntando si quiere reiniciar
    //En caso de que si reiniciar valores de numAnterior, paloAnterior, cartas, puntaje y dar carta
    //En caso de que no redirigir a juegos
  }

  numeroRandom(min:number, max:number) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

}
