import { Injectable, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Firestore, collection, addDoc,collectionData, doc, deleteDoc} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Usuario } from '../entidades/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  usuario:Usuario|undefined;
  usuariosActivos:Usuario[];
  

  constructor(private auth:Auth, private firestore:Firestore) {
    this.usuario = new Usuario();
    this.usuariosActivos = [];
   }
  
 

  Registro(usuario:Usuario){
    
    const usr = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      mail: usuario.mail,
      contrasenia: usuario.contrasenia,
      puntajeTotal: usuario.puntajeTotal
    };

    return createUserWithEmailAndPassword(this.auth, usr.mail, usr.contrasenia);
  }

  Login(usuario:Usuario){

    
    return signInWithEmailAndPassword(this.auth, usuario.mail, usuario.contrasenia);
  }

  /*
  LoginWithGoogle(){
    
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }*/

  Logout(){
    
    return signOut(this.auth);
  }

  GetUsuarioActivo(){
    return this.auth.currentUser; //Retorno el usuario activo
  }

  

  addUsuario(usuario:Usuario){  
    
    const usr = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      mail: usuario.mail,
      contrasenia: usuario.contrasenia
    };
    
    const usrRef = collection(this.firestore, 'usuarios');
    return addDoc(usrRef, usr);
  }

  
  agregarUsuarioActivo(usuario:Usuario){

    const usr = {
      mail: usuario.mail,
    };
    
    const usrRef = collection(this.firestore, 'usuarios_activos');
    return addDoc(usrRef, usr);
  }

  eliminarRegistroUsrActivo(usuario:Usuario|undefined){

      const ref = doc(this.firestore, 'usuarios_activos/' + usuario?.id);
      return deleteDoc(ref);
        
  }


  getUsuariosActivos(): Observable<Usuario[]>{
    const usrRef = collection(this.firestore, 'usuarios_activos');
    return collectionData(usrRef,{idField: 'id'}) as Observable<Usuario[]>;
  }

  getUsuarios(): Observable<Usuario[]>{
    const usrRef = collection(this.firestore, 'usuarios');
    return collectionData(usrRef,{idField: 'id'}) as Observable<Usuario[]>;
  }

  

  GuardarLogUsuario(usuario:Usuario){  
    
    let fecha = new Date();
    let mail = usuario.mail;
                          
    const usrRef = collection(this.firestore, 'log_usuarios');
    return addDoc(usrRef, {mail, fecha});
  }




}
