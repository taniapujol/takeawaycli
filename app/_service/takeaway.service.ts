import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Card } from '../_model/card';
import { Cats } from '../_model/cats';
import { Cliente } from '../_model/cliente';

@Injectable()
export class TakeAwayService {

  constructor(private _http: Http) { }
// servicios para los platos (listar, crear,modificar y borrar)
    getPlatos() {
        return this._http.get('http://localhost/tania/basedatosApi/api.php/getPlatos')
                .map(res => res.json());
    }
    onActivos() {
        return this._http.get('http://localhost/tania/basedatosApi/api.php/onActivos')
                .map(res => res.json());
    }
    addPlato(form: any) {
        const json = JSON.stringify(form);
        const params = 'json=' + json;
        const headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
        return this._http.post('http://localhost/tania/basedatosApi/api.php/addPlato',
            params, {headers: headers}).map(res => res.json());
    }
    getPlato(id: string) {
        return this._http.get('http://localhost/tania/basedatosApi/api.php/getPlato/' + id)
                .map(res => res.json());
    }
    editPlato(id: string, plato: Card) {
        const json = JSON.stringify(plato);
        const params = 'json=' + json;
        const headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
        return this._http.post('http://localhost/tania/basedatosApi/api.php/editPlato/' + id,
            params, {headers: headers}).map(res => res.json());
    }
    borrarPlato(id: string) {
        return this._http.get('http://localhost/tania/basedatosApi/api.php/DeletePlato/' + id)
                .map(res => res.json());
    }
// servicios para las categorias (listar, crear, modificar y borrar)
    getCategorias() {
        return this._http.get('http://localhost/tania/basedatosApi/api.php/getCategorias')
                .map(res => res.json());
    }
    addCategoria(form: any) {
        const json = JSON.stringify(form);
        const params = 'json=' + json;
        const headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
        return this._http.post('http://localhost/tania/basedatosApi/api.php/addCategoria',
            params, {headers: headers}).map(res => res.json());
    }
    getCategoria(id: string) {
        return this._http.get('http://localhost/tania/basedatosApi/api.php/getCategoria/' + id)
                .map(res => res.json());
    }
    editCategoria(id: string, categoria: Cats) {
        const json = JSON.stringify(categoria);
        const params = 'json=' + json;
        const headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
        return this._http.post('http://localhost/tania/basedatosApi/api.php/editCategoria/' + id,
            params, {headers: headers}).map(res => res.json());
    }
    borrarCategoria(id: string) {
        return this._http.get('http://localhost/tania/basedatosApi/api.php/DeleteCategoria/' + id)
                .map(res => res.json());
    }
// servicios para los cliente (formulario de contacto, Registro de clientes(PostUser), Login de Clientes (getUser))
    // Formulario de contacto
    addContact(form: any) {
        const json = JSON.stringify(form);
        const params = 'json=' + json;
        const headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
        return this._http.post('http://localhost/tania/basedatosApi/api.php/addContact',
            params, {headers: headers}).map(res=>res.json());
    }
    // servicios de clientes (login i registro)
    getUser() {
        return this._http.get('http://localhost/Tania/basedatosApi/api.php/getUser')
                .map(res => res.json());
    }
    getCliente(cliente: string) {
        const nombre = cliente;
        return this._http.get('http://localhost/Tania/basedatosApi/api.php/getCliente/' + nombre)
                .map(res => res.json());
    }
    postUser(form: any) {
        let json = JSON.stringify(form);
        let params = 'json=' + json;
        console.log(params);
        let headers = new Headers({'Content-Type' : 'application/x-ww-form-urlendoded'});
        console.log(headers);
        return this._http.post('http://localhost/tania/basedatosApi/api.php/registro',
            params, {headers: headers}).map(res=>res.json());
    }
// fin de service
}
