import { Component, OnInit, Renderer2, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-modal-pregunta',
  templateUrl: './modal-pregunta.component.html',
  styleUrls: ['./modal-pregunta.component.css']
})
export class ModalPreguntaComponent implements OnInit {

  @ViewChild('dialogRef') dialogRef:ElementRef|undefined;
  @Input() categoria:string|undefined;
  @Input() urlImg:string|undefined;

  constructor(private renderer2:Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit():void{
      //this.renderer2.selectRootElement(this.dialogRef?.nativeElement).showModal(); //Por que lo abre sin contenido???
      this.dialogRef?.nativeElement.showModal();
  }

}
