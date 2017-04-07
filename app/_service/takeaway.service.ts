import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TakeAwayService {

  constructor(private _http: Http) { }

getPlatos(){
	return this._http.get("http://localhost/tania/bdApi/api.php/getPlatos")
			.map(res=>res.json());
}
getCategoria(){
	return this._http.get("http://localhost/tania/bdApi/api.php/getCategoria")
			.map(res=>res.json());
}
getUser(){
	return this._http.get("http://localhost/tania/bdApi/api.php/getUser")
			.map(res=>res.json());
}
}