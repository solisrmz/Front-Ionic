import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../Models/noticia.model';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(public http: HttpClient) { }
  verNoticias() : Observable<Noticia[]> {
    return this.http.get<Noticia[]>("https://localhost:44358/api/noticia/obtener");
  }
  
  eliminarNoticia(noticiaID: number): Observable<boolean>{
    return this.http.delete<boolean>("https://localhost:44358/api/noticia/eliminar/" + noticiaID)
  }
}
