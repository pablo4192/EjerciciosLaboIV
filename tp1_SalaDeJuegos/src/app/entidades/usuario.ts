export class Usuario {
    nombre:string = '';
    apellido:string = '';
    mail:string = '';
    contrasenia:string = '';
    id:string = '';
   
   

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
        return this.nombre + ", " + this.apellido + ", " + this.mail + ", " + this.contrasenia;
    }

    
  
   
}
