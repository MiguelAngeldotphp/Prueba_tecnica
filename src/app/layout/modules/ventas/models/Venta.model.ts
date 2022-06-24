import { DetalleDeVenta } from "src/app/shared/models/detalle-de-venta.models";
export interface Venta{ 
    ven_id_venta : number ; 
    ven_fecha_registro : string ; 
    ven_usuario : string ; 
    ven_cliente: string ; 
    ven_monto_total:number;
    type: string ;
    
    detalles: DetalleDeVenta[];
    
}