import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Venta } from '../models/Venta.model';

@Injectable({
    providedIn: 'root'
})
export class VentaService {

    private _url: string = environment.url;

    

    constructor(private http: HttpClient) { }

    public registrarVenta(ven: Venta) : Observable<any> { 

        const httpHeaders = new HttpHeaders({
            'content-type': 'aplication/json; charset=UTF-8'
        })

        const url = `${ this._url }/Venta`;
        const body = {
            "ven_id_venta": ven.ven_id_venta,
            "ven_monto_total": ven.ven_monto_total,
            "ven_fecha_registro": ven.ven_fecha_registro,
            "ven_cliente": ven.ven_cliente,
            "ven_usuario": ven.ven_usuario,
            "type": ven.type,
            detalles:ven.detalles
        }

        return this.http.post<any>( url, body ,{headers: httpHeaders }).pipe(
        );
    }

}
