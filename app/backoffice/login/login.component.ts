import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AppModule } from '../../../app/app.module';

import { Login } from '../../_model/login';
import { TakeAwayService } from '../../_service/takeaway.service';

declare var Materialize: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[TakeAwayService]
})
export class LoginComponent implements OnInit {
  // Declaraciones de variables
  public users: Login;
  public usuario: boolean;
  public nameUsuario: string;
  // LoginUser = new EventEmitter <string> ();
  constructor(
    private _service: TakeAwayService,
    private _route: Router,
  ) { }

  ngOnInit() {
    this.usuario = false;
    this.nameUsuario = ' ';
    this._service.getUser()
      .subscribe(
        result => {
          if (result.status === 'success') {
            this.users = result.data;
            // console.log(this.users);
        }},
        error => {
          alert('Error en mysql');
        }
      );
  } // Fin del OnInit
  formSubmit(form: any) {
    console.log(form);
    console.log('quien eres?');
    console.log(this.users);
    if ( form.username === 'admin' && form.password === 'admin' ) {
      console.log('hello admin');
      this._route.navigate(['/backoffice']);
      Materialize.toast('Hola Administrador', 4000);
    } else {
      for ( var i in this.users ) {
        if (this.users.hasOwnProperty(i)) {
          var element = this.users[i];
          if ((element.nombre === form.username) && (element.password === form.password)) {
            console.log('usuario registrado');
            this.usuario = true;
          }
        }
      }
      if (this.usuario = true) {
        this.nameUsuario = form.username;
        localStorage.setItem('LoginUser', this.nameUsuario);
        location.reload();
        this._route.navigate(['/inicio']);
      } else {
         console.log('usuario NO REGISTRADO');
         Materialize.toast('usuario no registrodo, comprueve sus datos o registrese');
      }
    }
  } // fin de formSubmit
  // onchange (value: string) {
  //   this.LoginUser.emit(value);
  // }
} // fin del archivo
