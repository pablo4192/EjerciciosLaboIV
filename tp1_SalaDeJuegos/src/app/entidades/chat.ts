import { Usuario } from "./usuario";

export class Chat {
    
    //usuario:Usuario|undefined;
    texto:string;
    fecha:string;
    hora:string;

    constructor(texto:string, fecha:string, hora:string){
        //this.usuario = usuario;
        this.texto = texto;
        this.fecha = fecha;
        this.hora = hora

    }

}
