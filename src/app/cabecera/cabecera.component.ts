import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
verMenu = false;
  constructor() { }

  ngOnInit() {
  }
  menu(){
    this.verMenu = !this.verMenu;
  }

}