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
