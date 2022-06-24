import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'informacion-venta',
  templateUrl: './informacion-venta.component.html',
  styleUrls: ['./informacion-venta.component.css']
})
export class InformacionVentaComponent implements OnInit {

  @Input() clientes: any[] = [];
  @Input() empleados: any[] = [];
  @Input() dataSave! : boolean ; 


  @Output() isDataSave = new EventEmitter<boolean>();
  @Output() clienteSeleccionado = new EventEmitter<string>();
  @Output() empleadoSeleccionado = new EventEmitter<string>();

  public clienteForm: FormGroup = this.fb.group({
    cliente:['',Validators.required],
    empleado:['',Validators.required]
  })

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  get cliente(){
    return this.clienteForm.get('cliente')
  }

  get empleado(){
    return this.clienteForm.get('empleado')
  }

  public enviarInformacion():void{
    console.log(this.dataSave);
    
    if(this.dataSave){

      this.clienteForm.disable();
      this.clienteSeleccionado.emit(this.cliente?.value);
      this.empleadoSeleccionado.emit(this.empleado?.value)
      this.isDataSave.emit(true)

    }else{

      this.clienteForm.enable()
      this.isDataSave.emit(false);
    
    }
  }


}
