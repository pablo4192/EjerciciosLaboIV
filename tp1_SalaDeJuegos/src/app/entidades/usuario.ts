export class Usuario {
    nombre:string = '';
    apellido:string = '';
    mail:string = '';
    contrasenia:string = '';
    id:string = '';
    puntaje_acumulado:number = 0;
    ultima_conexion:string = '';
    puesto:number = 0;
    perfo:number = 0;
   
   

    /* 
    public constructor(nombre:string, apellido:string, mail:string, contrasenia:string)
    {
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
        this.contrasenia = contrasenia;
    }
    */

    public Mostrar()
    {
        console.log(this.nombre + ", " + this.apellido + ", " + this.mail + ", " + this.contrasenia);
    }

    
  
   
}
