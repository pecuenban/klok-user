import { Component, OnInit } from '@angular/core';
import { ConexionesService } from '../conexiones.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {

  constructor(protected conexionesService: ConexionesService) { }
reserva;
finca;
  ngOnInit() {
    
 this.conexionesService.getReservas(JSON.parse(localStorage.getItem("User")).Id)
    .subscribe(
      (data) => { // Success
        this.reserva = data;
      },
      (error) => {
        console.error(error);
      }
    );

    
     this.conexionesService.getFinca(localStorage.getItem("Finca"))
    .subscribe(
      (data) => { // Success
        this.finca = data;
        console.log(data)
      },
      (error) => {
        console.error(error);
      }
    );


  }

eliminar(){
  
}

}