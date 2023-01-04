export class Pregunta {
    id:string|undefined;
    categoria:string|undefined;
    url:string|undefined;
    texto:string|undefined;
    opciones:string[] = [];
    respuesta:string|undefined;

    constructor(categoria:string, texto:string, opciones:string[], respuesta:string){
        this.categoria = categoria;
        this.texto = texto;
        this.opciones = opciones;
        this.respuesta = respuesta;
        this.url = '';
    }
}
