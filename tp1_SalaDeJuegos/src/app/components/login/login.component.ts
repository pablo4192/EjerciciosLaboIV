import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { LoginService } from 'src/app/services/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario;
  
  error:boolean = false;
  autocompletado:boolean = false; //Ver!

  constructor(
    private loginService:LoginService,
    private router:Router,
    ) {
      this.usuario = new Usuario();
     }

  ngOnInit(): void {
    
  }

  public Ingresar(){
    
    this.loginService.Login(this.usuario)
    .then(response => {
      this.error = false;
      
      //TENER EN LOGINSERVICE UNA FUNCION QUE ME TRAIGA LOS DATOS COMPLETOS DEL USUARIO QUE SE LOGUEA!!!!!!!

      //CREACION DE USUARIO ACTIVO, REGISTRADO
      this.loginService.usuario = this.usuario; //Para tener visibles en todos los componentes los datos del usuario logueado
      //this.loginService.usuario.nombre = this.usuario.nombre;
      //this.loginService.usuario.apellido = this.usuario.apellido;
      
     console.log(this.usuario);
     console.log(this.loginService.usuario);

      this.loginService.GuardarLogUsuario(this.usuario);
      this.router.navigate(['/home']);
    })
    .catch(error => {
      this.error = true;
      console.log(error)}
      );
  }

  /*
  public IngresarConGoogle(){
    this.loginService.LoginWithGoogle()
    .then((response) => {
      
      this.error = false;
      
      console.log(response);
      this.loginService.GuardarLogUsuario(this.mail);
      
      this.router.navigate(['/home']);
    })
    .catch(error => {
      this.error = true;
      console.log(error)}
      );
  }
  */

  public AutoCompletarLogin(){  //Ver!!
    
    this.autocompletado = true;

    this.usuario.mail = 'pascual@gmail.com';
    this.usuario.contrasenia = 'asd123';
    
  }

  

}
