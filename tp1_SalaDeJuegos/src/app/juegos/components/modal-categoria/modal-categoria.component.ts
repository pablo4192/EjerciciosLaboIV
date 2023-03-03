import { Component, OnInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.component.html',
  styleUrls: ['./modal-categoria.component.css']
})
export class ModalCategoriaComponent implements OnInit {

  @ViewChild('dialogRef') dialogRef:ElementRef|undefined;
  @Output() categoriaSeleccionada = new EventEmitter();

  constructor(private renderer2:Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit():void{
    //this.renderer2.selectRootElement(this.dialogRef?.nativeElement).showModal(); //Por que lo abre sin contenido???
    this.dialogRef?.nativeElement.showModal();
}

  emitirCategoria($event:any){
    this.dialogRef?.nativeElement.close();
    this.categoriaSeleccionada.emit($event.target.value);
  }

}
