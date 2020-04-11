import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(public http: HttpClient) { }
  verNoticias() : Observable<any> {
    return this.http.get<any>("https://localhost:44358/api/noticia/obtener");
  }
}
