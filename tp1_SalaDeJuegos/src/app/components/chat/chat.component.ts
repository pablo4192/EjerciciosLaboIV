import { DatePipe } from '@angular/common';
import { Component, OnInit, Renderer2, ElementRef, ViewChild} from '@angular/core';
import { Chat } from 'src/app/entidades/chat';
import { Usuario } from 'src/app/entidades/usuario';
import { ChatService } from 'src/app/services/chat.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chats:Chat[];
  usuarioActivo:Usuario|undefined;
  arrayUsuariosActivos:Usuario[];

  textoMsj:string = '';
  
  @ViewChild('chat') chatRef:ElementRef|undefined;
  
  constructor(private chatService:ChatService, 
              private loginService:LoginService, 
              private renderer2:Renderer2) 
  { 
    this.chats = [];
    this.usuarioActivo = new Usuario();
    this.arrayUsuariosActivos = [];
    
  }

  ngOnInit(): void {
    this.usuarioActivo = this.loginService.usuario;
    
    this.ObtenerMensajes();
    this.loginService.getUsuariosActivos().subscribe(data => this.arrayUsuariosActivos = data);

  }

  ngAfterViewInit():void{
    
    this.renderer2.selectRootElement(window).scroll({top:1000, behavior:'smooth'});

    //Ver!!!!
    setTimeout(() => {
      if(this.chatRef?.nativeElement != null)
        {
          this.renderer2.setProperty(this.chatRef.nativeElement, 'scrollTop', this.chatRef.nativeElement.scrollHeight);
          
        }
      
    }, 2500);
  }

  public EnviarMsj(){

    let fecha = Date.now();

    let mailUsr = this.usuarioActivo?.mail;
    
    let chat = new Chat(this.textoMsj, fecha, mailUsr);
    
    this.chatService.AgregarMsj(chat);

    this.textoMsj = '';

    
  }

  public ObtenerMensajes(){ //Pipe async??

    this.chatService.getMsjs().subscribe((data) => {
      this.chats = data;
      
      this.chats.forEach((c) => {
        if(c.mailUsr == this.usuarioActivo?.mail)
        {
          c.color = '#fff';  
        }
        else
        {
          c.color = '#ccc';
          
          let ancho:number = this.renderer2.selectRootElement(window).innerWidth;

          if(ancho > 576)
          {
            c.left = '50%';
          }
          else
          {
            c.left = '15%';

          }  
        }
      });
      
      if(this.chats.length > 1) 
      {
        this.chats.sort((a,b) => this.ordenarMsjs(a,b));
      }

      if(this.chatRef?.nativeElement != null)
      {
        this.renderer2.setProperty(this.chatRef.nativeElement, 'scrollTop', this.chatRef.nativeElement.scrollHeight);
        
      }
    });
  }

  private ordenarMsjs(c1:Chat, c2:Chat):number{
    return c2.fecha - c1.fecha;
  }
  
}
