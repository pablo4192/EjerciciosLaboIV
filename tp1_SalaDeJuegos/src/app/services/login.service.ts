import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  

  constructor(private auth:Auth) { }

  Registro(mail:string, contrasenia:string){
    
   
    localStorage.setItem('logueado','true');
    return createUserWithEmailAndPassword(this.auth, mail, contrasenia);
  }

  Login(mail:string, contrasenia:string){
    
    
    return signInWithEmailAndPassword(this.auth, mail, contrasenia);
  }

  LoginWithGoogle(){
    
    
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  Logout(){
    localStorage.setItem('logueado','false');
    return signOut(this.auth);
  }
}
