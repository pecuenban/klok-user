import { Component, OnInit } from '@angular/core';
import { ConexionesService } from '../conexiones.service';

@Component({
  selector: 'app-espacios',
  templateUrl: './espacios.component.html',
  styleUrls: ['./espacios.component.css']
})
export class EspaciosComponent implements OnInit {

  finca:any;
  
  constructor(protected conexionesService: ConexionesService) { }

    ngOnInit() {
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
  cambioEstado(elemento) {
    console.log(elemento.target);
    var sala = {
      "id":elemento.target.id,
      "Activa":elemento.target.checked
    }
    this.conexionesService.putSala(localStorage.getItem("Finca"),sala).subscribe(
      data => {
        console.log(data);
        this.finca = data;/*
        if (data.success == -1) {
          elemento.target.checked = false;
        } else {
          elemento.target.checked = true;
        }*/
      },
      error => {
        console.error(error);
      }
    );
  }
}