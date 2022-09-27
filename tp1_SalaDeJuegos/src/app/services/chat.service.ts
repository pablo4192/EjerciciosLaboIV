import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Chat } from '../entidades/chat';
import { Usuario } from '../entidades/usuario';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  

  constructor(private firestore:Firestore) {
    
  }

  AgregarMsj(chat:Chat){                               
    const usrRef = collection(this.firestore, 'chat');
    return addDoc(usrRef, chat);
  }

  getMsjs(): Observable<Chat[]>{
    const usrRef = collection(this.firestore, 'chat');
    return collectionData(usrRef,{idField: 'id'}) as Observable<Chat[]>;
  }

   
}
