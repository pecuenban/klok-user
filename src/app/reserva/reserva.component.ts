import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConexionesService } from '../conexiones.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, protected serviceConexiones: ConexionesService) { }
idSala ="";
horaFin = "";
horaFinal = "";
fecha ="";
hora ="";
personas = 1;
personasCasa = 2;
capacidad;
max;
reserva = {
  "Inicio":"",
"Usuario":"",
"Cantidad":1
};
  ngOnInit() {
    this.capacidad = localStorage.getItem("espacio");
    
    this.personasCasa = JSON.parse(localStorage.getItem("User")).Personas;
if(this.capacidad < this.personasCasa){
  this.max = this.capacidad;
}else{
  this.max = this.personasCasa;
}
this.horaFin = localStorage.getItem("tiempo");

    this.route.paramMap.subscribe(params => {
        
        
            if (params.get("id") != null) {
              this.idSala = params.get("id");

            }
            
            if (params.get("fecha") != null) {
              this.fecha = params.get("fecha");
            }
            if (params.get("hora") != null) {
              this.hora = params.get("hora");
            }
            var separar = this.hora.split(":");
            var fechaFin = new Date(0,0,0,parseInt(separar[0]),parseInt(separar[1]));
            fechaFin.setMinutes(fechaFin.getMinutes() + 30 * parseInt(this.horaFin));
            var hora, minutos;
            if(fechaFin.getUTCHours() < 10){
                hora = "0"+fechaFin.getUTCHours();
                }else{
                hora = ""+fechaFin.getUTCHours();
                }
                 if(fechaFin.getMinutes() < 10){
                minutos = "0"+fechaFin.getMinutes();
                }else{
                minutos = ""+fechaFin.getMinutes();
                }
            this.horaFinal = hora + ":" + minutos;
        
    });
  }
resta(){
  this.personas--;
}
add(){
  this.personas++;
}
enviar(){
  this.reserva.Inicio = this.fecha + " "+ this.hora;
this.reserva.Usuario = JSON.parse(localStorage.getItem("User")).Id;
this.reserva.Cantidad = this.personas;
console.log(this.reserva);

this.serviceConexiones.reservar(localStorage.getItem("Finca"),this.idSala,this.reserva).subscribe(
      (data) => { // Success
      console.log(data);
    this.router.navigate(['/reservas']);
      },
      (error) => {
        console.error(error);
      }
    );
}
}