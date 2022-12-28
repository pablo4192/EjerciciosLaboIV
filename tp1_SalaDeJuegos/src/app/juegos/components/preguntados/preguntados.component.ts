import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  detenerMano:boolean = false;

  @ViewChild('ruleta') ruletaRef:ElementRef|undefined;


  constructor(private renderer2:Renderer2) { }

  ngOnInit(): void {
  }

  girarRuleta():void{
    this.detenerMano = true;

    let numeroRandom = this.numeroRandom(1,7);    

    if(this.ruletaRef != null)
    {
      this.renderer2.setStyle(this.ruletaRef.nativeElement, 'animation', '0.25s linear 8 rotate');

      setTimeout(() => {
        this.seleccionarCategoria(numeroRandom);  
      }, 2000);

    }
  }

  seleccionarCategoria(numeroCategoria:number):void{
    switch(numeroCategoria)
    {
      case 1:
        this.renderer2.addClass(this.ruletaRef?.nativeElement, 'historia');
        break;
        case 2:
          this.renderer2.addClass(this.ruletaRef?.nativeElement, 'deportes');
          break;
          case 3:
            this.renderer2.addClass(this.ruletaRef?.nativeElement, 'arte');
            break;
            case 4:
              this.renderer2.addClass(this.ruletaRef?.nativeElement, 'cine');
              break;
              case 5:
                this.renderer2.addClass(this.ruletaRef?.nativeElement, 'eleccionUsr');
                break;
                case 6:
                  this.renderer2.addClass(this.ruletaRef?.nativeElement, 'geografia');
                  break;
                  case 7:
                    this.renderer2.addClass(this.ruletaRef?.nativeElement, 'ciencia');
                    break;
    }

  }

  numeroRandom(min:number, max:number):number {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

}



  




