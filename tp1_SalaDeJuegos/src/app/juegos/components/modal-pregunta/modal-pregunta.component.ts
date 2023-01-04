import { Component, OnInit, Renderer2, ViewChild, ElementRef, Input } from '@angular/core';
import { Pregunta } from 'src/app/entidades/pregunta';

@Component({
  selector: 'app-modal-pregunta',
  templateUrl: './modal-pregunta.component.html',
  styleUrls: ['./modal-pregunta.component.css']
})
export class ModalPreguntaComponent implements OnInit {

  @ViewChild('dialogRef') dialogRef:ElementRef|undefined;
  @Input() categoria:string|undefined;
  @Input() urlImg:string|undefined;
  @Input() pregunta:Pregunta|undefined;

  opcion1:string = '';
  opcion2:string = '';
  opcion3:string = '';
  opcion4:string = '';


  constructor(private renderer2:Renderer2) { }

  ngOnInit(): void {
    if(this.pregunta != null){
      this.opcion1 = this.pregunta.opciones[0];
      this.opcion2 = this.pregunta.opciones[1];
      this.opcion3 = this.pregunta.opciones[2];
      this.opcion4 = this.pregunta.opciones[3];
    }
  }

  ngAfterViewInit():void{
      //this.renderer2.selectRootElement(this.dialogRef?.nativeElement).showModal(); //Por que lo abre sin contenido???
      this.dialogRef?.nativeElement.showModal();
  }

}
