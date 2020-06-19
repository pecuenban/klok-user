import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';


import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { ConexionesService } from './conexiones.service';
import { FincasComponent } from './fincas/fincas.component';
import { EspaciosComponent } from './espacios/espacios.component';
import { EspacioComponent } from './espacio/espacio.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { AutenticarComponent } from './autenticar/autenticar.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ReservaComponent } from './reserva/reserva.component';
import { MisReservasComponent } from './mis-reservas/mis-reservas.component';
import { FechaFirebasePipe } from './fecha-firebase.pipe';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { ScanComponent } from './scan/scan.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule,HttpClientModule,ReactiveFormsModule,MatIconModule,NgQrScannerModule,
    RouterModule.forRoot([
      { path: '', component: AutenticarComponent },
      { path: 'inicio', component: FincasComponent },
      { path: 'espacios', component: EspaciosComponent },
      { path: 'reservar_espacio/:id', component: EspacioComponent },
      { path: 'contacto', component: ContactoComponent },
      { path: 'reservar/:id/:fecha/:hora', component: ReservaComponent },
      { path: 'reservas', component: MisReservasComponent },
      { path: 'scan', component: ScanComponent },
      
    ])],
  declarations: [ AppComponent, FincasComponent, EspaciosComponent, EspacioComponent, CabeceraComponent, AutenticarComponent, ContactoComponent, ReservaComponent, MisReservasComponent, FechaFirebasePipe, ScanComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ConexionesService]
})
export class AppModule { }
