import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TakeAwayService } from '../../_service/takeaway.service';
import {Cats} from '../../_model/cats';

declare var Materialize: any;
@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.css'],
  providers: [TakeAwayService]
})
export class NewProductoComponent implements OnInit {
  // Declaraciones de variables
  public tipo: string;
  public categorias: Cats;
  constructor(
    // declaracion de parametros
    private _service: TakeAwayService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() { 
    // recogemos los parametros pasados para inicializar la variable tipo
    this._route.params.forEach(
      (params: Params) => {
            if (params['tipo'] != null) {
               this.tipo = params['tipo'];
            }
    }); // fin de recoger parametros
    if (this.tipo === 'plat') {
      this.getCategorias();
    }
  } // fin OnInit
  getCategorias() {
     this._service.getCategorias()
    .subscribe(
      result => {
        this.categorias = result.data;
      });
  }
  onSubmit(form: any) {
    if (this.tipo === 'cat') {
      console.log(form);
      this._service.addCategoria(form).subscribe(
      result => {
        if (result.status === 'success') {
          console.log('se ha creado nueva categoria a la base de datos');
          Materialize.toast('Categoria Creada', 4000);
        } else {
          alert('Error petición Mysql');
        }
      },
      error => {
        alert('Error al enviar el formulario');
      })
    } else {
      console.log(form);
      this._service.addPlato(form).subscribe(
      result => {
        if (result.status === 'success') {
          console.log('se ha creado nuevo producto a la base de datos');
          Materialize.toast('Producto Creado', 4000);
        } else {
          alert('Error petición Mysql');
        }
      },
      error => {
        alert('Error al enviar el formulario');
      })
    }
  }

} // del archivo
