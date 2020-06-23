import { Component, OnInit, ViewChild } from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import { ConexionesService } from '../conexiones.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {
    @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;

  constructor(protected serviceConexiones: ConexionesService,private router: Router, private route: ActivatedRoute) { }
user ={
  "Usuario": JSON.parse(localStorage.getItem("User")).Id
}
  ngOnInit() {
    
  }
  mensaje ="";
  mostrarMensaje = false;
escaneo = "";
analizando = false;
ngAfterViewInit():void{
this.qrScannerComponent.getMediaDevices().then(devices => {
            console.log(devices);
            const videoDevices: MediaDeviceInfo[] = [];
            for (const device of devices) {
                if (device.kind.toString() === 'videoinput') {
                    videoDevices.push(device);
                }
            }
            if (videoDevices.length > 0){
                let choosenDev;
                for (const dev of videoDevices){
                  //alert(dev.label);
                    if (dev.label.includes('back')){
                        choosenDev = dev;
                        break;
                    }
                }
                if (choosenDev) {
                    this.qrScannerComponent.chooseCamera.next(choosenDev);
                } else {
                  if(videoDevices.length > 1){
                    this.qrScannerComponent.chooseCamera.next(videoDevices[1]);
                  }else{
                    this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
                  }
                }
            }
        }); 
        this.qrScannerComponent.capturedQr.subscribe(result => {
        if(!this.analizando){
            console.log(result);
            this.escaneo = result;
            this.analizando = true;
this.serviceConexiones.check(this.escaneo,this.user).subscribe(
      (data) => { // Success
      console.log(data);
      var respuesta = data;
      if(respuesta.Estado == 1){
        this.mostrarMensaje = true;
        this.mensaje = "Tu reserva termina a las " + respuesta.Fin;
        setTimeout(() =>
{
this.mostrarMensaje = false;
 setTimeout(() =>
{
    this.router.navigate(['/inicio']);
},
300);
},
3000);
      }else{
        this.mostrarMensaje = true;
        this.mensaje = "Reserva finalizada";
         setTimeout(() =>
{
this.mostrarMensaje = false;
 setTimeout(() =>
{
    this.router.navigate(['/inicio']);
},
300);
},
3000);
      }

     // this.analizando = false;
      },
      (error) => {
        this.mostrarMensaje = true;
        this.mensaje = "No tienes reserva para ahora";
         setTimeout(() =>
{
this.mostrarMensaje = false;
},
3000);
        this.analizando = false;
      }
    );
            
        }
        });
}


}