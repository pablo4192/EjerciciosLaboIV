import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Palabra } from 'src/app/entidades/palabra';
import { Usuario } from 'src/app/entidades/usuario';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  valorTecla:string = '';
  palabra:Palabra|any;
  incognita:string = '';
  rutaImgAhorcado = "./../../../../assets/img_ahorcado/ahorcado0.jpg";
  intentos = 6;
  flagBtnReiniciar = false;
  txtFinalPartida:string = '';
  pistas:string[] = [];
  timer:number = 60;
  idInterval:any;

  palabras:string[] = ['SOMBRILLA', 'AUTOPISTA', 'BIBLIOTECA', 'ABROCHADORA', 'ESCALERA'];
  
  arrayPalabras:Palabra[] = [
    new Palabra('SOMBRILLA', ['Se usa en la playa', 'Nos proteje sel sol']), 
    new Palabra('AUTOPISTA', ['A veces agiliza el viaje, a veces no', 'Se paga peaje']),
    new Palabra('BIBLIOTECA', ['Grandes aventuras viviras o cosas utiles aprenderas', 'La tecnologia reemplazo este lugar'])
  ];

  usuarioActivo:Usuario|undefined;

  constructor(private loginService:LoginService) {
    this.usuarioActivo = loginService.usuario;
  }

  ngOnInit(): void {
    this.escogerPalabra();
    
  }

  ejecutarTimer(){
   
    this.idInterval = setInterval(() => {
    if(this.timer > 0)
    {
      this.timer--;
    }
    else
    {
      this.avisarDerrota();
      clearInterval(this.idInterval);
    }

   }, 1000);
   
  }

  escogerPalabra(){
    
    console.log(this.arrayPalabras);

    let i = this.numeroRandom(0,2);
    this.palabra = this.arrayPalabras[i];

    for(let i = 0; i < this.palabra.nombre.length; i++)
    {
      this.incognita += '-';
    }

    this.ejecutarTimer();
  }

  numeroRandom(min:number, max:number) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

  controlarEventoTeclado($event:any){
    this.valorTecla = $event;

    if(!this.flagBtnReiniciar)
    this.verificarLetraIngresada();

  }

  private verificarLetraIngresada(){
    
    let flagLetraErronea = true;
    let arrayPalabra = this.palabra.nombre.split('');
    let arrayIncognita = this.incognita.split('');

    for(let i = 0; i < arrayPalabra.length; i++)
    {
      if(arrayPalabra[i] == this.valorTecla)
      {
        arrayIncognita[i] = this.valorTecla;
        flagLetraErronea = false;
      }
    }

    if(flagLetraErronea)
    {
      this.intentos --;
      this.dibujarAhorcado();
    }
    else
    {
      this.incognita = arrayIncognita.join('');
      
      if(this.incognita == this.palabra.nombre)
      {
        this.avisarVictoria();
      }
    }
  }

  private dibujarAhorcado(){
    switch(this.intentos)
    {
      case 5:
        this.rutaImgAhorcado = "./../../../../assets/img_ahorcado/ahorcado1.jpg";
        break;
        case 4:
          this.rutaImgAhorcado = "./../../../../assets/img_ahorcado/ahorcado2.jpg";
          break;
          case 3:
            this.rutaImgAhorcado = "./../../../../assets/img_ahorcado/ahorcado3.jpg";
            this.darPista(0);
            break;
            case 2:
              this.rutaImgAhorcado = "./../../../../assets/img_ahorcado/ahorcado4.jpg";
              break;
              case 1:
                this.rutaImgAhorcado = "./../../../../assets/img_ahorcado/ahorcado5.jpg";
                this.darPista(1);
                break;
                default:
                  this.rutaImgAhorcado = "./../../../../assets/img_ahorcado/ahorcado6.jpg";
                  this.flagBtnReiniciar = true;
                  this.avisarDerrota();

    }
  }

 private darPista(indexPista:number){
    this.pistas.push(this.palabra.pistas[indexPista]);

 }

  reiniciarJuego(){
    this.rutaImgAhorcado = "./../../../../assets/img_ahorcado/ahorcado0.jpg";
    this.incognita = '';
    this.txtFinalPartida = '';
    this.pistas.splice(0);
    this.escogerPalabra();
    this.intentos = 6;
    this.flagBtnReiniciar = false;
    this.timer = 60;

  }

  avisarVictoria(){
    clearInterval(this.idInterval);
    this.txtFinalPartida = 'GANASTE BEBOTE!!!'
    this.flagBtnReiniciar = true;
  }

  avisarDerrota(){
    clearInterval(this.idInterval);
    this.txtFinalPartida = 'PERDISTE REY, INTENTA DE NUEVO!!!'
    this.flagBtnReiniciar = true;
  }
}
