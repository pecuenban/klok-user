import { Component, OnInit } from '@angular/core';
import { ConexionesService } from '../conexiones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-espacio',
  templateUrl: './espacio.component.html',
  styleUrls: ['./espacio.component.css']
})
export class EspacioComponent implements OnInit {
sala :any;
formularioSala = new FormGroup({
  Nombre : new FormControl('',Validators.required),
  Capacidad : new FormControl('',Validators.required),
  Tiempo : new FormControl('',Validators.required),
  HoraIni : new FormControl('',Validators.required),
  HoraFin : new FormControl('',Validators.required),
  HoraIni2 : new FormControl(''),
  HoraFin2 : new FormControl(''),
});
editar = false;
idEditar;
  constructor(protected conexionesService: ConexionesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
        
        
            if (params.get("id") != null) {
this.editar = true;
 this.conexionesService.getHoras(localStorage.getItem("Finca"), params.get("id"))
    .subscribe(
      (data) => { // Success
        this.sala = data;
      },
      (error) => {
        console.error(error);
      }
    );
  
  
            }

        
    });
    

  }
  onSubmit(){
    var salaEnvio = this.sala;
    salaEnvio.Tiempo = this.sala.Tiempo*2;
    if(this.editar){
this.conexionesService.putSala(localStorage.getItem("Finca"),salaEnvio).subscribe({
    next: data => this.respuesta(data),//this.estado = data.status,
    error: error => this.error(error)//this.estado = error
    });
    }else{
      this.conexionesService.postSala(localStorage.getItem("Finca"),salaEnvio).subscribe({
    next: data => this.respuesta(data),//this.estado = data.status,
    error: error => this.error(error)//this.estado = error
    });
    }
    
  }

  
error(error){
  alert("Error editar");
  console.error(error);
}
  respuesta(data){
    console.log(data);
    this.router.navigate(['/espacios']);
  }

}