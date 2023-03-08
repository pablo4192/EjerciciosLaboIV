export class Usuario {
    nombre:string = '';
    apellido:string = '';
    edad:number = 0;
    mail:string = '';
    contrasenia:string = '';
    id:string = '';
    puntaje_acumulado:number;
    ultima_conexion:string = '';
    puesto:number;
    
    public constructor()
    {
        this.puntaje_acumulado = 0;
        this.puesto = 0;
    }
    
}
