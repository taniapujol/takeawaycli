import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import barra de navegacion de la web
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { InfoComponent } from './info/info.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CheckoutComponent } from './checkout/checkout.component';

// import paginas de back-end de la web

// la pagina principal del back-end si es el administrador
import { BackofficeComponent } from './backoffice/backoffice.component';
import { PlatoDetalleComponent } from './backoffice/plato-detalle/plato-detalle.component';
import { CategoriaDetalleComponent } from './backoffice/categoria-detalle/categoria-detalle.component';
import { BorrarProductoComponent } from './backoffice/borrar-producto/borrar-producto.component';
import { NewProductoComponent } from './backoffice/new-producto/new-producto.component';
// import paginas para el registro de usuario
import { LoginComponent } from './backoffice/login/login.component';
import { RegisterComponent } from './backoffice/register/register.component';
// import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full'},
    { path: '', component: InicioComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'info', component: InfoComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'checkout', component: CheckoutComponent},
    // rutas del back-end
    { path: 'backoffice', component: BackofficeComponent},
    { path: 'plato-detalle/:id', component: PlatoDetalleComponent},
    { path: 'categoria-detalle/:id', component: CategoriaDetalleComponent},
    { path: 'borrar-producto/:id/:tipo', component: BorrarProductoComponent},
    { path: 'new-producto/:tipo', component: NewProductoComponent},
    // rutas del sing in
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class appRouting {}