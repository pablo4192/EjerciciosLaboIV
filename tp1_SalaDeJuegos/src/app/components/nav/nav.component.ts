import { Component, OnInit, Renderer2 } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private loginService:LoginService,
              private renderer2:Renderer2) { }

  ngOnInit(): void {
   
  }

  GetLogueado(){
     return this.loginService.GetUsuarioActivo();
  }

}
