import { Component, OnInit } from '@angular/core';
import {clientes,empleados,productos,proveedores} from '../../../../../shared/utils/reutilizables';
import { MessageService } from 'primeng/api';
import { DetalleDeCompra } from 'src/app/shared/models/detalle-de-compra.models';
import { CompraService } from '../../services/compra.service';
import { Compra } from '../../models/compra.model';

@Component({
  selector: 'app-home-compra',
  templateUrl: './home-compra.component.html',
  styleUrls: ['./home-compra.component.css'],
  providers: [MessageService]
})
export class HomeCompraComponent implements OnInit {

  //listas
  public listaProveedores : any[] = proveedores ;
  public listaEmpleados : any[] = empleados ; 
  public listaProductos : any[] = productos ; 
  public MontoTotalCompra : number = 0 ; 

  private cargando : boolean = false; 

  public isProviderSave: boolean = false;
  public isProductSave: boolean = false ;
  public isDetalleSave : boolean = false; 

  private compraRegistrar : Compra = {} as Compra;

  public proveedorSeleccionado : string = "" ; 
  public empleadoSeleccionado : string = "" ; 
  public detalleSeleccionado : DetalleDeCompra [] =[]; 

  constructor
  (
    public messageService: MessageService,
    public compraService : CompraService
  ) { }

  ngOnInit(): void {
    
  }
  public closeAlert(): void{
    this.messageService.clear();
  }

  public modificarProveedorSeleccionado(proveedor:any) : void {
    this.proveedorSeleccionado = proveedor.nombre ; 
    console.log(this.proveedorSeleccionado);
    
  }

  public modificarEmpleadoSeleccionado(empleado:any) : void {
    this.empleadoSeleccionado = empleado.nombre ; 
    console.log(this.empleadoSeleccionado);
    
  }
  public modificarDetalleSeleccionado(detalle:DetalleDeCompra) : void {

    if (!this.detalleSeleccionado.find((detalleA:DetalleDeCompra)=> detalleA.detc_nombre_producto === detalle.detc_nombre_producto)){
      console.log(this.detalleSeleccionado.includes(detalle));
      this.MontoTotalCompra += detalle.detc_importe ; 
      detalle.detc_cantidad_producto = +detalle.detc_cantidad_producto;
      this.detalleSeleccionado.push(detalle);
    }else{
      this.messageService.add({
        severity:'warn',
        summary: 'Peligro!',
        detail:'El producto seleccionado ya está en el detalle'});
      
    }
    console.log(this.detalleSeleccionado);
    
  }

  public verificarCompra() : boolean {

    if (!this.isProductSave || !this.isDetalleSave || !this.isProviderSave){
      return false; 
    }
    if(this.detalleSeleccionado.length === 0 ){
      return false; 
    }
    if(this.cargando){
      return false; 
    }
    return true; 
  }

  public realizarCompra() : void {
    this.cargando = true;
    if(!this.proveedorSeleccionado || !this.empleadoSeleccionado){
      this.messageService.add({
        severity:'warn',
        summary: 'Peligro!',
        detail:'Debe llenar todos los campos'});
    }else{
      
      this.compraRegistrar.comp_proveedor = this.proveedorSeleccionado;
      this.compraRegistrar.comp_usuario = this.empleadoSeleccionado ; 
      this.compraRegistrar.type = "INSERT" ; 
      this.compraRegistrar.comp_monto_total = this.MontoTotalCompra ; 
      this.compraRegistrar.comp_fecha_registro = "" ;
      this.compraRegistrar.comp_id_compra = 0 ; 
      this.compraRegistrar.detalles = this.detalleSeleccionado;
      this.compraService.registrarCompra(this.compraRegistrar).subscribe(
        {
          next: ()=>{
            this.messageService.add({
              severity:'success',
              summary: 'Éxito',
              detail:'La compra se realizó de manera exitosa.'});
          },error:()=>{
            this.messageService.add({
              severity:'error',
              summary: 'Error',
              detail:'La compra no pudo realizarse.'});
          }
        }
      );  
    }
    this.cargando = false;
  }

}
