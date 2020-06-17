import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaFirebase'
})
export class FechaFirebasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var res = new Date(value*1000);
    res.setHours(res.getHours() - 2);
    var dia, minutos, meses;
    if(res.getDate()<10){
      dia = "0"+res.getDate();
    }else{
      dia = res.getDate();
    }
    
    if(res.getMinutes()<10){
      minutos = "0"+res.getMinutes();
    }else{
      minutos = res.getMinutes();
    }
    
    if((res.getMonth() +1)<10){
      meses = "0"+(res.getMonth() +1);
    }else{
      meses = (res.getMonth() +1);
    }
    return dia +"/"+ meses +"/"+res.getFullYear() +" "+res.getHours() +":"+minutos;
  }

}