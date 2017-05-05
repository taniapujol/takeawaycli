import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { appRouting } from './routing';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { InfoComponent } from './info/info.component';
import { ContactoComponent } from './contacto/contacto.component';
import { FiltroPipe } from './_pipe/filtro.pipe';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { PlatoDetalleComponent } from './backoffice/plato-detalle/plato-detalle.component';
import { CategoriaDetalleComponent } from './backoffice/categoria-detalle/categoria-detalle.component';
import { LoginComponent } from './backoffice/login/login.component';
import { RegisterComponent } from './backoffice/register/register.component';
import { BorrarProductoComponent } from './backoffice/borrar-producto/borrar-producto.component';
import { NewProductoComponent } from './backoffice/new-producto/new-producto.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    InfoComponent,
    ContactoComponent,
    FiltroPipe,
    BackofficeComponent,
    PlatoDetalleComponent,
    CategoriaDetalleComponent,
    LoginComponent,
    RegisterComponent,
    BorrarProductoComponent,
    NewProductoComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
