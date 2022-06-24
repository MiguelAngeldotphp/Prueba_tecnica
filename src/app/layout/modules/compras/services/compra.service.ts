import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Compra } from '../models/compra.model';
import { DetalleDeCompra } from 'src/app/shared/models/detalle-de-compra.models';


@Injectable({
    providedIn: 'root'
})
export class CompraService {

    private _url: string = environment.url;

    

    constructor(private http: HttpClient) { }

    public registrarCompra(comp: Compra) : Observable<any> { 

        const httpHeaders = new HttpHeaders({
            'content-type': 'aplication/json; charset=UTF-8'
        })

        const url = `${ this._url }/Compra`;
        const body = {
            "comp_id_compra": comp.comp_id_compra,
            "comp_monto_total": comp.comp_monto_total,
            "comp_fecha_registro": comp.comp_fecha_registro,
            "comp_proveedor": comp.comp_proveedor,
            "comp_usuario": comp.comp_usuario,
            "type": comp.type,
            detalles:comp.detalles
        }

        return this.http.post<any>( url, body ).pipe(
        );
    }

}
