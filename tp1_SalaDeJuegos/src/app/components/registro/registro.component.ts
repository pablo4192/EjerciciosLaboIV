import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { LoginService } from 'src/app/services/login.service';
import { Validators, AbstractControl, FormBuilder, FormGroup, FormControl } from '@angular/forms';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{

  usuario:Usuario;
  verContrasenia:string = '';

  public formulario:FormGroup|any;
    
  constructor(private loginService:LoginService,
              private router:Router,
              private fb:FormBuilder
    ) 
  {
    this.usuario = new Usuario();
  } 

  ngOnInit(): void {
      this.GetDatos();

      this.formulario = this.fb.group({
        'nombre': ['', [Validators.required, this.spacesValidator, Validators.pattern('[a-zA-Z]{1,20}')]],
        'apellido': ['', [Validators.required, this.spacesValidator, Validators.pattern('[a-zA-Z]{1,20}')]],
        'edad': ['', [Validators.required, Validators.pattern('[0-9]{1,2}')]],
        'mail': ['', [Validators.required, Validators.email, this.spacesValidator]],
        'contrasenia': ['', [Validators.required, this.spacesValidator]],
        'verifContra': ['', [Validators.required]]
      });
  }

  public registrarse():void{
    this.usuario = this.formulario.getRawValue() as Usuario;
    this.GuardarUsuario();
  }

  private async GuardarUsuario(){

    this.loginService.Registro(this.usuario)  //Uso Auth de firebase
    .then(() => {
      
      //Guarda en firestore datos del usuario registrado
      this.loginService.addUsuario(this.usuario); 
      
      //Guardo el log del usuario registrado
      this.loginService.GuardarLogUsuario(this.usuario); 

      //Guardo en la base los usuarios activos
      this.loginService.agregarUsuarioActivo(this.usuario);

      this.router.navigate(["/juegos"]);
     
    })
    .catch(error => console.log(error));
    
  }

  private GetDatos(){
     
    this.loginService.getUsuarios().subscribe(usuarios => {
      this.loginService.usuariosRegistrados = usuarios;
      this.loginService.usuario = this.loginService.retornarDatosUsuario(this.usuario);
    });

    this.loginService.getUsuariosActivos().subscribe(usuarios_act => this.loginService.usuariosActivos = usuarios_act);
  }
 
  private spacesValidator(control:AbstractControl):object|null{

    let text:string = <string>control.value;
    let spaces:boolean = text.includes(' ');

    return spaces ? {spaces: true} : null;
  }


  

}
