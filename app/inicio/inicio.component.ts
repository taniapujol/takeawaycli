import { Component, OnInit } from '@angular/core';

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
  public hayProducto: boolean;
  public hayCart: any;
  constructor ( public _service: TakeAwayService ) {  }

  ngOnInit() {
    // inicializamos las variables
    this.hayProducto = false;
    this.hayCart = localStorage.getItem('JsonCart');
    if (this.hayCart) {
      console.log('hay producto en la cesta');
      console.log(this.hayCart);
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
    if (cartExist != null) {
      console.log('hay producto en localstorage');
      cartExist =  JSON.parse(cartExist);
      for (const i in cartExist) {
        if (id === cartExist[i].id) {
          this.hayProducto = true;
          cartExist[i].cantidad++;
          console.log('se ha añadido una racion');
          Materialize.toast('Se ha añadido una racion de ' + nombre, 4000);
        } else {
          this.hayProducto = true;
          cartExist.push({
            id: id,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad
          });
          console.log('se ha añadido un plato nuevo');
          Materialize.toast('Se ha añadido ' + nombre + ' a la compra', 4000);
        }
      }
      if (this.hayProducto = false) {
        cartExist.push({
        id: id,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad});
        console.log('se ha añadido un nuevo plato');
        Materialize.toast('Se ha añadido ' + nombre + ' a la compra', 4000);
      }
    } else {
      console.log('NO EXIste producto en localstorage');
      cartExist = [];
      cartExist.push({
          id: id,
          nombre: nombre,
          precio: precio,
          cantidad: cantidad});
      Materialize.toast('Se ha añadido ' + nombre + ' a la compra', 4000);
      console.log(cartExist);
      location.reload();
    }
    const JsonCart = JSON.stringify(cartExist);
    localStorage.setItem( 'JsonCart' , JsonCart);

  } // final de funcion addCart
// // funcion Pinta carrito de la compra
//   paintCart() {
//     this.hayCart = localStorage.getItem('JsonCart');
//     this.hayCart = JSON.parse('hayCart');
//     $('#Cart').modal('open');
//     for (const cart in this.hayCart) {
//       // if (this.hayCart.hasOwnProperty(cart)['precio']) {
//       //   const totalPrecio = this.hayCart.precio[cart] + totalPrecio;
//       // }
//     }
//   } // fin de paintCart

} // final del archivo
