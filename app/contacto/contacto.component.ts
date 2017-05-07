import { Component, OnInit } from '@angular/core';
import {TakeAwayService} from '../_service/takeaway.service';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  providers: [TakeAwayService]
})
export class ContactoComponent implements OnInit {
  public form_enviado: boolean;
  constructor(private _service: TakeAwayService) { }

  ngOnInit() {
    this.form_enviado = false;
  }
   onSubmit(form: any) {
    console.log(form);
    this._service.addContact(form).subscribe(
          result => {
            if (result.status === 'success'){
             console.log('Contacto recibido');
             this.form_enviado = true;
            } else {
              alert('Error petición Mysql');
            }
          },
          error =>{
            alert('Error al enviar contacto');
          }
        )
  }
}
