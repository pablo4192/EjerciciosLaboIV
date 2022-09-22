import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../entidades/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore:Firestore) { }

  addUsuario(usuario:Object){                               
    const usrRef = collection(this.firestore, 'usuarios');
    return addDoc(usrRef, usuario);
  }

  getUsuarios(): Observable<Usuario[]>{
    const usrRef = collection(this.firestore, 'usuarios');
    return collectionData(usrRef,{idField: 'id'}) as Observable<Usuario[]>;
  }

  GuardarLogUsuario(mail:string){  
    
    let fecha = new Date();
                          
    const usrRef = collection(this.firestore, 'log_usuarios');
    return addDoc(usrRef, {mail, fecha});
  }
}
