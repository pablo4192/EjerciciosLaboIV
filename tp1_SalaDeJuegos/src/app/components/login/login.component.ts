import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mail:string = '';
  contrasenia:string = '';
  error:boolean = false;
  autocompletado:boolean = false; //Ver!

  constructor(
    private loginService:LoginService,
    private router:Router,
    private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    
  }

  public Ingresar(){
    this.loginService.Login(this.mail, this.contrasenia)
    .then(response => {
      this.error = false;
      
      console.log(response);
      this.usuariosService.GuardarLogUsuario(this.mail);
      
      this.router.navigate(['/home']);
    })
    .catch(error => {
      this.error = true;
      console.log(error)}
      );
  }

  public IngresarConGoogle(){
    this.loginService.LoginWithGoogle()
    .then((response) => {
      
      this.error = false;
      
      console.log(response);
      this.usuariosService.GuardarLogUsuario(this.mail);
      
      this.router.navigate(['/home']);
    })
    .catch(error => {
      this.error = true;
      console.log(error)}
      );
  }

  public AutoCompletarLogin(){  //Ver!!
    
    this.autocompletado = true;

    this.mail = 'pascual@gmail.com';
    this.contrasenia = 'asd123';
    
  }

  

}
