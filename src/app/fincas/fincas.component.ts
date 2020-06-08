import { Component, OnInit } from '@angular/core';
import { ConexionesService } from '../conexiones.service';

@Component({
  selector: 'app-fincas',
  templateUrl: './fincas.component.html',
  styleUrls: ['./fincas.component.css']
})
export class FincasComponent implements OnInit {

  finca;
  
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
    /*this.userService.estadoUsuario().subscribe(
      data => {
        if (data.success == -1) {
          elemento.target.checked = false;
        } else {
          elemento.target.checked = true;
        }
      },
      error => {
        console.error(error);
      }
    );*/
  }
}

