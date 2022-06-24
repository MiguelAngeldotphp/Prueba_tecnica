import { Component, EventEmitter,OnInit , Input, Output,} from '@angular/core';
import { Table } from 'primeng/table';
import { DetalleDeCompra } from 'src/app/shared/models/detalle-de-compra.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BRAND_MODAL_RESPONSIVE } from '../../utils/breakpoint-brand-modal';

@Component({
  selector: 'tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.css']
})
export class TablaProductosComponent implements OnInit {

  @Output() isDataSave = new EventEmitter<boolean>();
  @Input() dataSave! : boolean;

  public openModal : boolean  = false; 

  producto : any ; 
  public readonly BRAND_MODAL_RESPONSIVE = BRAND_MODAL_RESPONSIVE;
  @Input() productos: any[]=[]; 

  @Output() detalle = new EventEmitter<DetalleDeCompra>();

  public cantidadForm: FormGroup = this.fb.group({
    cantidad: ['', [Validators.required, Validators.pattern('[0-9]+')]]
  });


  get cantidad() {
    return this.cantidadForm.get('cantidad');
  }

  constructor(private fb : FormBuilder) { }

  public filtroBusquedaProducto: string = '' ;

  ngOnInit(): void {
  }

  public filtrarBusqueda(tabla: Table): void {
    tabla?.filterGlobal(this.filtroBusquedaProducto, 'contains');
  }

  public enviarDataSave():void{
    console.log(this.dataSave);
    
    this.isDataSave.emit(this.dataSave)
  }

  public enviarDetalle(): void {

    const detalle : DetalleDeCompra = {
      detc_comp_id_compra : 0, 
      detc_nombre_producto : this.producto.nombre,
      detc_cantidad_producto : this.cantidad?.value , 
      detc_importe : this.cantidad?.value * this.producto.precio_compra, 
      detc_id_detalle_compra : 0 , 
      detc_precio_producto : this.producto.precio_compra
    }
    this.openModal = false ;
    this.detalle.emit(detalle);
  }

  public abrirModalFunction(producto:any) : void {
    this.producto = producto
    this.openModal = true; 
  }

  public closeModal() : void {
    this.cantidadForm.reset({cantidad:0});
    this.openModal = false; 
  }

}
