import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Noticia } from '../Models/noticia.model';

@Component({
  selector: 'app-noticia-detalle',
  templateUrl: './noticia-detalle.page.html',
  styleUrls: ['./noticia-detalle.page.scss'],
})
export class NoticiaDetallePage implements OnInit {
  noticia: Noticia;
  constructor(private state: ActivatedRoute) { }

  ngOnInit() {
    console.log(JSON.parse(this.state.snapshot.params.noticiaT))
    this.noticia =JSON.parse(this.state.snapshot.params.noticiaT)
  }
}
