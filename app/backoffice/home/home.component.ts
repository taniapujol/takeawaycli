import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: '', // cagaremos un home diferente dependiendo si es admin (./homeAdmin.component.html) o usuari (./homeUsuarios.component.html)
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
