import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   
  }

  GetLogueado(){
    
    let logueado = localStorage.getItem('logueado');
    if(logueado == 'true')
    return true;
    else
    return false;
  }

}
