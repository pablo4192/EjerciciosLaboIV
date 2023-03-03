import { Component, ElementRef, OnInit, Renderer2, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-derrota',
  templateUrl: './modal-derrota.component.html',
  styleUrls: ['./modal-derrota.component.css']
})
export class ModalDerrotaComponent implements OnInit {

  @ViewChild('divDialog') dialogRef:ElementRef|undefined;
  @Output() reiniciarJuego = new EventEmitter<boolean>();


  constructor(private renderer2:Renderer2,
              private router:Router) { }

  ngOnInit(): void {
    this.mostrarModal();
  }

  mostrarModal():void{
    setTimeout(() => {
        this.dialogRef?.nativeElement.showModal();
    });
  }

  salir():void{
    this.dialogRef?.nativeElement.close();
    this.router.navigate(['/juegos']);
  }

  reiniciar():void{
    this.reiniciarJuego.emit(true);
  }



}
