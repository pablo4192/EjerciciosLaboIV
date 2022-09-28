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
  
  //Array donde me traigo los usuarios guardados en la base para luego comparar mail y obtener datos completos del usuario 
  usuariosRegistrados:Usuario[];
  usuariosActivos:Usuario[];
  
  error:boolean = false;
  autocompletado:boolean = false; //Ver!

  constructor(
    private loginService:LoginService,
    private router:Router,
    ) {
      this.usuario = new Usuario();
      this.usuariosRegistrados = [];
      this.usuariosActivos = [];
     }

  ngOnInit(): void {
    //Llamo al metodo que me asigna los usuarios registrados al array de usuarios registrados del componente
    this.GetDatos();


  }

  public Ingresar(){
    
    this.loginService.Login(this.usuario)
    .then(response => {
      this.error = false;

      //Me traigo utilizando mail y contraseña introducidos en el login los datos completos del usuario desde la base
      this.loginService.usuario = this.retornarDatosUsuario(); 
      

      this.loginService.GuardarLogUsuario(this.usuario);
      
      //Guardo en la base los usuarios activos
      this.loginService.agregarUsuarioActivo(this.usuario)
      .then(() => {
        //Asigno los usuarios activos a variable en service para ser visible una vez que el metodo de login service agrego a la base el usuario activo
        this.loginService.usuariosActivos = this.usuariosActivos;

        this.router.navigate(['/home']);
      });

      
      
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

  //Metodo del componente que llama al metodo del servicio login al que me subscribo y me actualiza los usuarios registrados
  private GetDatos(){
     
    this.loginService.getUsuarios().subscribe(usuarios => {this.usuariosRegistrados = usuarios});
    this.loginService.getUsuariosActivos().subscribe(usuarios_act => this.usuariosActivos = usuarios_act);
      
  }

  //Metodo para comparar y encontrar el usuario segun su mail (campo unico) y retornarlo con todos sus datos
  private retornarDatosUsuario(){
    
    return this.usuariosRegistrados.find((u) => u.mail == this.usuario.mail);
  }

  

  

}
