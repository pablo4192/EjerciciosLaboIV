import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/entidades/usuario';
import { LoginService } from 'src/app/services/login.service';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{

  usuario:Usuario;
  verContrasenia:string = '';
  
  usuariosRegistrados: Usuario[]; 
  usuariosActivos:Usuario[];

  noExiste:boolean = false;
  existe:boolean = false;
  datosIncompletos:boolean = false;
  errorContrasenia:boolean = false;

  
  constructor( 
    private loginService:LoginService,
    private router:Router)  //Inyeccion de dependencias
  {
    this.usuariosRegistrados = [];
    this.usuariosActivos = [];
    this.usuario = new Usuario();
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
            this.GuardarUsuario();
          }
          else
          {
            this.errorContrasenia = true;

          }
        }
    }
  }
 
  private async GuardarUsuario(){

    this.loginService.Registro(this.usuario)  //Uso Auth de firebase
    .then(response => {
      console.log(response);
      
      //CREACION DE USUARIO ACTIVO, REGISTRADO
      this.loginService.usuario = this.usuario; //Para tener visibles en todos los componentes los datos del usuario logueado
      this.loginService.usuario.nombre = this.usuario.nombre;
      this.loginService.usuario.apellido = this.usuario.apellido;
      

      this.loginService.addUsuario(this.usuario); //Guarda en firestore datos del usuario registrado

      this.loginService.GuardarLogUsuario(this.usuario); //Guardo el log del usuario registrado

      //Guardo en la base los usuarios activos
      this.loginService.agregarUsuarioActivo(this.usuario);

       //Asigno los usuarios activos a variable en service para ser visible
       this.loginService.usuariosActivos = this.usuariosActivos;

      this.router.navigate(["/home"]);
    })
    .catch(error => console.log(error));
  }

  private GetDatos(){
     
    this.loginService.getUsuarios().subscribe(usuarios => {this.usuariosRegistrados = usuarios});
    this.loginService.getUsuariosActivos().subscribe(usuarios_act => this.usuariosActivos = usuarios_act);
  }

  

}
