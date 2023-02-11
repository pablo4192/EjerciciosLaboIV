import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css']
})
export class QuienSoyComponent implements OnInit {

  @ViewChild('nombreJuego') nombreJuegoRef:ElementRef|undefined;
  @ViewChild('divExplicacion') divExplicacionRef:ElementRef|undefined;
 
  pag1:boolean = true;
  pag2:boolean = false;
  pag3:boolean = false;

  flagExplicacion:boolean = false;

  constructor(private renderer2:Renderer2) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit():void{
    this.renderer2.listen(window, 'scroll', (w) => this.aplicarEstilos_Scroll(w.currentTarget));
    
  }

  aplicarEstilos_Scroll(wind:Window):void{
    if(wind.scrollY > 20)
    {
      this.renderer2.setStyle(this.nombreJuegoRef?.nativeElement, 'visibility', 'visible');
      this.renderer2.setStyle(this.nombreJuegoRef?.nativeElement, 'animation', '2s linear 1 efectoOpacidad');
      
      this.renderer2.setStyle(this.divExplicacionRef?.nativeElement, 'visibility', 'visible');
      this.renderer2.setStyle(this.divExplicacionRef?.nativeElement, 'animation', '2s linear 1 efectoOpacidad2');
    }
    else
    {
      this.renderer2.setStyle(this.nombreJuegoRef?.nativeElement, 'visibility', 'hidden');
      this.renderer2.removeStyle(this.nombreJuegoRef?.nativeElement, 'animation');

      this.renderer2.setStyle(this.divExplicacionRef?.nativeElement, 'visibility', 'hidden');
      this.renderer2.removeStyle(this.divExplicacionRef?.nativeElement, 'animation');

    }
  }

  mostrarExplicacionJuego():void{
    window.scroll({
      top: 1000,
      behavior: 'smooth'
    });

    this.flagExplicacion = true;
  }

  ocultarExplicacion():void{
    this.flagExplicacion = false;
  }

  pasarPagina():void{
    if(this.pag1)
    {
      this.pag2 = true;
      this.pag1 = false;
    }
    else if(this.pag2)
    {
      this.pag3 = true;
      this.pag2 = false;
    }

  }

  retrocederPagina():void{
    if(this.pag3)
    {
      this.pag3 = false;
      this.pag2 = true;
    }
    else if(this.pag2)
    {
      this.pag2 = false;
      this.pag1 = true;
    }
  }

}
