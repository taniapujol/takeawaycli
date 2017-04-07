import { Component, OnInit } from '@angular/core';

import {InicioComponent} from '../inicio/inicio.component';
import {TakeAwayService} from '../_service/takeaway.service';
import {Card} from '../_model/card';

declare var $:any;
@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css'],
  providers:[TakeAwayService]
})
export class BackofficeComponent extends InicioComponent implements OnInit {
  // declaracion de variables
   public numCat: number;
   public titulo;
   public precio;
   public descripcion;
   public imagen;
    // las variables se encuentran en iniciocomponent.ts
   ngOnInit() {
    this.numCat = 0;
    this.getPlatos();
    this.getCategorias();
  }// fin del onInit
  onModal(nombre,precio,descripcion,foto){
    // declaracion de la variables de la funcion e inicializadas a sus parametros
    this.titulo = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.imagen = foto;
    $('.modal').modal();
    $('#modal1').modal('open');
  }
}// fin del archivo
