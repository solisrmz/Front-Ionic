import { Component, OnInit } from '@angular/core';
import { Autor } from '../Models/autor.model';
import { NoticiasService } from '../services/noticias.service';
import { Noticia } from '../Models/noticia.model';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  autores : Autor[] = new Array<Autor>();
  noticia: Noticia = new Noticia();

  esEditable: boolean = false;

  constructor(private noticiaServicio: NoticiasService, public loadingController: LoadingController, public toastController: ToastController, private activatedRoute : ActivatedRoute) { }

  ngOnInit() {

    if(this.activatedRoute.snapshot.params.noticiaEditar != undefined){
      this.noticia = new Noticia(JSON.parse(this.activatedRoute.snapshot.params.noticiaEditar));
      this.esEditable = true
    }

    this.noticiaServicio.listadoDeAutores().subscribe((listaAutores=>{
        this.autores= listaAutores
        console.log(listaAutores)
    }))
  }

  async guardar(){
    const loading = await this.loadingController.create({
      message: 'Guardando Noticia',
    });
    await loading.present();
    this.noticiaServicio.agregarNoticia(this.noticia).subscribe(()=>{
      this.noticia = new Noticia(null)
      loading.dismiss();
      this.mostrarMensaje("Noticia Guardada")
    }, error=>{
      loading.dismiss();
      this.mostrarMensaje("Ocurrió un error, intentar de nuevo")
    })
  }

  async editarNoticia(){
    console.log(this.noticia)
    const loading = await this.loadingController.create({
      message: 'Editando Noticia',
    });
    await loading.present();
    this.noticiaServicio.editarNoticia(this.noticia).subscribe(()=>{
      loading.dismiss();
      this.mostrarMensaje("Noticia Editada")
    },
    error=>{
      this.mostrarMensaje("Ocurrio un error al guardar")
      loading.dismiss();
    })
  }


  async mostrarMensaje(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
