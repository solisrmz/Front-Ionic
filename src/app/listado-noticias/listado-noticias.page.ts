import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias.service';
import { Noticia } from '../Models/noticia.model';
import {Router, Route} from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-listado-noticias',
  templateUrl: './listado-noticias.page.html',
  styleUrls: ['./listado-noticias.page.scss'],
})
export class ListadoNoticiasPage implements OnInit {
  noticias: Noticia[];
  constructor(private noticiaServicio : NoticiasService, private route: Router) { }

  ngOnInit() {
    this.noticiaServicio.verNoticias().subscribe((noticias) =>{
      this.noticias= noticias;
      console.log(noticias)
    }, (error)=>{
      console.log(error)
    })
  }

  irADetalle(noticia: Noticia){
      this.route.navigate(['noticia-detalle', {noticiaT: JSON.stringify(noticia)}])
  }

  eliminarNoticia(noticiaID: number, indice: number){
    this.noticiaServicio.eliminarNoticia(noticiaID).subscribe(()=>{
      this.noticias.splice(indice,1)
    },
    error=>{
    }
    )
  }

  editar(noticia: Noticia){
    this.route.navigate(['/agregar', {noticiaEditar: JSON.stringify(noticia)}])
  }
}
