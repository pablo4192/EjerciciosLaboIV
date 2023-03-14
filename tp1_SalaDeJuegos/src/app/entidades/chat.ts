
export class Chat {
    
   
    texto:string;
    fecha:number;
    mailUsr:string|undefined;
    color:string;
    position:string;
    left:string;

    constructor(texto:string, fecha:number, mailUsr:string|undefined){
        this.texto = texto;
        this.fecha = fecha;
        this.mailUsr = mailUsr;
        this.color = '';
        this.position = '';
        this.left = '';
    }

}
