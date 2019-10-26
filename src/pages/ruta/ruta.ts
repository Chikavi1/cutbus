import { Component } from '@angular/core';
import { NavController,NavParams,ModalController } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { Observable } from 'rxjs/Observable';
import { FormPage } from '../form/form';

//import swal from 'sweetalert';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-ruta',
  templateUrl: 'ruta.html',
})

export class RutaPage {

  ruta;
  nombre_usuario;

  latitudInicial:number = 20.620608;
  longitudInicial:number = -103.305311;

  icon= "https://i.ibb.co/L16MJjx/icon-1.png";
  cut = "https://i.ibb.co/7k0b3KP/CUT-Sin-Fondo-2.png";
  camiones = [];

  latitudUsuario;
  longitudUsuario;

  init = false;

  modelo;
  nombre;
  horario;


  valorboton = "";
  compartirubicacion;

  constructor(public navCtrl: NavController,
  			  public navparams:NavParams,
  			  public modalCtrl: ModalController,
  	 		  public _ubicacionProv: UbicacionProvider,
  	 		  private geolocation: Geolocation  ) {

  			//obtengo la ruta
  			this.ruta = this.navparams.get("ruta");
  			//obtengo el nombre
  			this.nombre_usuario = localStorage.getItem("nombre");

  			//obtengo los camiones y los guardo en los camiones
      		this._ubicacionProv.obtenerCamiones().subscribe(data => {
 			this.camiones = data.map(e => {
		          //this.latitudInicial = e.payload.doc.data()['lat'];
		          //this.longitudInicial = e.payload.doc.data()['lng'];
		          return {
		            id: e.payload.doc.id,
		            nombre: e.payload.doc.data()['nombre'],
		            lng: e.payload.doc.data()['lng'],
		            lat: e.payload.doc.data()['lat'],
		            modelo: e.payload.doc.data()['modelo'],
		            horario: e.payload.doc.data()['horario']
		          };
		        })
          		//console.log(this.camiones);
	    	  });
 
				//si comparto la ubicacion o no	  
			  if(localStorage.getItem("id_ubicacion")){
			  	this.compartirubicacion = true;
			  }else{
			  	this.compartirubicacion = false;
			  }
			   //el boton para eliminar o compartir la ubicacion
			  if(this.compartirubicacion){
			  	this.valorboton = "eliminar ubicacion";
			  }else{
			  	this.valorboton = "compartir ubicacion";
			  }
				
				//si estoy compartiendo la ubicacion actualiza

	      	if(localStorage.getItem("id_ubicacion"))
	      	{
            	this._ubicacionProv.ubicacionTiempoReal();
 			}

  }

ionViewDidLoad() {
  
  }

 changename(){
   	 //console.log(this.compartirubicacion)
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
 	this.navCtrl.push(FormPage)
 	//this.mostrar_input();
 	//this.modalCtrl.create(FormPage).present()
 }


 eliminarUbicacion(){
 	this._ubicacionProv.borrar_registro(localStorage.getItem("id_ubicacion"))
 	.then(resp=>{
	 	console.log("se elimino el registro");
	 	localStorage.removeItem("id_ubicacion");
	 	this.compartirubicacion = false;
	 	this.modelo = null;
	  	this.nombre = null;
	  	this.horario = null;
	});
 }


infomarket(camion){
  	this.modelo = camion.modelo;
  	this.nombre = camion.nombre;
  	this.horario = camion.horario;
  }







}
