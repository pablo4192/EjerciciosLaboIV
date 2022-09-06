import { Component, OnInit } from '@angular/core';
import { Usuario } from './../Entidades/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario = new Usuario();

  constructor() { }

  ngOnInit(): void {
  }

}
