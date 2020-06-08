import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ConexionesService {

  constructor(protected http: HttpClient) { }
 private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
   //   Authorization: "my-auth-token"
    })
  };

  addFinca(finca) {
    localStorage.setItem("Finca", finca);
  }
  getFinca(id){
    return this.http.get('https://us-central1-klok-reservas.cloudfunctions.net/api/finca/'+id, this.httpOptions);
  }
   postFinca(finca){
    return this.http.post('https://us-central1-klok-reservas.cloudfunctions.net/api/finca',finca, this.httpOptions);
  }
   putSala(id,sala){
    return this.http.put('https://us-central1-klok-reservas.cloudfunctions.net/api/sala/'+id,sala, this.httpOptions);
  }
   postSala(id,sala){
    return this.http.post('https://us-central1-klok-reservas.cloudfunctions.net/api/sala/'+id,sala, this.httpOptions);
  }
   autenticarAdmin(user){
    return this.http.post('https://us-central1-klok-reservas.cloudfunctions.net/api/autenticar/admin',user, this.httpOptions);
  }
}