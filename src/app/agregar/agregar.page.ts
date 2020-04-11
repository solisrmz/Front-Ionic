import { Component, OnInit } from '@angular/core';
import { Autor } from '../Models/autor.model';
import { NoticiasService } from '../services/noticias.service';
import { Noticia } from '../Models/noticia.model';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  autores : Autor[] = new Array<Autor>();
  noticia: Noticia = new Noticia();
  constructor(private noticiaServicio: NoticiasService, public loadingController: LoadingController, public toastController: ToastController) { }

  ngOnInit() {
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

  async mostrarMensaje(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
