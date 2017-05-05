import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TakeAwayService } from '../../_service/takeaway.service';
import { Cats } from '../../_model/cats';

declare var Materialize: any;

@Component({
  selector: 'app-categoria-detalle',
  templateUrl: './categoria-detalle.component.html',
  styleUrls: ['./categoria-detalle.component.css'],
  providers: [TakeAwayService]
})
export class CategoriaDetalleComponent implements OnInit {
  // declaración de Variables
  public categoria: Cats;
  public id: string;
  public status: string;
  public errorMessage: any;

  constructor(
    // declaracion de parametros
    private _service: TakeAwayService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    // Inicializamos variables y llamadas de funciones
    this.categoria  = new Cats(0, '' , '' );
    this.getCategoriaInfo();
  } // fin onInit
  getCategoriaInfo(){
    this._route.params.forEach(
      (params: Params) => {this.id = params['id']});
    this._service.getCategoria(this.id)
      .subscribe(
        result =>{
          if( result.status === 'success' ) {
            this.categoria = result.data;
          } else {
            alert( 'Error petición Mysql' );
        }},
        error =>{
          alert('Error al obtener info Categorias');
        });
  }// fin getCategoriaInfo
   onSubmit(){
console.log(this.categoria);
    this._service.editCategoria(this.id, this.categoria)
      .subscribe(
        result => {
          this.status = result.status;
          if(this.status !== 'success') {
            console.log(this.status);
          } else {
            console.log('Datos actualizados');
            Materialize.toast('Datos actualizados!', 4000);
          }},
        error => {
          this.errorMessage = <any>error;
          if ( this.errorMessage !== null ) {
            console.log(this.errorMessage);
            alert('Error en la petición editCategoria');
          }
        }
      );
  }// fin del onSubmit
}// fin del archivo
