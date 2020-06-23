import { Component, OnInit, ViewChild } from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import { ConexionesService } from '../conexiones.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {
    @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;

  constructor(protected serviceConexiones: ConexionesService) { }
user ={
  "Usuario": JSON.parse(localStorage.getItem("User")).Id
}
  ngOnInit() {
  }
  mensaje:any = {
    "Pedro":""
  };
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
      alert("bien");
      this.mensaje = data;
      this.analizando = false;
      },
      (error) => {
        alert("error");
        console.error("error");
        this.mensaje = error;
        this.analizando = false;
      }
    );
            
        }
        });
}
}