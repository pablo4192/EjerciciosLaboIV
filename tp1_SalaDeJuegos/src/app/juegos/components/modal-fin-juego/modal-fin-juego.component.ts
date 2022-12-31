import { Component, ElementRef, OnInit, Renderer2, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-modal-fin-juego',
  templateUrl: './modal-fin-juego.component.html',
  styleUrls: ['./modal-fin-juego.component.css']
})
export class ModalFinJuegoComponent implements OnInit {

  @ViewChild('divDialog') dialogRef:ElementRef|undefined;
  @Output() reiniciarJuego = new EventEmitter<boolean>();
  @Output() cambiarFlag = new EventEmitter<boolean>();
  
  
  @Input() puntajeUsuario:number = 0;

  constructor(private renderer2:Renderer2,
              private router:Router,
              private loginService:LoginService,
              private firestoreService:FirestoreService) { 
    
  }

  ngOnInit(): void {

    this.mostrarModal();
  }


  mostrarModal(){

    setTimeout(() => {
      this.dialogRef?.nativeElement.showModal();
     
    });

  }

  reiniciar(){

    if(this.loginService.usuario != null)
    {
      this.loginService.usuario.puntaje_acumulado += this.puntajeUsuario;

      this.firestoreService.updateScoreUsr(this.loginService.usuario);
      
      this.dialogRef?.nativeElement.close();
      this.reiniciarJuego.emit(true);
    }
    else
    {
      console.log(`loginService.usuario: ${this.loginService.usuario}`);
    }
  }

  salir(){

    if(this.loginService.usuario != null)
    {
      this.loginService.usuario.puntaje_acumulado += this.puntajeUsuario;

      this.firestoreService.updateScoreUsr(this.loginService.usuario);

      this.dialogRef?.nativeElement.close();
      this.router.navigate(['/juegos']);
    }
    else
    {
      console.log(`loginService.usuario: ${this.loginService.usuario}`);
    }
  }

  cancelar(){
    this.cambiarFlag.emit(false);
  }
    



}
