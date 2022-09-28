import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/entidades/chat';
import { Usuario } from 'src/app/entidades/usuario';
import { ChatService } from 'src/app/services/chat.service';
import { LoginService } from 'src/app/services/login.service';
import { __values } from 'tslib';

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
  
  
  

  constructor(private chatService:ChatService, private loginService:LoginService) { 
    this.chats = [];
    this.usuarioActivo = new Usuario();
    this.arrayUsuariosActivos = [];
    
  }

  ngOnInit(): void {
    this.usuarioActivo = this.loginService.usuario;
    this.ObtenerMensajes();
    this.loginService.getUsuariosActivos().subscribe(data => this.arrayUsuariosActivos = data);

    //console.log(this.arrayUsuariosActivos);
    
  }

  public EnviarMsj(){

    let date = new Date();
    let fecha = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    let hora = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    let mailUsr = this.usuarioActivo?.mail;
    
    let chat = new Chat(this.textoMsj, fecha, hora, mailUsr);
    
    this.chatService.AgregarMsj(chat);

    this.textoMsj = '';

    
  }

  public ObtenerMensajes(){

    this.chatService.getMsjs().subscribe((data) => {
      this.chats = data;
      
      let div = document.getElementById("divChat"); //Ver performance? Cuando Carga por primera vez no scrolea

      if(div)
      div.scrollTop = div.scrollHeight;

      this.chats.forEach((c) => {
        if(c.mailUsr == this.usuarioActivo?.mail)
        {
          c.color = 'green';
        }
        else
        {
          c.color = 'darkslateblue';
        }
      });
      
      if(this.chats.length > 1) 
      {
        this.chats.sort((a,b) => this.OrdenarMsjs(a,b));
      }

      
    });


  }

  
  private OrdenarMsjs(chat1:Chat, chat2:Chat):number{

    let fecha1 = chat1.fecha.split("-"); 
    let fecha2 = chat2.fecha.split("-"); 
    let horario1 = chat1.hora.split(":");
    let horario2 = chat2.hora.split(":");

    let dia1 = parseInt(fecha1[0]);
    let mes1 = parseInt(fecha1[1]);
    let anio1 = parseInt(fecha1[2]);
    let dia2 = parseInt(fecha2[0]);
    let mes2 = parseInt(fecha2[1]);
    let anio2 = parseInt(fecha2[2]);

    let hora1 = parseInt(horario1[0]);
    let minuto1 = parseInt(horario1[1]);
    let segundo1 = parseInt(horario1[2]);
    let hora2 = parseInt(horario2[0]);
    let minuto2 = parseInt(horario2[1]);
    let segundo2 = parseInt(horario2[2]);

    if(anio1 == anio2 && mes1 == mes2 && dia1 == dia2)
    {
      if( hora1 == hora2 && minuto1 == minuto2 && segundo1 < segundo2 ||
          hora1 == hora2 && minuto1 < minuto2 ||
          hora1 < hora2 )
      {
        return -1;
      }
      
      return 0;
    }
    else if( anio1 == anio2 && mes1 == mes2 && dia1 < dia2 ||
             anio1 == anio2 && mes1 < mes2 ||
             anio1 < anio2 )
    {
      return -1;
    }
    
    return 1;
  }


  /*
  private generarColorRandom():string{
    let simbolos, color;
	  simbolos = "0123456789ABCDEF";
	  color = "#";

	  for(var i = 0; i < 6; i++){
		  color = color + simbolos[Math.floor(Math.random() * 16)];
	  }

    return color;
  }
  */
  

  



}
