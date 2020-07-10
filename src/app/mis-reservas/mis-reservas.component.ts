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
idEliminar;
popUp = false;
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

  confirmacion(id){
    this.idEliminar = id;
    this.popUp = true;
  }
  
  cerrar(){
    this.popUp = false;
  }

eliminar(){
  
   this.conexionesService.elimiarReserva(this.idEliminar,JSON.parse(localStorage.getItem("User")).Id)
    .subscribe(
      (data) => { // Success
      //  this.finca = data;
        console.log(data)
        if(data.msg == "ok"){
          for(var i = 0; i < this.reserva.length;i++){
            if(this.reserva[i].Id == this.idEliminar){
              this.reserva.splice(i,1);
              this.popUp = false;
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