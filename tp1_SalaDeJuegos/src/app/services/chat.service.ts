import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Chat } from '../entidades/chat';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  

  constructor(private firestore:Firestore) {
    
  }

  AgregarMsj(chat:Chat){    
    
    const chatObj = {
      texto: chat.texto,
      fecha: chat.fecha,
      mailUsr: chat.mailUsr
    }
    
    const usrRef = collection(this.firestore, 'chat');
    return addDoc(usrRef, chatObj);
  }

  getMsjs(): Observable<Chat[]>{
    const usrRef = collection(this.firestore, 'chat');
    return collectionData(usrRef,{idField: 'id'}) as Observable<Chat[]>;
  }

   
}
