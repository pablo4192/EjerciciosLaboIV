import { Injectable } from '@angular/core';
import { Firestore, updateDoc, doc } from '@angular/fire/firestore';
import { Usuario } from '../entidades/usuario';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore:Firestore) { 

  }

  updateScoreUsr(usuario:Usuario){ 
    const usrRef = doc(this.firestore, `usuarios/${usuario.id}`);
    return updateDoc(usrRef, {puntaje_acumulado: usuario.puntaje_acumulado});

  }

  
}
