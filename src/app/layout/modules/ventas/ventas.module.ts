import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { HomeVentaComponent } from './pages/home-venta/home-venta.component';
import { TablaDetalleVentaComponent } from './components/tabla-detalle-venta/tabla-detalle-venta.component';
import { TablaProductoComponent } from './components/tabla-producto/tabla-producto.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InformacionVentaComponent } from './components/informacion-venta/informacion-venta.component';

@NgModule({
  declarations: [
    HomeVentaComponent,
    TablaDetalleVentaComponent,
    TablaProductoComponent,
    InformacionVentaComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,SharedModule,FormsModule, ReactiveFormsModule
  ]
})
export class VentasModule { }
