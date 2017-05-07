import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Card } from '../_model/card';
import { Cats } from '../_model/cats';
import { FiltroPipe } from '../_pipe/filtro.pipe';
import { TakeAwayService } from '../_service/takeaway.service';

declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [TakeAwayService]
})
export class InicioComponent implements OnInit {
  // Declaracion de variables
  public platos: Card;
  public categorias: Cats;
  public numPlatos;
  public numCat;
  public hayCart: boolean;
  public hayProducto: boolean;
  public Cart: any;
  constructor ( public _service: TakeAwayService ) {  }

  ngOnInit() {
    // inicializamos las variables
    this.hayProducto = false;
    this.hayCart = false;
    // descargamos lo que tenemos en el localStorage
    this.Cart = localStorage.getItem('JsonCart');
    if (this.Cart) {
      console.log('hay producto en la cesta');
      console.log(this.Cart);
      this.hayCart = true;
    }
    // inicializamos el modal
    $('.modal').modal();
    // lanzamos la funciones
    this.getCategorias();
    this.getPlatos();
  }
// Funcion obtener categorias
  getCategorias () {
    this._service.getCategorias()
      .subscribe(
        result => {
          this.categorias = result.data;
          this.numCat = result.cont;
        });
  }
// Funcion obtener platos
  getPlatos() {
    this._service.getPlatos()
      .subscribe(
        result => {
          this.platos = result.data;
          this.numPlatos = result.cont;
        });
  }// Fin de funcion getPlatos
// Funcion añadir al carrito
  addCart(id, nombre, precio, cantidad) {
    console.log(this.hayProducto);
    let cartExist;
    cartExist = localStorage.getItem('JsonCart');
    // Existe compra guardada en el localStorge
    if (cartExist != null) {
      console.log('hay producto en localstorage');
      cartExist =  JSON.parse(cartExist);
      // si hay un producto con el mismo id, sumamos uno a su cantidad
      for (const i in cartExist) {
        if (id === cartExist[i].id) {
          this.hayProducto = true;
          cartExist[i].cantidad++;
          console.log('se ha añadido una racion');
          Materialize.toast('Se ha añadido una racion de ' + nombre, 4000);
        }
      }
      if (!this.hayProducto) {
        cartExist.push({
          id: id,
          nombre: nombre,
          precio: precio,
          cantidad: cantidad
          });
        console.log('se ha añadido un plato nuevo');
        Materialize.toast('Se ha añadido ' + nombre + ' a la compra', 4000);
      }
    } else {
      // sino no hay compra
      console.log('NO EXIste producto en localstorage');
      cartExist = [];
      cartExist.push({
          id: id,
          nombre: nombre,
          precio: precio,
          cantidad: cantidad});
      Materialize.toast('Se ha añadido ' + nombre + ' a la compra', 4000);
      console.log(cartExist);
      // @Output() this.Cart = new EventEmitter<boolean>();
      // this.hayCart = true;
    }
    const JsonCart = JSON.stringify(cartExist);
    localStorage.setItem( 'JsonCart' , JsonCart);
  } // final de funcion addCart
} // final del archivo
