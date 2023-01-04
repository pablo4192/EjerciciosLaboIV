import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface photos{
  src:any;
  medium:any;
}

export interface imagen{
  photos:photos[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  h = {
    headers: new HttpHeaders(
      {
        Authorization: environment.apiPexels
      }
    )
  };

  constructor(private http:HttpClient) { }

  //Casteo el observable a tipo imagen, que es una interfaz que exporto desde este servicio
  getImage(url:string):Observable<imagen>{
    return this.http.get(url, this.h) as Observable<imagen>; 

  }
}
