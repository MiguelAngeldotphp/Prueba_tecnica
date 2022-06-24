import { Component, OnInit } from '@angular/core';
import {clientes,empleados,productos,proveedores} from '../../../../../shared/utils/reutilizables';
import { MessageService } from 'primeng/api';
import { DetalleDeCompra } from 'src/app/shared/models/detalle-de-compra.models';
import { Venta } from '../../models/Venta.model';
import { DetalleDeVenta } from 'src/app/shared/models/detalle-de-venta.models';
import { VentaService } from '../../services/venta.service';


@Component({
  selector: 'app-home-venta',
  templateUrl: './home-venta.component.html',
  styleUrls: ['./home-venta.component.css'],
  providers: [MessageService]
})
export class HomeVentaComponent implements OnInit {

  //listas
  public listaClientes : any[] = clientes ;
  public listaEmpleados : any[] = empleados ; 
  public listaProductos : any[] = productos ; 

  //monto total de la venta
  public MontoTotalVenta : number = 0 ; 

  private cargando : boolean = false; 

  public isClienteSave: boolean = false;
  public isProductSave: boolean = false ;
  public isDetalleSave : boolean = false; 

  private ventaRegistrar : Venta = {} as Venta ; 

  public clienteSeleccionado : string = "" ;
  public empleadoSeleccionado : string = "";
  public detalleSeleccionado : DetalleDeVenta[] = [] ; 


  constructor(
    public messageService : MessageService,
    private ventaService : VentaService
  ) { }

  ngOnInit(): void {
  }

  public closeAlert(): void{
    this.messageService.clear();
  }

  public modificarClienteSeleccionado(cliente:any) : void {
    this.clienteSeleccionado = cliente.nombre ;
  }

  public modificarEmpleadoSeleccionado(empleado:any) : void {
    this.empleadoSeleccionado = empleado.nombre ; 
    console.log(this.empleadoSeleccionado);
  }
  public modificarDetalleSeleccionado(detalle:DetalleDeVenta) : void {

    if (!this.detalleSeleccionado.find((detalleA:DetalleDeVenta)=> detalleA.detv_nombre_producto === detalle.detv_nombre_producto)){
      console.log(this.detalleSeleccionado.includes(detalle));
      this.MontoTotalVenta += detalle.detv_importe ; 
      detalle.detv_cantidad_producto = +detalle.detv_cantidad_producto;
      this.detalleSeleccionado.push(detalle);
    }else{
      this.messageService.add({
        severity:'warn',
        summary: 'Peligro!',
        detail:'El producto seleccionado ya está en el detalle'});
      
    }
  }
  public verificarCompra() : boolean {

    if (!this.isProductSave || !this.isDetalleSave || !this.isClienteSave){
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

  public registrarVenta() : void { 
    this.cargando = true;
    if(!this.clienteSeleccionado || !this.empleadoSeleccionado){
      this.messageService.add({
        severity:'warn',
        summary: 'Peligro!',
        detail:'Debe llenar todos los campos'});
    }else{
      
      this.ventaRegistrar.ven_cliente = this.clienteSeleccionado
      this.ventaRegistrar.ven_usuario = this.empleadoSeleccionado ; 
      this.ventaRegistrar.type = "INSERT" ; 
      this.ventaRegistrar.ven_monto_total = this.MontoTotalVenta ; 
      this.ventaRegistrar.ven_fecha_registro = "" ;
      this.ventaRegistrar.ven_id_venta = 0 ; 
      this.ventaRegistrar.detalles = this.detalleSeleccionado;
      this.ventaService.registrarVenta(this.ventaRegistrar).subscribe(
        {
          next: ()=>{
            this.messageService.add({
              severity:'success',
              summary: 'Éxito',
              detail:'La venta se realizó de manera exitosa.'});
          },error:()=>{
            this.messageService.add({
              severity:'error',
              summary: 'Error',
              detail:'La venta no pudo realizarse.'});
          }
        }
      );  
    }
    this.cargando = false;
  }
}
