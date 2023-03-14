import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { LoginService } from 'src/app/services/login.service';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario;
  error:boolean = false;

  autoCompletado:boolean = false;

  @ViewChild('inputUsr') inputUsrRef:ElementRef|undefined;
  @ViewChild('inputPass') inputPassRef:ElementRef|undefined;

  public formulario:FormGroup|any;

  constructor(
    private loginService:LoginService,
    private router:Router,
    private renderer2:Renderer2,
    private fb:FormBuilder
    ){
     
      this.usuario = new Usuario();
      
    }

  ngOnInit(): void {
    
    this.GetDatos();
  
    this.formulario = this.fb.group({
      'usuario': ['', [Validators.required, Validators.email]], 
      'contrasenia': ['', [Validators.required, this.spacesValidator]]
    });
  }

  private spacesValidator(control:AbstractControl):object|null{

    let text:string = <string>control.value;
    let spaces:boolean = text.includes(' ');

    return spaces ? {spaces: true} : null;
  }

  public ingresar(){
    
    if(!this.autoCompletado)
    {
      this.usuario.mail = this.formulario.getRawValue().usuario;
      this.usuario.contrasenia = this.formulario.getRawValue().contrasenia;
    }
    
    this.loginService.Login(this.usuario)
    .then((response) => {
      this.loginService.logueado = true; 

      this.error = false;

      this.loginService.GuardarLogUsuario(this.usuario);
      
      //Guardo en la base los usuarios activos
      this.loginService.agregarUsuarioActivo(this.usuario);
      
      this.router.navigate(['/juegos']);
        
    })
    .catch(error => {
      this.error = true;
      console.log(error)}
      );
  }

  public AutoCompletarLogin(){  

    this.autoCompletado = true;

    this.renderer2.setProperty(this.inputUsrRef?.nativeElement, 'value', 'pascual@gmail.com');
    this.renderer2.setProperty(this.inputPassRef?.nativeElement, 'value', 'asd123');

    this.usuario.mail = 'pascual@gmail.com';
    this.usuario.contrasenia = 'asd123';
      
  }

  private GetDatos(){
    this.loginService.usuario = this.loginService.retornarDatosUsuario(this.usuario); 
    this.loginService.getUsuariosActivos().subscribe(usuarios_act => {
      this.loginService.usuariosActivos = usuarios_act;
    });
  }


  

  

}
