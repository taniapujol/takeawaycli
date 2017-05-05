import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Productos } from './_model/productos';
import { Cliente } from './_model/cliente';
import { LoginComponent} from './backoffice/login/login.component';
import { TakeAwayService } from './_service/takeaway.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TakeAwayService]
 })
export class AppComponent implements OnInit {
  // Declaracion de variables
  public Login: string;
  public cliente: Cliente;
   public totalPrecio: number;
   public hayCart: boolean;
   public hayLogin: boolean;
   public Producto: any;
   constructor(
      // declaracion de los parametros
      private _service: TakeAwayService,
      private _route: ActivatedRoute,
      private _router: Router
   ) {}
   ngOnInit () {
    this.totalPrecio = 0;
    this.hayCart = false;
    this.hayLogin = false;
    this.Producto = localStorage.getItem('JsonCart');
    if (this.Producto) {this.hayCart = true; };
    this.Login = localStorage.getItem('LoginUser');
    if (this.Login) {
      this.hayLogin = true;
    };
    this.cliente = new Cliente('', '', '','', '', '', '');
    // if ( this.hayLogin){
    //   this.loginEdit();
    // }
    console.log(this.hayLogin, this.Login);
    $('.button-collapse').sideNav();
    $('.modal').modal();
    $(".dropdown-button").dropdown();
  } // fin de onInit
  paintCart() {
    this.Producto = JSON.parse(this.Producto);
    console.log(this.Producto);
    for (let i in this.Producto) {
      if (this.Producto.hasOwnProperty(i)) {
      this.totalPrecio = this.totalPrecio + (this.Producto[i]['precio'] * this.Producto[i]['cantidad']);
      }
    }
    $('#Cart').modal('open');
  } // fin de paintCart
  loginEdit() {
    console.log(this.Login);
    this._service.getCliente(this.Login)
      .subscribe(
        result => {
          if(result.status === 'success'){
            this.cliente = result.data;
          } else {
            alert('Error petición Mysql');
          }
        },
        error => {
          alert('Error al obtener cliente');
      })
     console.log(this.cliente);
     $('#loginEdit').modal('open');
  } // fin de loginEdit
  desconectar(){
    localStorage.clear();
    location.reload();
  }
}