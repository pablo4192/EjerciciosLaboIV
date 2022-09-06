export class Usuario {

    email:string|undefined;
   
    clave:string|undefined;

    public GuardarEnLocalStorage()
    {
        localStorage.setItem("usuario " + this.email, JSON.stringify(this));
        
    }

    public Consolear()
    {
        console.log("Cantidad de items en localStorage: " + localStorage.length);
    }
}
