import { DetalleDeCompra } from "src/app/shared/models/detalle-de-compra.models";

export interface Compra{
    comp_proveedor : string; 
    comp_usuario:string; 
    comp_id_compra : number; 
    comp_fecha_registro : string ;
    comp_monto_total : number ; 
    type:string ;
    detalles: DetalleDeCompra[];
}