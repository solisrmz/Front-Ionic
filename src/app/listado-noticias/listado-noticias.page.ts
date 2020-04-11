import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias.service';
import { Noticia } from '../Models/noticia.model';

@Component({
  selector: 'app-listado-noticias',
  templateUrl: './listado-noticias.page.html',
  styleUrls: ['./listado-noticias.page.scss'],
})
export class ListadoNoticiasPage implements OnInit {
  noticias: Noticia[];
  constructor(private noticiaServicio : NoticiasService) { }

  ngOnInit() {
    this.noticiaServicio.verNoticias().subscribe((noticias) =>{
      this.noticias= noticias;
      console.log(noticias)
    }, (error)=>{
      console.log(error)
    })
  }
}
