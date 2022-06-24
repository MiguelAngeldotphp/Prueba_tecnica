import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DetalleDeCompra } from 'src/app/shared/models/detalle-de-compra.models';

@Component({
  selector: 'tabla-detalle-compra',
  templateUrl: './tabla-detalle-compra.component.html',
  styleUrls: ['./tabla-detalle-compra.component.css']
})
export class TablaDetalleCompraComponent implements OnInit {

  @Input() dataSave! : boolean ; 
  @Input() detalles  : DetalleDeCompra[] = [] ;

  @Output() isDataSave = new EventEmitter<boolean>();
  @Output() detalleEliminado = new EventEmitter<DetalleDeCompra>();
  
  constructor() { }

  ngOnInit(): void {
  }

  public enviarDetalles(): void{;
    
    if(this.dataSave){
      this.isDataSave.emit(true);
    }else{
      this.isDataSave.emit(false);
    }
  }

  public eliminarDetalle(detalleEliminado:DetalleDeCompra): void {

    this.detalles.forEach(function(detalle, index,object) {
      if(detalle.detc_nombre_producto === detalleEliminado.detc_nombre_producto){
        object.splice(index, 1);
      }
  });
  }

}
