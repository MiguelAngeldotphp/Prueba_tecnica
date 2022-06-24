import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { HomeCompraComponent } from './pages/home-compra/home-compra.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InformacionCompraComponent } from './components/informacion-compra/informacion-compra.component';
import { TablaProductosComponent } from './components/tabla-productos/tabla-productos.component';
import { TablaDetalleCompraComponent } from './components/tabla-detalle-compra/tabla-detalle-compra.component';

@NgModule({
  declarations: [
    HomeCompraComponent,
    InformacionCompraComponent,
    TablaProductosComponent, 
    TablaDetalleCompraComponent
  ],
  imports: [
    CommonModule,
    ComprasRoutingModule,SharedModule,FormsModule, ReactiveFormsModule
  ]
})
export class ComprasModule { }
