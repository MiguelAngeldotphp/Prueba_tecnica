import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      { path:'compra',loadChildren:() => import('./modules/compras/compras.module').then( m => m.ComprasModule)},
      { path:'venta',loadChildren:() => import('./modules/ventas/ventas.module').then( m => m.VentasModule)},
      { path:'', redirectTo:'', pathMatch:'full'},
      { path:'**', redirectTo:''}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
