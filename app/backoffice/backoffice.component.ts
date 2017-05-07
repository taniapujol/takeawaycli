import { Component, OnInit } from '@angular/core';

import {InicioComponent} from '../inicio/inicio.component';
import {TakeAwayService} from '../_service/takeaway.service';
import {Card} from '../_model/card';
import {Cats} from '../_model/cats';

declare var $: any;
declare var Materialize: any;
@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css'],
  providers: [TakeAwayService]
})
export class BackofficeComponent extends InicioComponent implements OnInit {
  // declaracion de variables
  public numCat: number;
  public numActivos: number;
  public titulo;
  public precio;
  public descripcion;
  public imagen;
  public categoria: Cats;
  public platos: Card;
  // las variables se encuentran en iniciocomponent.ts
  ngOnInit() {
    this.numCat = 0;
    this.numActivos = 0;
    this.getPlatos();
    this.getCategorias();
    this.onActivos();
  }// fin del onInit
  onModal(nombre, precio, descripcion, foto) {
    // declaracion de la variables de la funcion e inicializadas a sus parametros
    this.titulo = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.imagen = foto;
    $('.modal').modal();
    $('#modal1').modal('open');
  }// fin onModal
   onActivos() {
    this._service.onActivos()
      .subscribe(
        result => {
          this.numActivos = result.data;
          console.log(this.numActivos);
        });
  }// Fin de funcion getPlatos
}// fin del archivo
