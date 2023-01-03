import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  //De que tipo tendria que ser el observable??
  getImage(url:string):Observable<any>{
    return this.http.get(url, this.h); 

  }
}
