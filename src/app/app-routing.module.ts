import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ClientesComponent } from './components/clientes/clientes.component';

const routes: Routes = [
  { path: 'productos', component: ProductosComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: '', redirectTo: '/pedidos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
