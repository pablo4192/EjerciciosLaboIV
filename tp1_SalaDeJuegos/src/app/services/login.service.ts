import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Firestore, collection, addDoc, collectionData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../entidades/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuario:Usuario|undefined;

  constructor(private auth:Auth, private firestore:Firestore) {
    this.usuario = new Usuario();
   }

  Registro(usuario:Usuario){
    
    const usr = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      mail: usuario.mail,
      contrasenia: usuario.contrasenia
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

  //Metodos traidos de ususario.service

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
