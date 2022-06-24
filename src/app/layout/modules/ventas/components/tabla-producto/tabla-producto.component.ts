import { Component, EventEmitter,OnInit , Input, Output,} from '@angular/core';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetalleDeVenta } from 'src/app/shared/models/detalle-de-venta.models';
import { BRAND_MODAL_RESPONSIVE } from '../../utils/breakpoint-brand-modal';

@Component({
  selector: 'tabla-productos',
  templateUrl: './tabla-producto.component.html',
  styleUrls: ['./tabla-producto.component.css']
})
export class TablaProductoComponent implements OnInit {

  @Output() isDataSave = new EventEmitter<boolean>();
  @Input() dataSave! : boolean;

  public openModal : boolean  = false; 

  producto : any ; 
  public readonly BRAND_MODAL_RESPONSIVE = BRAND_MODAL_RESPONSIVE;
  @Input() productos: any[]=[]; 

  @Output() detalle = new EventEmitter<DetalleDeVenta>();

  public cantidadForm: FormGroup = this.fb.group({
    cantidad: ['', [Validators.required, Validators.pattern('[0-9]+')]]
  });

  public filtroBusquedaProducto: string = '' ;

  get cantidad() {
    return this.cantidadForm.get('cantidad');
  }

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
  }

  public filtrarBusqueda(tabla: Table): void {
    tabla?.filterGlobal(this.filtroBusquedaProducto, 'contains');
  }

  public enviarDataSave():void{
    this.isDataSave.emit(this.dataSave)
  }

  public enviarDetalle(): void {

    const detalle : DetalleDeVenta = {
      detv_ven_id_venta : 0, 
      detv_nombre_producto : this.producto.nombre,
      detv_cantidad_producto : this.cantidad?.value , 
      detv_importe : this.cantidad?.value * this.producto.precio_compra, 
      detv_id_detalle_venta : 0 , 
      detv_precio_producto : this.producto.precio_compra
    }
    this.openModal = false ;
    this.detalle.emit(detalle);
  }

  public abrirModalFunction(producto:any) : void {
    this.producto = producto
    this.openModal = true; 
  }

  public closeModal() : void {
    this.cantidadForm.reset({cantidad:''});
    this.openModal = false; 
  }
}
