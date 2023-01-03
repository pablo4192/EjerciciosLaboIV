import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Pregunta } from 'src/app/entidades/pregunta';
import { ApiService } from 'src/app/services/api.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  detenerMano:boolean = false;
  abrirModal:boolean = false;

  categoriaPregunta:string = '';
  pexelsCat:string = '';
  urlImagen:string = '';

  @ViewChild('ruleta') ruletaRef:ElementRef|undefined;

  preguntas:Pregunta[] = [
    //Historia
    new Pregunta('historia', '¿El periodo en el que aparecieron la agricultura y los asentamientos sedentarios se llama?', 
    ['Neolítico', 'Edad Media', 'Paleolítico', 'Actualidad'], 'Neolítico'),
    new Pregunta('historia', ' ¿Cuándo se inventó la escritura?', 
    ['Hace 20 mil años', 'En el IV milenio a.C', 'En el año 0', 'En el año 1522'], 'En IV milenio a. C'),
    new Pregunta('historia', '¿Cómo se llamaban los gobernantes del antiguo Egipto?', 
    ['Faraones', 'Jefes', 'Basileos','Alcaldes'], 'Faraones'),
    new Pregunta('historia', ' Según las leyendas de la antiguedad, ¿quiénes fundaron a Roma?', 
    ['Pablo y Pachu', 'Aquiles y Odiseo', 'Alejandro Magno y Ptolomeo', 'Rómulo y Remo'], 'Rómulo y Remo'),
    new Pregunta('historia', '¿Contra quiénes se enfrentaron los griegos en las Guerras Médicas del siglo V a.C.?',
    ['Celtas', 'Mongoles', 'Persas', 'Hebreos'], 'Persas'),
    //Deportes
    new Pregunta('deportes', '¿Cuantos mundiales de futbol tiene ganados la selección Argentina de futbol masculina?',
    ['1', '2', '3', 'ninguno'], '3'),
    new Pregunta('deportes', '¿En qué país se inventó el voleibol?',
    ['Dinamarca', 'EE.UU', 'Inglaterra', 'Francia'], 'EE.UU'),
    new Pregunta('deportes', '¿En qué país se encuentra el circuito de Le Mans?',
    ['Francia', 'Nueva Zelanda', 'Alemania', 'Australia'], 'Francia'),
    new Pregunta('deportes', '¿Cómo se llama la zona de hierba sobre la cual se ubica el hoyo en golf?',
    ['Cesped', 'Zona de hoyo', 'Green', 'Blue'], 'Green'),
    new Pregunta('deportes', '¿Cómo se llama el deporte en el cual se levantan pesas?',
    ['Halterofilia', 'Hipertrofia', 'Chimultrufia', 'Musculación'], 'Halterofilia'),
    //Arte
    new Pregunta('arte', '¿Quién pintó "La Gioconda"?', 
    ['Miguel Angel', 'Leonardo da Vinci', 'Bethoven', 'Pablo Picasso'], 'Leonardo da Vinci'),
    new Pregunta('arte', '¿Cómo se llama este pintor que se cortó la oreja?', 
    ['Vincent van Gogh', 'Salvador Dalí', 'Federico Klem', 'Hevander Holifield'], 'Vincent van Gogh'),
    new Pregunta('arte', '¿Quién de ellos NO fue un muralista mexicano?', 
    ['Pedro Lira', 'Diego Rivera', 'David Alfaro Siqueiros', 'José Clemente Orozco'], 'Pedro Lira'),
    new Pregunta('arte', 'La obra llamada "Guernica" es de...',
    ['Henri Matisse', 'Marta Minujin', 'Juan Minujin', 'Pablo Picasso'], 'Pablo Picasso'),
    new Pregunta('arte', '¿Quién pintó esto la Capilla Sixtina de El Vaticano?', 
    ['Francisco de Goya', 'Miguel Ángel', 'Cravaggio', 'Claude Monet'], 'Miguel Ángel'),
    //Geografia
    new Pregunta('geografia', '¿Cuál es el río más largo de la Península Ibérica?',
    ['Negro', 'El Tajo', 'Nilo', 'Ferdinand'], 'El Tajo'),
    new Pregunta('geografia', '¿Cuál es el país más pequeño del mundo?',
    ['Vaticano', 'Papua y nueva Guinea', 'Serbia y Montenegro', 'Islandia'], 'Vaticano'),
    new Pregunta('geografia', '¿Qué país tiene más habitantes?',
    ['Rusia', 'EE.UU', 'China', 'Brasil'], 'China'),
    new Pregunta('geografia', '¿Cuántos océanos hay en la Tierra?', 
    ['6', '4', '5', '7'], '5'),
    new Pregunta('geografia', '¿Qué país es el más grande del mundo?',
    ['Rusia', 'EE.UU', 'China', 'Brasil'], 'Rusia'),
    //Cine
    new Pregunta('Cine', '¿Quién dirigió la película Origen en el 2010?',
    ['Steven Spielberg', 'Christopher Nolan', 'Quentin Tarantino', 'Pepe Cibrian'], 'Christopher Nolan'),
    new Pregunta('cine',' ¿Cuántas películas conforman la saga cinematográfica Harry Potter?',
    ['2', '5', '4', '8'], '8'),
    new Pregunta('cine', '¿Quién dirigió la película Parque Jurásico en el año 1993?',
    ['Steven Spielberg', 'Christopher Nolan', 'Quentin Tarantino', 'Martin Scorcese'], 'Steven Spielberg'),
    new Pregunta('cine', '¿Qué actor interpretó a Aquiles en la película Troya del 2004?',
    ['Leonardo di Caprio', 'Ben Afleck', 'Brad Pitt', 'Sebastian Estevanez'], 'Brad Pitt'),
    new Pregunta('cine', '¿Quiénes interpretaron a Michael Corleone y Vito Corleone, respectivamente, en la película El Padrino?',
    ['Al Pacino y Robert De Niro', 'Robert De Niro y Andy Garcia', 'Al Pacino y Marlon Brando', 'Robert De niro y Joe Pesci'],
    'Al Pacino y Marlon Brando'),
    //Ciencia
    new Pregunta('ciencia', '¿Cuál es el gas más abundante en la atmósfera de la Tierra?',
    ['Oxigeno', 'Nitrogeno', 'Metano', 'Fosforo'], 'Oxigeno'),
    new Pregunta('ciencia', '¿Cuántas vertebras posee el cuerpo humano?', 
    ['33', '35', '38', '39'], '33'),
    new Pregunta('ciencia', '¿Cuál es el material natural más duro del planeta?',
    ['Titanio', 'Acero', 'Diamante', 'Oro'], 'Diamante'),
    new Pregunta('ciencia', '¿Cuál es el hueso más grande en el cuerpo humano?',
    ['Tibia', 'Perone', 'Rotula', 'Femur'], 'Femur'),
    new Pregunta('ciencia', '¿Quién escribió el libro “Breve historia del tiempo”?', 
    ['Elon Musk', 'Neil deGrasse Tyson', 'Carl Sagan', 'Stephen Hawking'], 'Stephen Hawking')

  ];

  constructor(private renderer2:Renderer2,
              private apiService:ApiService,
              private firestoreService:FirestoreService) { }

  ngOnInit(): void {

    this.preguntas.forEach((p) => this.firestoreService.addPregunta(p));

    
    
  }

  girarRuleta():void{
    this.detenerMano = true;

    let numeroRandom = this.numeroRandom(1,7);    

    if(this.ruletaRef != null)
    {
      this.renderer2.setStyle(this.ruletaRef.nativeElement, 'animation', '0.25s linear 8 rotate');

      setTimeout(() => {
        this.seleccionarCategoria(numeroRandom);  
      }, 2000);

    }
  }

  seleccionarCategoria(numeroCategoria:number):void{
    switch(numeroCategoria)
    {
      case 1:
        this.renderer2.addClass(this.ruletaRef?.nativeElement, 'historia');
        this.categoriaPregunta = 'Historia';
        this.pexelsCat = 'history';
        break;
        case 2:
          this.renderer2.addClass(this.ruletaRef?.nativeElement, 'deportes');
          this.categoriaPregunta = 'Deportes';
          this.pexelsCat = 'sports';
          break;
          case 3:
            this.renderer2.addClass(this.ruletaRef?.nativeElement, 'arte');
            this.categoriaPregunta = 'Arte';
            this.pexelsCat = 'art';
            break;
            case 4:
              this.renderer2.addClass(this.ruletaRef?.nativeElement, 'cine');
              this.categoriaPregunta = 'Cine';
              this.pexelsCat = 'movies';
              break;
              case 5:
                this.renderer2.addClass(this.ruletaRef?.nativeElement, 'eleccionUsr');
                this.categoriaPregunta = 'Selección libre';
                this.pexelsCat = 'question';
                break;
                case 6:
                  this.renderer2.addClass(this.ruletaRef?.nativeElement, 'geografia');
                  this.categoriaPregunta = 'Geografia';
                  this.pexelsCat = 'geography';
                  break;
                  case 7:
                    this.renderer2.addClass(this.ruletaRef?.nativeElement, 'ciencia');
                    this.categoriaPregunta = 'Ciencia';
                    this.pexelsCat = 'science';
                    break;
    }

    this.getImgApi();

    this.abrirModal = true;
  }

  private getImgApi():void{

    let i_random = this.numeroRandom(1,10);

    this.apiService.getImage(`https://api.pexels.com/v1/search?query=${this.pexelsCat}`).subscribe(data => this.urlImagen = data['photos'][i_random]['src']['medium']);
  }

  numeroRandom(min:number, max:number):number {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

}



  




