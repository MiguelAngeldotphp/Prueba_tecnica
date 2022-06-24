import Swal from "sweetalert2";

export function errorAlerta(codigo: string,mensaje: string): void {
    Swal.fire({
        title:`Error (${codigo})`, 
        text: mensaje, 
        icon:'error',
        confirmButtonColor: '#d33'});
}

export function exitoAlerta(titulo: string,mensaje: string): void {
    Swal.fire({
        title:`${titulo}...`, 
        text: mensaje, 
        icon:'success',
        confirmButtonColor: '#3085d6'
    });
}

export const productos = [
    {
        nombre: 'Producto 1 ', 
        precio_compra: 10.00,
        precio_venta : 14.00
    },{
        nombre: 'Producto 2 ', 
        precio_compra: 12.00,
        precio_venta : 16.00
    },{
        nombre: 'Producto 3 ', 
        precio_compra: 8.00,
        precio_venta : 12.00
    },{
        nombre: 'Producto 4 ', 
        precio_compra: 20.00,
        precio_venta : 24.00
    },{
        nombre: 'Producto 5 ', 
        precio_compra: 4.00,
        precio_venta : 8.00
    },
]

export const proveedores =[
    {
        nombre: 'PlATANITOS S.A.C'
    },{
        nombre: 'GUCCI S.A.C'
    },{
        nombre: 'H&M S.A.C'
    },{
        nombre: 'GAMARRA S.A.C'
    },{
        nombre: 'BEARCLIFF S.A.C'
    },
] 

export const clientes = [
    {
        nombre: 'RIPLEY'
    },{
        nombre: 'SAGA FALABELLA'
    },{
        nombre: 'TOTTUS'
    },{
        nombre: 'SHOP CENTER'
    },
]

export const empleados = [
    {
        nombre: 'Kevin Fabian'
    },{
        nombre: 'Nayely Reyes'
    },{
        nombre: 'Carlos Bocanegra'
    },{
        nombre: 'Alexander Muñoz'
    },{
        nombre: 'Eduardo Chambi'
    },
]

