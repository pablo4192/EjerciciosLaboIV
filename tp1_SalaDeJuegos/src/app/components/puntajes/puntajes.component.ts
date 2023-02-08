import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

import { Usuario } from 'src/app/entidades/usuario';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.component.html',
  styleUrls: ['./puntajes.component.css']
})
export class PuntajesComponent implements OnInit {

  usuarios:Usuario[] = [];
  @ViewChild('tableBody') tableBodyRef:ElementRef|undefined;
  flagSpinner:boolean = true;
  subscription:Subscription|undefined;

  constructor(private loginService:LoginService,
              private firestoreService:FirestoreService,
              private renderer2:Renderer2) { }

  ngOnInit(): void {
   this.getDatosUsuarios();
  }

  ngOnDestroy():void{
    this.subscription?.unsubscribe();
  }

  //Averiguar sobre traer directo desde la base de datos datos especificos (SELECT), y cuan seguro es traer todos los datos incluidos la contraseña
  private getDatosUsuarios():void{
   
    this.subscription = this.loginService.getUsuarios().subscribe((data) => {
      
      this.eliminarTablaPuntajes();
         
      this.usuarios = data.map((u) => {
        u.contrasenia = '';
        return u;
      });
          
      this.ordenarUsuarios();
      this.crearTablaPuntajes();
      
      this.flagSpinner = false;
    });
    
    
  }

  crearTablaPuntajes():void{
    
    let tr:HTMLTableElement;
    let td:HTMLTableElement;
    let texto:string[] = [];
    let puesto:number = 1;

    this.usuarios.forEach((u) => {

      tr = this.renderer2.createElement('tr');

      if(u.mail == this.loginService.usuario?.mail)
      {
        this.renderer2.addClass(tr, 'trUsr');
      }

      td = this.renderer2.createElement('td');
      texto = this.renderer2.createText(`${puesto}`);
      this.renderer2.appendChild(td, texto);
      this.renderer2.appendChild(tr, td);
      puesto++;

      td = this.renderer2.createElement('td');
      texto = this.renderer2.createText(`${u.mail}`);
      this.renderer2.appendChild(td, texto);
      this.renderer2.appendChild(tr, td);

      td = this.renderer2.createElement('td');
      texto = this.renderer2.createText(`${u.nombre}`);
      this.renderer2.appendChild(td, texto);
      this.renderer2.appendChild(tr, td);

      td = this.renderer2.createElement('td');
      texto = this.renderer2.createText(`${u.apellido}`);
      this.renderer2.appendChild(td, texto);
      this.renderer2.appendChild(tr, td);

      td = this.renderer2.createElement('td');
      texto = this.renderer2.createText(`${u.puntaje_acumulado}`);
      this.renderer2.appendChild(td, texto);
      this.renderer2.appendChild(tr, td);

      td = this.renderer2.createElement('td');
      texto = this.renderer2.createText(`${u.ultima_conexion}`);
      this.renderer2.appendChild(td, texto);
      this.renderer2.appendChild(tr, td);

      this.renderer2.appendChild(this.tableBodyRef?.nativeElement, tr);

    });
  }

  private eliminarTablaPuntajes():void{
    while(this.renderer2.selectRootElement(this.tableBodyRef?.nativeElement).hasChildNodes())
    {
      this.renderer2.removeChild(this.tableBodyRef?.nativeElement, this.tableBodyRef?.nativeElement.firstChild);
    }
  }

  private ordenarUsuarios():void{
    this.usuarios.sort((u1,u2) => u2.puntaje_acumulado - u1.puntaje_acumulado);
  }


}
