import { Component, ElementRef, OnInit, Renderer2, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-modal-victoria',
  templateUrl: './modal-victoria.component.html',
  styleUrls: ['./modal-victoria.component.css']
})
export class ModalVictoriaComponent implements OnInit {

  @ViewChild('divDialog') dialogRef:ElementRef|undefined;
  @Output() reiniciarJuego = new EventEmitter<boolean>();
  @Input() puntajeUsuario:number = 0;

  constructor(private renderer2:Renderer2,
              private router:Router,
              private loginService:LoginService,
              private firestoreService:FirestoreService) { }

  ngOnInit(): void {
    this.mostrarModal();
  }

  mostrarModal():void{
    setTimeout(() => {
      this.dialogRef?.nativeElement.showModal(); 
    });
  }

  salir():void{
    
    if(this.loginService.usuario != null)
    {
      this.loginService.usuario.puntaje_acumulado += this.puntajeUsuario;
      this.firestoreService.updateScoreUsr(this.loginService.usuario);
      this.dialogRef?.nativeElement.close();
      this.router.navigate(['/juegos']);
    }
    else
    {
      console.log(this.loginService.usuario);
    }

  }

  reiniciar():void{

    if(this.loginService.usuario != null)
    {
      this.loginService.usuario.puntaje_acumulado += this.puntajeUsuario;
      this.firestoreService.updateScoreUsr(this.loginService.usuario);
      this.dialogRef?.nativeElement.close();
      this.reiniciarJuego.emit(true);

    }
    else
    {
      console.log(this.loginService.usuario);
    }

  }

}
