import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAsignarFecha]'
})
export class AsignarFechaDirective {

  constructor(private renderer2:Renderer2, private element:ElementRef) { }

  ngAfterViewInit():void{
    this.asignarFecha();
  }

  asignarFecha():void{
    let id = this.renderer2.selectRootElement(this.element.nativeElement).id;
    let option:HTMLOptionElement;
    let texto:string;

    if(id == 'dia'){
      for(let i = 1; i < 32; i++){
        option = this.renderer2.createElement('option');
        if(i < 10)
        texto = this.renderer2.createText(`0${i}`);
        else
        texto = this.renderer2.createText(`${i}`);
        
        this.renderer2.appendChild(option, texto);
        this.renderer2.appendChild(this.element.nativeElement, option);
      }
    }
    else{
      for(let i = 2019; i < 2031; i++){
        option = this.renderer2.createElement('option');
        texto = this.renderer2.createText(`${i}`);

        this.renderer2.appendChild(option, texto);
        this.renderer2.appendChild(this.element.nativeElement, option);
      }
    }
  }
}
