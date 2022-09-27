import { Usuario } from "./usuario";

export class Chat {
    
   
    texto:string;
    fecha:string;
    hora:string;
    usuario:Usuario|undefined;

    constructor(texto:string, fecha:string, hora:string, usuario:Usuario|undefined){
       
        this.texto = texto;
        this.fecha = fecha;
        this.hora = hora
        this.usuario = usuario;

    }

}
