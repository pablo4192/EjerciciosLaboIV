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
    ){
     
      this.usuario = new Usuario();
    }

  ngOnInit(): void {
    
    this.GetDatos();
  }

  public Ingresar(){
    
    this.loginService.Login(this.usuario)
    .then(() => {
      this.error = false;

      this.loginService.GuardarLogUsuario(this.usuario);
      
      //Guardo en la base los usuarios activos
      this.loginService.agregarUsuarioActivo(this.usuario);
      
      this.router.navigate(['/juegos']);
        
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

  private GetDatos(){
     
    this.loginService.getUsuarios().subscribe(usuarios => {
      this.loginService.usuariosRegistrados = usuarios;
      this.loginService.usuario = this.loginService.retornarDatosUsuario(this.usuario); 
    });
    
    this.loginService.getUsuariosActivos().subscribe(usuarios_act => {
      this.loginService.usuariosActivos = usuarios_act;
    });

      
  }


  

  

}
