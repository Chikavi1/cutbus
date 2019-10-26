import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { Observable } from 'rxjs/Observable';
import { RutaPage } from '../ruta/ruta';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat:number;
  lng:number;
  user:any = {};
  icon= "https://i.ibb.co/Q83Cj1S/bus.png";
  camiones = [];

  init = false;

  modelo;




  constructor(public navCtrl: NavController,public _ubicacionProv: UbicacionProvider) {
  	// this._ubicacionProv.iniciarGeoLocalizacion();
  	// this._ubicacionProv.taxista.valueChanges()
  	//		.subscribe(data => {
  	//			this.user = data;
  	// });

    //casa
  var pos_1 = 20.620661;
  var pos_2 = -103.305341;


  //cut
  var pos_3 = 20.567355;
  var pos_4 = -103.226921;
  var distance = (this.calculateDistance(pos_1,pos_2,pos_3,pos_4) / 1000);

  var km = Math.round(distance)
  console.log("Aprox. "+km+" km");
  }

 rad(x) {
 return x * Math.PI / 180;
};

 getDistance(p1, p2) {
 //  http://es.wikipedia.org/wiki/F{1f0778fe2e852b61c79949ce7b4bb677680b76fea251b03768a071033ace27eb}C3{1f0778fe2e852b61c79949ce7b4bb677680b76fea251b03768a071033ace27eb}B3rmula_del_Haversine
 var R = 6378137; //radio de la tierra en metros
 var dLat = this.rad(p2.lat() - p1.lat());
 var dLong = this.rad(p2.lng() - p1.lng());
 var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.rad(p1.lat())) * Math.cos(this.rad(p2.lat())) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
 var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
 var d = R * c;
 return d;
};

calculateDistance(lat1:number,lat2:number,long1:number,long2:number){
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return dis;
  }

cerrar_sesion(){
  this.navCtrl.push(LoginPage);
  localStorage.removeItem("clave");
  localStorage.removeItem("nombre");
  localStorage.removeItem("id_ubicacion");
}
  irRuta(ruta){
  	this.navCtrl.push(RutaPage,{ruta: ruta});
  }




}
