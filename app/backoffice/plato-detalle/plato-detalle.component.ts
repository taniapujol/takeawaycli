import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TakeAwayService } from '../../_service/takeaway.service';
import { Card } from '../../_model/card';
import { Cats } from '../../_model/cats';

declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'app-plato-detalle',
  templateUrl: './plato-detalle.component.html',
  styleUrls: ['./plato-detalle.component.css'],
  providers: [TakeAwayService]
})
export class PlatoDetalleComponent implements OnInit {
  // Declaracion de variables
  public plato        : Card;
  public categorias   : Cats;
  public id           : string;
  public status       : string;
  public errorMessage : any;
  constructor(
    // declaracion de los parametros
    private _service: TakeAwayService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    // Inicializando variables y llamadas de funciones
    this.plato = new Card(0, '', '', '', 0, '', '');
    this.getCategorias();
    this.getPlatoInfo();
  }
  // Desarrollando funciones
  getCategorias(){
    this._service.getCategorias()
      .subscribe(
        result => {
          if (result.status === 'success') {
            this.categorias = result.data;
          } else {
            alert('Error petición Myqsl');
          }
        },
        error => {
          alert('Error al obtener listado categorias');
        }
      )}// fin getCategorias
  getPlatoInfo() {
    // hacemos un recorido de los paramans que contiene el router
    this._route.params.forEach(
      (params: Params) => {this.id = params['id']});
    this._service.getPlato(this.id)
      .subscribe(
        result => {
          if(result.status === 'success'){
            this.plato = result.data;
          } else {
            alert('Error petición Mysql');
          }
        },
        error => {
          alert('Error al obtener listado de platos');
      })
     console.log(this.plato);
  }// fin getPlatoInfo
  onSubmit(){
console.log(this.plato);
    this._service.editPlato(this.id,this.plato).subscribe(
      result => {
          this.status = result.status;
          if(this.status !== 'success') {
            console.log(this.status);
          } else {
            console.log('Datos actualizados');
            Materialize.toast('Datos actualizados!', 4000);
          }
      },
      error => {
        this.errorMessage = <any>error;
        if(this.errorMessage !== null){
          console.log(this.errorMessage);
          alert('Error en la petición editPlato');
        }
      }
    );
  }// fin de onSubmit

}// final del archivo
