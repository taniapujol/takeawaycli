import { Component, OnInit } from '@angular/core';
import { TakeAwayService } from '../../_service/takeaway.service';

declare var Materialize: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [TakeAwayService]
})
export class RegisterComponent implements OnInit {
  // Declaración de variables
  public msg;
   constructor( private _service: TakeAwayService) { }
  ngOnInit() {
  }
  onSubmit(form: any) {
    console.log(form);
    this._service.postUser(form).subscribe(
          result => {
            if (result.status === 'success') {
              console.log('Contacto recibido');
              Materialize.toast('El registro se ha registrado correctamente!!!', 4000);
            } else {
              console.log('Error petición Mysql');
            }
          },
          error => {
            console.log('Error al enviar contacto');
            Materialize.toast('Fallo al enviar datos', 4000);
          }
        )
  } // fin de onSubmit
}
