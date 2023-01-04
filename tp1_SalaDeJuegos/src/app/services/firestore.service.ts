import { Injectable } from '@angular/core';
import { Firestore, updateDoc, doc, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Palabra } from '../entidades/palabra';
import { Pregunta } from '../entidades/pregunta';
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

  addPalabra(palabra:Palabra){  
    
    const p = {
      nombre: palabra.nombre,
      pistas: palabra.pistas
    };
    
    const usrRef = collection(this.firestore, 'palabras');
    return addDoc(usrRef, p);
  }

  getPalabras(): Observable<Palabra[]>{
    const pRef = collection(this.firestore, 'palabras');
    return collectionData(pRef,{idField: 'id'}) as Observable<Palabra[]>;
  }

  addPregunta(pregunta:Pregunta){  
    
    const p = {
      categoria: pregunta.categoria,
      texto: pregunta.texto,
      opciones:pregunta.opciones,
      respuesta: pregunta.respuesta,
      url: pregunta.url

    };
    
    const usrRef = collection(this.firestore, 'preguntas');
    return addDoc(usrRef, p);
  }

  getPreguntas(): Observable<Pregunta[]>{
    const pRef = collection(this.firestore, 'preguntas');
    return collectionData(pRef,{idField: 'id'}) as Observable<Pregunta[]>;
  }
  
}
