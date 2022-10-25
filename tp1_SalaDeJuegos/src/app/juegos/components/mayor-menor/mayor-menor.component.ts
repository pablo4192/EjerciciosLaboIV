import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {

  //Cambiar esta bizarreada
  arrayCartas:string[] = [
    "./../../../../assets/img_mayor-menor/oro/1.png",
    "./../../../../assets/img_mayor-menor/oro/2.png",
    "./../../../../assets/img_mayor-menor/oro/3.png",
    "./../../../../assets/img_mayor-menor/oro/4.png",
    "./../../../../assets/img_mayor-menor/oro/5.png",
    "./../../../../assets/img_mayor-menor/oro/6.png",
    "./../../../../assets/img_mayor-menor/oro/7.png",
    "./../../../../assets/img_mayor-menor/oro/10.png",
    "./../../../../assets/img_mayor-menor/oro/11.png",
    "./../../../../assets/img_mayor-menor/oro/12.png",

    "./../../../../assets/img_mayor-menor/espada/1.png",
    "./../../../../assets/img_mayor-menor/espada/2.png",
    "./../../../../assets/img_mayor-menor/espada/3.png",
    "./../../../../assets/img_mayor-menor/espada/4.png",
    "./../../../../assets/img_mayor-menor/espada/5.png",
    "./../../../../assets/img_mayor-menor/espada/6.png",
    "./../../../../assets/img_mayor-menor/espada/7.png",
    "./../../../../assets/img_mayor-menor/espada/10.png",
    "./../../../../assets/img_mayor-menor/espada/11.png",
    "./../../../../assets/img_mayor-menor/espada/12.png",

    "./../../../../assets/img_mayor-menor/basto/1.png",
    "./../../../../assets/img_mayor-menor/basto/2.png",
    "./../../../../assets/img_mayor-menor/basto/3.png",
    "./../../../../assets/img_mayor-menor/basto/4.png",
    "./../../../../assets/img_mayor-menor/basto/5.png",
    "./../../../../assets/img_mayor-menor/basto/6.png",
    "./../../../../assets/img_mayor-menor/basto/7.png",
    "./../../../../assets/img_mayor-menor/basto/10.png",
    "./../../../../assets/img_mayor-menor/basto/11.png",
    "./../../../../assets/img_mayor-menor/basto/12.png",

    "./../../../../assets/img_mayor-menor/copa/1.png",
    "./../../../../assets/img_mayor-menor/copa/2.png",
    "./../../../../assets/img_mayor-menor/copa/3.png",
    "./../../../../assets/img_mayor-menor/copa/4.png",
    "./../../../../assets/img_mayor-menor/copa/5.png",
    "./../../../../assets/img_mayor-menor/copa/6.png",
    "./../../../../assets/img_mayor-menor/copa/7.png",
    "./../../../../assets/img_mayor-menor/copa/10.png",
    "./../../../../assets/img_mayor-menor/copa/11.png",
    "./../../../../assets/img_mayor-menor/copa/12.png",
  ];

  cartas:string[] = [];

  constructor() {
    
   }

  ngOnInit(): void {
  }

  darCarta(value:string){
    let i = this.numeroRandom(0,36);
    
    this.cartas.push(this.arrayCartas[i]);

  }

  reiniciar(){
    this.cartas.splice(0);
  }

  numeroRandom(min:number, max:number) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

}
