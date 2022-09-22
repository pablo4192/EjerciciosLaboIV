import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/entidades/chat';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chats:Chat[];

  textoMsj:string = '';

  constructor(private chatService:ChatService) { 
    this.chats = [];
    this.ObtenerMensajes();
  }

  ngOnInit(): void {

  }

  public EnviarMsj(){

    let date = new Date();
    let fecha = date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear();
    let hora = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    let chat = new Chat(this.textoMsj, fecha, hora);
    const objeto = {          //Como hago para enviarlo como Chat y no como un objeto generico
      texto: chat.texto,
      fecha: chat.fecha,
      hora: chat.hora
    }
    
    this.chatService.AgregarMsj(objeto);
  }

  public ObtenerMensajes(){
    this.chatService.getMsjs().subscribe((data) => this.chats = data);
  }

}
