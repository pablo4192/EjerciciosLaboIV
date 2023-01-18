import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';


@Component({
  selector: 'app-juego-propio',
  templateUrl: './juego-propio.component.html',
  styleUrls: ['./juego-propio.component.css']
})
export class JuegoPropioComponent implements OnInit {

  @ViewChild('divContainer') containerRef:ElementRef|undefined;

  flagModalReinicio:boolean = false;
  start:boolean = false;

  lanzamientos:number = 50;
  meteoritosALanzar:number = this.lanzamientos;
  
  meteoritos:HTMLDivElement[] = [];
  meteoritosEliminados:number = 0;
  puntaje:number = 0;
  contadorMeteoritos:number = 0;
  meteoritosGrandes:HTMLDivElement[] = [];

  ovni:HTMLDivElement|undefined;
  destruccionMasiva:boolean = false;
  timerDestruccionMasiva:number = 10;

  constructor(private renderer2:Renderer2,
              ) { }

  ngOnInit(): void {
    window.scroll({
      top:0
    });
  }

  ngAfterViewInit():void{
   
  }

  manejarEventoReiniciar():void{
    this.reiniciar();
  }

  reiniciar():void{
    this.eliminarMeteoritos();
    this.renderer2.removeChild(this.containerRef?.nativeElement, this.ovni);
    this.ovni = undefined;
    this.meteoritosALanzar = this.lanzamientos;
    this.meteoritosEliminados = 0;
    this.puntaje = 0;
    this.contadorMeteoritos = 0;
    this.start = false;
    this.flagModalReinicio = false;
    this.destruccionMasiva = false; 

    this.comenzarJuego();
  }

   //Usarlo cuando quiero reiniciar la partida
   eliminarMeteoritos():void{
    
    this.meteoritos.forEach((m) => {
      this.renderer2.removeChild(this.containerRef?.nativeElement, m);
    });

    this.meteoritos.splice(0, this.meteoritos.length);
    this.meteoritosGrandes.splice(0, this.meteoritosGrandes.length);

  }

  comenzarJuego():void{

    if(!this.start)
    {
      this.start = true; 

      window.scroll({
        top: 1000,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        let id = setInterval(()=>{
          
            this.generarMeteoritos();
            this.meteoritosALanzar--;

            if(this.contadorMeteoritos == this.meteoritosALanzar)
            this.generarOvni();
          
            if(this.meteoritosALanzar == 0)
            {
              clearInterval(id);
              setTimeout(() => {
                this.flagModalReinicio = true;
                }, 6000);
            }
            

        },500);
      }, 2000);
  }
    
    
  }

  generarMeteoritos():void{
    
    let meteorito = this.renderer2.createElement('div');

    if(this.contadorMeteoritos == 10 || this.contadorMeteoritos == 20 || this.contadorMeteoritos == 30 || this.contadorMeteoritos == 40)
    {
      this.renderer2.setAttribute(meteorito, 'class', 'meteoritoGrande');
    }
    else
    {
      this.renderer2.setAttribute(meteorito, 'class', 'meteorito');
    }
    
    this.seleccionarDireccionCaida(meteorito);

    this.meteoritos.push(meteorito);
      
    this.renderer2.appendChild(this.containerRef?.nativeElement, meteorito);
    this.renderer2.listen(meteorito, 'mousedown', (e) => {
      this.destruirMeteorito(e);
      
    });

    if(this.destruccionMasiva)
    {
      this.renderer2.listen(meteorito, 'mouseover', (e) => this.destruirMeteorito(e));
    }

    this.contadorMeteoritos++;
    
    }

  generarOvni():void{

    this.ovni = this.renderer2.createElement('div');
    this.renderer2.setAttribute(this.ovni, 'class', 'ovni');
    this.renderer2.appendChild(this.containerRef?.nativeElement, this.ovni);

    this.renderer2.listen(this.ovni, 'mousedown', (e) => this.comenzarDestruccionMasiva(e));
  }

  //VER DELAY EN GENERACION DE METEORITOS CON DESTRUCCION MASIVA
  comenzarDestruccionMasiva($event:any):void{

    this.renderer2.setStyle($event.target, 'background-color', 'white'); //SE puede cambiar imagen de ovni al hacer click

    this.destruccionMasiva = true;

    let id = setInterval(() => {  //Ver si estos casos de setInterval y/o setTimeOut los puedo hacer en una funcion que pueda reutilizar
      this.timerDestruccionMasiva--;
      
      if(this.timerDestruccionMasiva == 0)
      {
        clearInterval(id);
        this.destruccionMasiva = false;
      }
    }, 1000)
  }

  seleccionarDireccionCaida(meteorito:HTMLDivElement):void{
    let random = this.numeroRandom(1,8);

    switch(random){
      case 1:
        this.renderer2.setStyle(meteorito, 'animation', '4s linear 1 trayectoria1');
        break;
        case 2:
          this.renderer2.setStyle(meteorito, 'animation', '4s linear 1 trayectoria2');
          break;
          case 3:
            this.renderer2.setStyle(meteorito, 'animation', '5s linear 1 trayectoria3');
            break;
            case 4:
              this.renderer2.setStyle(meteorito, 'animation', '5s linear 1 trayectoria4');
              break;
              case 5:
                this.renderer2.setStyle(meteorito, 'animation', '5s linear 1 trayectoria5');
                break;
                case 6:
                  this.renderer2.setStyle(meteorito, 'animation', '4s linear 1 trayectoria6');
                  break;
                  case 7:
                    this.renderer2.setStyle(meteorito, 'animation', '4s linear 1 trayectoria7');
                    break;
                    case 8:
                      this.renderer2.setStyle(meteorito, 'animation', '4s linear 1 trayectoria8');
                      break;
    }

  }
    
  destruirMeteorito($event:any):void{
    
    let i_destruido:number;

    if($event.target.className == 'meteorito')
    {
      this.renderer2.removeChild(this.containerRef?.nativeElement, $event.target);

      i_destruido = this.meteoritos.indexOf($event.target);
      this.meteoritos.splice(i_destruido, 1);

      this.meteoritosEliminados++;
    }
    else //meteoritoGrande
    {
      if(this.meteoritosGrandes.includes($event.target))
      {
        this.renderer2.removeChild(this.containerRef?.nativeElement, $event.target);
        let i = this.meteoritosGrandes.indexOf($event.target);

        this.meteoritosGrandes.splice(i, 1);
        
        i_destruido = this.meteoritos.indexOf($event.target);
        this.meteoritos.splice(i_destruido, 1);

        this.meteoritosEliminados++;
      }
      else
      {
        this.renderer2.setStyle($event.target, 'background-color', 'red');
        this.meteoritosGrandes.push($event.target);
      }
    }
      
  }

  numeroRandom(min:number, max:number) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }


}
