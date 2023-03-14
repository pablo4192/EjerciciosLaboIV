import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { Firestore, collection, addDoc,collectionData, doc, deleteDoc, updateDoc, docData, setDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../entidades/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  usuario:Usuario|undefined;
  usuariosActivos:Usuario[];
  usuariosRegistrados:Usuario[];
  public logueado:boolean = false;

  constructor(private auth:Auth, private firestore:Firestore) {
    this.usuario = new Usuario();
    this.usuariosActivos = [];
    this.usuariosRegistrados = [];
   }
  
  Registro(usuario:Usuario){
    
    const usr = {
      mail: usuario.mail,
      contrasenia: usuario.contrasenia,
    };

    //CREACION DE USUARIO ACTIVO, REGISTRADO
    this.usuario = usuario; //Para tener visibles en todos los componentes los datos del usuario logueado
    this.usuario.nombre = usuario.nombre;
    this.usuario.apellido = usuario.apellido;

    return createUserWithEmailAndPassword(this.auth, usr.mail, usr.contrasenia);
  }

  Login(usuario:Usuario){
    return signInWithEmailAndPassword(this.auth, usuario.mail, usuario.contrasenia);
  }

  Logout(){
    return signOut(this.auth);
  }

  GetUsuarioActivo(){
    return this.auth.currentUser;
  }

  addUsuario(usuario:Usuario){  
     
    const usr = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      edad: usuario.edad,
      mail: usuario.mail,
      contrasenia: usuario.contrasenia,
      puntaje_acumulado: 0,
      puesto: 0, 
      
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
    
    let date = new Date();
    let fecha:string  = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    let mail = usuario.mail;

    setTimeout(() => {
      if(this.usuario != null)
      this.updateUltimaConexion(this.usuario, fecha);
    }, 2000);
                          
    const usrRef = collection(this.firestore, 'log_usuarios');
    return addDoc(usrRef, {mail, fecha});
  }

  private updateUltimaConexion(usuario:Usuario, fecha:string){ 
    const usrRef = doc(this.firestore, `usuarios/${usuario.id}`);
    return updateDoc(usrRef, {ultima_conexion: fecha});
  }

  retornarDatosUsuario(usuario:Usuario):Usuario|undefined{
    return this.usuariosRegistrados.find((u) => u.mail == usuario.mail); 
  }

  //Ver no lo estoy usando...
  getUsuario(id:string):Observable<Usuario>{
    const ref = doc(this.firestore, `usuarios/${id}`);
    return docData(ref) as Observable<Usuario>;
  }

}
