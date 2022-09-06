import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'ejercicio2_Clase1';
  
  constructor()
  {
      
  }

  ngOnInit(): void {

    //#region Metodos localStorage
    /*
    //localStorage.clear(); //Borra los datos del localstorage
    localStorage.setItem("usuario", JSON.stringify(this.usuario));
   
    //Leemos del localStorage
    let usr = localStorage.getItem("usuario"); //Pide clave ('usuario' lo guardamos cuando seteamos), retorna un json, hay que parsearlo en objeto
     
    console.info(usr);

    if(usr) //Valido que no sea null y lo parseo a objeto
    {
      usr = JSON.parse(usr);
    }

    console.info(usr);
    */
    //#endregion
  
  }
  

}
