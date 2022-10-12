
export class Chat {
    
   
    texto:string;
    fecha:string;
    hora:string;
    mailUsr:string|undefined;
    color:string;
    position:string;
    left:string;

    constructor(texto:string, fecha:string, hora:string, mailUsr:string|undefined){
       
        this.texto = texto;
        this.fecha = fecha;
        this.hora = hora
        this.mailUsr = mailUsr;
        this.color = '';
        this.position = '';
        this.left = '';

    }

}
