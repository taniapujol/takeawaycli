import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Productos } from './_model/productos';
import { Cliente } from './_model/cliente';
import { LoginComponent} from './backoffice/login/login.component';
import { TakeAwayService } from './_service/takeaway.service';
import { Router } from '@angular/router';


declare var $: any;
declare var Materialize: any;

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
  public admin: string;
   public totalPrecio: number;
   public hayCart: boolean;
   public hayLogin: boolean;
  public hayAdmin: boolean; 

   public Producto: any;
   public cart: [Productos];
   constructor(
      // declaracion de los parametros
      private _service: TakeAwayService,
      private _route: Router
   ) {}
   ngOnInit () {
    // inicializamos las variables
    this.totalPrecio = 0;
    this.hayCart = false;
    this.hayLogin = false;
    this.hayAdmin = false;
    this.cliente = new Cliente('', '', '','', '', '', '');
    // descargamos de localStorage las variables que necesitamos
    this.Login = localStorage.getItem('LoginUser');
    this.admin = localStorage.getItem('admin');
    this.Producto = localStorage.getItem('JsonCart');
    // Si exite variables en el localStorage activamos a true el hayCart y hayLogin
    if (this.Producto) {this.hayCart = true; };
    if (this.Login) {this.hayLogin = true; };
    if (this.admin) {this.hayAdmin = true; };
    // funciones de Materialize
    $('.button-collapse').sideNav();
    $('.modal').modal();
    $(".dropdown-button").dropdown();
  } // fin de onInit
  paintCart() {
    this.Producto = localStorage.getItem('JsonCart');
    this.cart = JSON.parse(this.Producto);
    console.log(this.Producto);
    for (let i in this.cart) {
      if (this.cart.hasOwnProperty(i)) {
      this.totalPrecio = this.totalPrecio + (this.cart[i]['precio'] * this.cart[i]['cantidad']);
      }
    }
    $('#Cart').modal('open');
  } // fin de paintCart
  loginInfo() {
    console.log(this.Login);
    this._service.getCliente(this.Login)
      .subscribe(
        result => {
          if(result.status === 'success'){
            this.cliente = result.data;
            console.log(this.cliente);
          } else {
            alert('Error petición Mysql');
          }
        },
        error => {
          alert('Error al obtener cliente');
      })
     $('#loginEdit').modal('open');
  } // fin de loginEdit
  desconectar() {
    localStorage.clear();
    location.reload();
  } // fin de desconectar
  borrarCart() {
    this.hayCart = false;
    localStorage.removeItem('JsonCart');
    location.reload();
  }// fin de borrarCart
  irAWeb() {
    console.log(this.hayAdmin);
    this.hayAdmin = false;
    localStorage.removeItem('admin');
     this._route.navigate(['/inicio']);
  }
}// fin del archivo
