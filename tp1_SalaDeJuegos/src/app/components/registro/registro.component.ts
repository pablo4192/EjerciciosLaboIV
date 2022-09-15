import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{

  usuario:Usuario = new Usuario();
  verContrasenia:string = "";
  

  constructor(private usuariosService:UsuariosService) { } //Inyeccion de dependencias

  ngOnInit(): void {
    this.GetDatos();
   
  }

  async GuardarDatos(){

    const usr = {
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      mail: this.usuario.mail,
      contrasenia: this.usuario.contrasenia
    };

    let response = await this.usuariosService.addUsuario(usr);
    console.log(response);
  }

  private GetDatos(){
      this.usuariosService.getUsuarios().subscribe(usuarios => { 
      console.log(usuarios);
    })
  }

}
