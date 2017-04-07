import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import barra de navegacion de la web
import { InicioComponent } from './inicio/inicio.component';
import { InfoComponent } from './info/info.component';
import { ContactoComponent } from './contacto/contacto.component';
// import paginas de back-end de la web
// la pagina principal del back-end, donde se le da la bienvenida al nuevo usuario
import { HomeComponent } from './backoffice/home/home.component';
// la pagina principal del back-end si es el administrador
import { BackofficeComponent } from './backoffice/backoffice.component';
import { PlatoDetalleComponent } from './backoffice/plato-detalle/plato-detalle.component';
import { CategoriaDetalleComponent } from './backoffice/categoria-detalle/categoria-detalle.component';
// import paginas para el registro de usuario
import { LoginComponent } from './backoffice/login/login.component';
import { RegisterComponent } from './backoffice/register/register.component';
// import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'info', component: InfoComponent },
    { path: 'contacto', component: ContactoComponent },
    // rutas del back-end
    { path: 'backoffice', component: BackofficeComponent},
    { path: 'plato-detalle/:id', component:PlatoDetalleComponent},
    { path: 'categoria-detalle/:id', component: CategoriaDetalleComponent},
    // rutas del sing in
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class appRouting {}