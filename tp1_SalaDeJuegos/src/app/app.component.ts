import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Usuario } from './entidades/usuario';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tp1_SalaDeJuegos';
  subscripcionUsrReg:Subscription|undefined;
  subscripcionUsrAct:Subscription|undefined;

  
  constructor(private loginService:LoginService){

  }
  
  /**
   * Obtengo los usuarios registrados en la DB y los asigno a propiedad loginService.usuariosRegistrados.
   * Obtengo los usuarios activos desde la DB y los asigno a propiedad loginService.usuariosActivos.
   * Luego verifico si algun usuario se encuentra logueado.
   */
  ngOnInit(): void {

    this.subscripcionUsrReg = this.loginService.getUsuarios().subscribe((data) => {
      this.loginService.usuariosRegistrados = data;
      
      this.checkLogin();
      
    });
    
    this.subscripcionUsrAct = this.loginService.getUsuariosActivos().subscribe((data) => {
      this.loginService.usuariosActivos = data;
      
    });
    
  }

  ngOnDestroy():void{
    this.subscripcionUsrReg?.unsubscribe();
    this.subscripcionUsrAct?.unsubscribe();
  }

  /**
   * Si hay usuario logueado cambio flag loginService.logueado a true (utilizada por unauthorizedGuard para dar acceso a ruta).
   * Usando current.user.email obtengo datos del documento del usuario registrado (id de auth != id del documento).
   *Redirijo a '/juegos', si usrAct == null redirijo a '/home'. 
  */
  checkLogin():void{

    const usrAct = this.loginService.GetUsuarioActivo();
    let usr:Usuario|undefined;
    
    if(usrAct){
      this.loginService.logueado = true;
      
      usr = this.obtenerDatosUsrActivo(usrAct?.email as string);
      
      usr ? this.asignarDatosUsrActivo(usr) : console.log('Problema al asignar los datos al usuario activo');
    
    }   
  }
 
  /**
   * 
   * @param mail del usuario logueado.
   * @returns usuario con datos del documento registrado en DB.
   */
  obtenerDatosUsrActivo(mail:string):Usuario|undefined{
    let usr = new Usuario();
    usr.mail = mail;

    return this.loginService.retornarDatosUsuario(usr);
  }

  /**
   * Asigno a loginService.usuario (visible en toda la app) el usuario activo (permite tener los datos visibles cuando se actualiza la pagina).
   * @param usuario usuario logueado.
   */
  asignarDatosUsrActivo(usuario:Usuario):void{
    this.loginService.usuario = usuario; 
  }
  
  
}
