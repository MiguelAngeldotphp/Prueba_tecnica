import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DetalleDeVenta } from 'src/app/shared/models/detalle-de-venta.models';

@Component({
  selector: 'tabla-detalle-venta',
  templateUrl: './tabla-detalle-venta.component.html',
  styleUrls: ['./tabla-detalle-venta.component.css']
})
export class TablaDetalleVentaComponent implements OnInit {

  @Input() dataSave! : boolean ; 
  @Input() detalles  : DetalleDeVenta[] = [] ;

  @Output() isDataSave = new EventEmitter<boolean>();
  @Output() detalleEliminado = new EventEmitter<DetalleDeVenta>();
  

  constructor() { }

  ngOnInit(): void {
  }

  public enviarDetalles(): void{
    
    if(this.dataSave){
      this.isDataSave.emit(true);
    }else{
      this.isDataSave.emit(false);
    }
  }

  public eliminarDetalle(detalleEliminado:DetalleDeVenta): void {

    this.detalles.forEach(function(detalle, index,object) {
      if(detalle.detv_nombre_producto === detalleEliminado.detv_nombre_producto){
        object.splice(index, 1);
      }
  });
  }

}
