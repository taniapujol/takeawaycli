import { Component, OnInit } from '@angular/core';

import { Card } from '../_model/card';
import { FiltroPipe } from '../_pipe/filtro.pipe';
import { TakeAwayService } from '../_service/takeaway.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [TakeAwayService]
})
export class InicioComponent implements OnInit {
  public platos;
  public categorias;
  public numPlatos;
  public numCat;
  constructor ( private _service: TakeAwayService ) {  } 

  ngOnInit() {
    this.getCategorias();
    this.getPlatos();
  }
getCategorias (){
  this._service.getCategoria()
    .subscribe(
      result => {
        this.categorias = result.data;
        this.numCat = result.cont;
        console.log("categorias: "+this.categorias);
        console.log(" cont categorias: "+this.numCat);
      });
}
getPlatos(){
  this._service.getPlatos()
    .subscribe(
      result => {
        this.platos = result.data;
        this.numPlatos = result.cont;
        console.log("platos: "+this.platos);
        console.log("cont platos: "+this.numPlatos);
      });
}
} // final del archivo
