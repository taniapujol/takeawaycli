import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TakeAwayService } from '../../_service/takeaway.service';
import { Cats } from '../../_model/cats';
import { Card } from '../../_model/card';

declare var Materialize: any;

@Component({
  selector: 'app-borrar-producto',
  templateUrl: './borrar-producto.component.html',
  styleUrls: ['./borrar-producto.component.css'],
  providers: [TakeAwayService]
})
export class BorrarProductoComponent implements OnInit {
  // Declaracion de variables
  public id: string;
  public tipo: string;
  public borrar: boolean;
  public categoria: Cats;
  public plato: Card;
  public status: string;
  public errorMessage: any;

  constructor(
    // declaracion de parametros
    private _service: TakeAwayService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    // inicializamos variables y llamadas de funciones
    this.categoria = new Cats(0, '', '');
    this.plato = new Card(0, '', '', '', 0, '', '');
    // recogemo los parametros pasados
    this._route.params.forEach(
      (params: Params) => {
            if((params['id'] != null) && (params['tipo'] != null)) {
                this.id = params['id'];
                this.tipo = params['tipo'];
            }
    }); // fin de recoger parametros
    console.log(this.tipo);
    if (this.tipo === 'cat') {
      this.getCategoriaInfo();
    }
    if (this.tipo === 'plat') {
      this.getPlatoInfo();
    }
  } // fin OnInit
getCategoriaInfo(){
  this._service.getCategoria(this.id)
    .subscribe(
      result => {
          if( result.status === 'success' ) {
            this.categoria = result.data;
          } else {
            alert('Error petición Mysql');
        }},
        error => {
          alert('Error al obtener info Categorias');
        });
} // fin getCategoriaInfo
getPlatoInfo(){
  this._service.getPlato(this.id)
    .subscribe(
      result =>{
          if( result.status == "success" ){
            this.plato = result.data;
          } else( "Error petición Mysql" );
        },
        error =>{
          alert("Error al obtener info Categorias");
        }
      )
} // fin getPlatoInfo
borrar_Categoria() {
  this._service.borrarCategoria(this.id)
    .subscribe(
      result => {
         this.status = result.status;
          if(this.status !== 'success') {
            console.log(this.status);
          } else {
            console.log('Datos borrados');
            this.borrar = true;
          }},
        error => {
         this.errorMessage = <any>error;
          if (this.errorMessage !== null) {
            console.log(this.errorMessage);
            alert( 'Error en la petición borrarCategoria');
          }
        }
      );
} // fin borrarCategoria
borrar_Plato() {
  this._service.borrarPlato(this.id)
    .subscribe(
      result => {
         this.status = result.status;
          if ( this.status !== 'success' ) {
            console.log(this.status);
          } else {
            console.log('Datos borrados');
            Materialize.toast('Datos Borrados!', 4000);
          }},
        error => {
         this.errorMessage = <any>error;
          if ( this.errorMessage !== null ) {
            console.log(this.errorMessage);
            alert('Error en la petición borrarPlato');
          }
        }
      );
} // fin borrarPlato
} // final de archivo
