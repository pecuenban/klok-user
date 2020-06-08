import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ConexionesService } from '../conexiones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autenticar',
  templateUrl: './autenticar.component.html',
  styleUrls: ['./autenticar.component.css']
})
export class AutenticarComponent implements OnInit {

  constructor(protected conexionesService: ConexionesService,private router: Router) { }
autenticar ={
  "Nombre":"",
  "Pass":""
};
formularioRegistro = new FormGroup({
  Nombre : new FormControl('',Validators.required),
  Pass : new FormControl('',Validators.required),
});
  ngOnInit() {

  }

 onSubmit(){
   this.conexionesService.autenticarAdmin(this.autenticar).subscribe({
    next: data => this.respuesta(data),//this.estado = data.status,
    error: error => this.error(error)//this.estado = error
  });
 }
 
error(error){
  alert("Error en autenticación");
  console.error(error);
}
  respuesta(data){
    if(data.status == "200"){
      alert("Correcto");
    }
    console.log(data);
    this.conexionesService.addFinca(data.Finca);
    this.router.navigate(['/inicio']);
  }
}