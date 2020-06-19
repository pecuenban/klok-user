import { Component, OnInit, ViewChild } from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {
    @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;

  constructor() { }

  ngOnInit() {
  }
escaneo = "";
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
            console.log(result);
            alert("Escaneado");
            this.escaneo = result;
        });
}
}