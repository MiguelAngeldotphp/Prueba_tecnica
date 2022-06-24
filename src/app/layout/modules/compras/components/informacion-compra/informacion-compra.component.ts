import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'informacion-compra',
  templateUrl: './informacion-compra.component.html',
  styleUrls: ['./informacion-compra.component.css']
})
export class InformacionCompraComponent implements OnInit {

  @Input() proveedores: any[] = [];
  @Input() empleados: any[] = [];
  @Input() dataSave! : boolean ; 


  @Output() isDataSave = new EventEmitter<boolean>();
  @Output() proveedorSeleccionado = new EventEmitter<string>();
  @Output() empleadoSeleccionado = new EventEmitter<string>();

  public proveedorForm: FormGroup = this.fb.group({
    proveedor:['',Validators.required],
    empleado:['',Validators.required]
  })
  
  constructor(private fb:FormBuilder) { }

  get proveedor(){
    return this.proveedorForm.get('proveedor')
  }

  get empleado(){
    return this.proveedorForm.get('empleado')
  }


  public enviarProveedor():void{
    
    if(this.dataSave){

      this.proveedorForm.disable();
      this.proveedorSeleccionado.emit(this.proveedor?.value);
      this.empleadoSeleccionado.emit(this.empleado?.value)
      this.isDataSave.emit(true)

    }else{

      this.proveedorForm.enable()
      this.isDataSave.emit(false);
    
    }
  }

  ngOnInit(): void {
  }

}
