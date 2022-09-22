import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/entidades/usuario';
import { LoginService } from 'src/app/services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{

  usuario:Usuario = new Usuario();
  verContrasenia:string = '';
  
  usuariosRegistrados: Usuario[]; 
  noExiste:boolean = false;
  existe:boolean = false;
  datosIncompletos:boolean = false;
  errorContrasenia:boolean = false;

  
  constructor(
    private usuariosService:UsuariosService, 
    private loginService:LoginService,
    private router:Router)  //Inyeccion de dependencias
  {
    this.usuariosRegistrados = [];
  } 

  ngOnInit(): void {
      this.GetDatos();
      
    
   
  }

  private ReiniciarVariables(){
    this.noExiste = false;
    this.existe = false;
    this.datosIncompletos = false;
    this.errorContrasenia = false;
  }

  public ValidarRegistro(){
    
    if(this.usuario.nombre == '' || this.usuario.apellido == '' || this.usuario.mail == '' || this.usuario.contrasenia == '' || this.verContrasenia == '')
    {
        this.ReiniciarVariables();
        this.datosIncompletos = true;
        return;
    }
    else
    {
        this.ReiniciarVariables();

        this.usuariosRegistrados.forEach((u) => {
          if(u.mail == this.usuario.mail || u.contrasenia == this.usuario.contrasenia)
          {
            this.existe = true;
            return;
          }
        });
    
        if(!this.existe)
        {
          this.ReiniciarVariables();
          
          if(this.verContrasenia == this.usuario.contrasenia)
          {
            this.noExiste = true;
            this.GuardarDatos();
          }
          else
          {
            this.errorContrasenia = true;

          }
        }
    }
  }

  private async GuardarDatos(){

    const usr = {
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      mail: this.usuario.mail,
      contrasenia: this.usuario.contrasenia
    };

    this.loginService.Registro(usr.mail,usr.contrasenia)  //Uso Auth de firebase
    .then(response => {
      console.log(response);
      this.usuariosService.addUsuario(usr); //Guarda en firestore datos del usuario registrado
      this.usuariosService.GuardarLogUsuario(usr.mail); //Guardo el log del usuario registrado
      this.router.navigate(["/home"]);
    })
    .catch(error => console.log(error));
  }

  private GetDatos(){
     
    this.usuariosService.getUsuarios().subscribe(usuarios => {this.usuariosRegistrados = usuarios});
      
  }

  

}
