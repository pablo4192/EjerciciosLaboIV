import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.component.html',
  styleUrls: ['./puntajes.component.css']
})
export class PuntajesComponent implements OnInit {

  usuarios:Usuario[] = [];
  @ViewChild('tableBody') tableBodyRef:ElementRef|undefined;

  constructor(private loginService:LoginService,
              private renderer2:Renderer2) { }

  ngOnInit(): void {
   this.getDatosUsuarios();
  }

  //Averiguar sobre traer directo desde la base de datos datos especificos (SELECT), y cuan seguro es traer todos los datos incluidos la contraseña
  private getDatosUsuarios():void{
   
    this.loginService.getUsuarios().subscribe((data) => {
      this.usuarios = data.map((u) => {
        u.contrasenia = '';
        u.id = '';
        return u;
      });

      this.crearTablaPuntajes();
    });
  }

  //Hacer un spinner para el load de uausarios
  crearTablaPuntajes():void{
    
    let tr:HTMLTableElement;
    let td:HTMLTableElement;
    let texto:string[] = [];

    this.usuarios.forEach((u) => {
      
      tr = this.renderer2.createElement('tr');
      
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

      this.renderer2.appendChild(this.tableBodyRef?.nativeElement, tr);

    });
    
  }

}
