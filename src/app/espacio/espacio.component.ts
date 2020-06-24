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
hoy = "";
fecha = "";
idEditar;
idSala = "";
  verMenu=false;
   menu(){
    this.verMenu = !this.verMenu;
  }
  constructor(protected conexionesService: ConexionesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    var dia;
    var mes;
    if(new Date().getDate() > 9){
    dia = new Date().getDate();
    }else{
    dia = "0"+new Date().getDate();
    }
    if(parseInt(new Date().getMonth().toString()) +1 > 9){
    mes = (parseInt(new Date().getMonth().toString() )+1);
    }else{
    mes = "0"+(parseInt(new Date().getMonth().toString()) +1);
    }
    this.hoy = new Date().getFullYear() + "-"+mes+ "-"+dia;
    this.fecha = new Date().getFullYear() + "-"+mes+ "-"+dia;
      this.route.paramMap.subscribe(params => {
        
        
            if (params.get("id") != null) {
              this.idSala = params.get("id");
 this.conexionesService.getHoras(localStorage.getItem("Finca"), this.idSala,this.fecha)
    .subscribe(
      (data) => { // Success
        this.sala = data;
        localStorage.setItem("tiempo",this.sala.Tiempo);
      },
      (error) => {
        console.error(error);
      }
    );
  
  
            }

        
    });
    

  }
  actualizar(){
 this.conexionesService.getHoras(localStorage.getItem("Finca"), this.idSala,this.fecha)
    .subscribe(
      (data) => { // Success
        this.sala = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  enlace(franja, libre){

        localStorage.setItem("espacio",libre);
      this.router.navigate(['/reservar/'+this.idSala +'/'+this.fecha+'/'+franja]);
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