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

  usuarioActivo:Usuario|undefined;

  constructor(private loginService:LoginService, private router:Router) 
    {
      this.usuarioActivo = new Usuario();
    }

  ngOnInit(): void {
    
    this.usuarioActivo = this.loginService.usuario;
  }

  logout(){
    this.loginService.Logout()
    .then(() => {
      
      //Consigo datos desde la base, que incluye el id generado por firebase para asi eliminar el registro
      let usuarioAEliminar = this.loginService.usuariosActivos.find((u) => u.mail == this.usuarioActivo?.mail);
  
      this.loginService.eliminarRegistroUsrActivo(usuarioAEliminar); 

      this.loginService.usuario = undefined;
      this.router.navigate(['/inicio']);
    })
    .catch(error => console.log(error));
  }

}
