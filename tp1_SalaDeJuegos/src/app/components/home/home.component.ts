import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  

  constructor(
    public loginService:LoginService,
    private router:Router) { 
      
    }

  ngOnInit(): void {
  }

  public Logout(){
    this.loginService.Logout()
    .then(() => {
      console.log(this.loginService.usuario);
      this.loginService.usuario = undefined;
      this.router.navigate(['/inicio']);
    })
    .catch(error => console.log(error));
  }

  GetUsuarioActivo(){
     
    return this.loginService.GetUsuarioActivo()?.email;
  }

}
