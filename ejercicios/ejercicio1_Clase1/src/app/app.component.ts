import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ejercicio1_Clase1';

  e1:string = "";
  e2:string = "";
  suma = 0;
  promedio = 0;

  public CalcularSuma():void{
    let e1Int = parseInt(this.e1);
    let e2Int = parseInt(this.e2);

    if(isNaN(e1Int) || isNaN(e2Int))
    {
      alert("Ingrese numeros en los campos edades");
    }
    else
    {
      this.suma = e1Int + e2Int;
      this.CalcularPromedio(this.suma);
    }
  }

  private CalcularPromedio(valor:number):void{
    this.promedio = valor / 2;
  }

  public LimpiarInputs()
  {
    this.e1 = "";
    this.e2 = "";
    this.suma = 0;
    this.promedio = 0;
  }

  
  
}
