import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public loginService:LoginService, private router:Router) 
  {
      
  }

  ngOnInit(): void {
    
  }

  logout(){
    this.loginService.Logout()
    .then(() => {
      
      //Consigo datos desde la base, que incluye el id generado por firebase para asi eliminar el registro
      let usuariosAEliminar = this.loginService.usuariosActivos.filter((u) => u.mail == this.loginService.usuario?.mail);
  
      //Array con todas las coincidencias de mail, si lo hago con find me elimina la primer coincidencia solamente. 
      //Al actualizar la pagina tengo que loguearme nuevamente y el usuario_activo logueado anteriormente no se elimina
      usuariosAEliminar.forEach(usr => {
        
        this.loginService.eliminarRegistroUsrActivo(usr); 
      });

      this.loginService.usuario = undefined;
      this.router.navigate(['/inicio']);
    })
    .catch(error => console.log(error));
  }

}
