import { Component, OnInit } from '@angular/core';
import { ConexionesService } from '../conexiones.service';

@Component({
  selector: 'app-fincas',
  templateUrl: './fincas.component.html',
  styleUrls: ['./fincas.component.css']
})
export class FincasComponent implements OnInit {

  finca:any;
  
  constructor(protected conexionesService: ConexionesService) { }

 
    ngOnInit() {
  
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

