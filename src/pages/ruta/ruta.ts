import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { Observable } from 'rxjs/Observable';

import swal from 'sweetalert';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-ruta',
  templateUrl: 'ruta.html',
})

export class RutaPage {


  ruta;
  nombre_user;
  lat:number = 20.620608;
  lng:number = -103.305311;

  icon= "https://i.ibb.co/L16MJjx/icon-1.png";
  camiones = [];

  init = false;

  modelo;
  nombre;
  horario;


  valorboton = "";
  compartirubicacion;

  constructor(public navCtrl: NavController,public navparams:NavParams, public _ubicacionProv: UbicacionProvider,private geolocation: Geolocation  ) {

  		this.ruta = this.navparams.get("ruta");
  		this.nombre_user = localStorage.getItem("nombre");

	  this._ubicacionProv.getCamiones().subscribe(data => {
	 
	      this.camiones = data.map(e => {

	      	this.lat = e.payload.doc.data()['lat'];
	      	this.lng = e.payload.doc.data()['lng'];


	        return {
	          id: e.payload.doc.id,

	          nombre: e.payload.doc.data()['nombre'],
	          lng: e.payload.doc.data()['lng'],
	          lat: e.payload.doc.data()['lat'],
	          modelo: e.payload.doc.data()['modelo'],
	          horario: e.payload.doc.data()['horario']
	        };
	      })
	      console.log(this.camiones[0]);
	    });



	  if(localStorage.getItem("id_ubicacion")){
	  	this.compartirubicacion = true;
	  }else{
	  	this.compartirubicacion = false;
	  }

	  if(this.compartirubicacion){
	  	this.valorboton = "eliminar ubicacion";
	  }else{
	  	this.valorboton = "compartir ubicacion";
	  }


      if(localStorage.getItem("id_ubicacion")){
  	 		this._ubicacionProv.iniciarGeoLocalizacion();
 		}


  	this._ubicacionProv.taxista.valueChanges()
  			.subscribe(data => {
  				console.log(data);
  	 });
  }


 changename(){
 	
   	 console.log(this.compartirubicacion)
     this.compartirubicacion = !this.compartirubicacion

	   if(this.compartirubicacion){
	     console.log("se activo la funcion de compartir ubicacion");
	     this.agregarUbicacion();
	     this.valorboton = "eliminar ubicacion";
	   }else{
	     console.log("funcion eliminar activada,se elimino");
	   	this.eliminarUbicacion();
	   	this.valorboton = "compartir ubicacion";
	   }
 }

 agregarUbicacion(){
 	this.mostrar_input();
 }

 eliminarUbicacion(){
 	this._ubicacionProv.borrar_registro(localStorage.getItem("id_ubicacion"))
 	.then(resp=>{
	 	console.log("se elimino el registro");
	 	localStorage.removeItem("id_ubicacion");
	 	this.compartirubicacion = false;
	});
 }

  
mostrar_input(){
  	swal("Introduce el numero de serie de la unidad.", {
	  content: "input",
	} as any)
	.then((value) => {
		if(value){
			this.crear_usuario(value);
		  	this.mostrar_mensaje("Gracias!","se ha compartido tu ubicación","success");
		}else{
			this.compartirubicacion = false;
			this.valorboton = "compartir ubicacion";
			this.mostrar_mensaje("Error","Introduce un valor","error");
		}
	});
}

  mostrar_mensaje(title,text,status):any{
  	swal({
		  title: title,
		  text: text,
		  icon: status,
		  buttons: {
		  cancel: { text: 'Cancelar' },
		  confirm: { text: 'Aceptar' },
		}
			});
  	}

  crear_usuario(modelo){
  	this.geolocation.getCurrentPosition().then((resp) => {
	    this.lat =  resp.coords.latitude;
	    this.lng = resp.coords.longitude;
	  });
  	 let record = {};
  	 let data = new Date();
  	 let hora = this.tConvert(data.getHours()+":"+data.getMinutes());


     record['nombre'] = localStorage.getItem("nombre");
     record['horario'] = hora;
     record['lat'] = this.lat;
     record['lng'] = this.lng;
  	 
     record['modelo'] = modelo;
	   	this._ubicacionProv.crear_usuario(record).then(resp=>{
	   	 });
  }

infomarket(camion){

  	this.modelo = camion.modelo;
  	this.nombre = camion.nombre;
  	this.horario = camion.horario;
  }

  

tConvert (time) {
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}




}
