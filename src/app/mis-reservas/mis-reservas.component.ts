import { Component, OnInit } from '@angular/core';
import { ConexionesService } from '../conexiones.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {

  constructor(protected conexionesService: ConexionesService) { }
reserva:any;
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

eliminar(id){
  
   this.conexionesService.elimiarReserva(id,JSON.parse(localStorage.getItem("User")).Id)
    .subscribe(
      (data) => { // Success
      //  this.finca = data;
        console.log(data)
        if(data.msg == "ok"){
          for(var i = 0; i < this.reserva.length;i++){
            if(this.reserva[i].Id == id){
              this.reserva.splice(i,1);
            }
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );
}

}