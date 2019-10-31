import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
//import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { LocationProvider } from '../../providers/location/location';

@Component({
  selector: 'page-background',
  templateUrl: 'background.html',
})
export class BackgroundPage {
 locations = [];
 // config: BackgroundGeolocationConfig = {
 //            desiredAccuracy: 10,
 //            stationaryRadius: 2,
 //            distanceFilter: 2,
 //            debug: true, //  Esto hace que el dispositivo emita sonidos cuando lanza un evento de localización
 //            stopOnTerminate: false, // Si pones este en verdadero, la aplicación dejará de trackear la localización cuando la app se haya cerrado.
 //   			notificationTitle: "Cutbus esta usando tu ubicacion",
 //   			notificationText: "Recuerda borrar tu ubicacion",

 //    };
  constructor(public navCtrl: NavController, public navParams: NavParams,
          private toastCtrl: ToastController,public locationTracker: LocationProvider) {
  	

  	// this.backgroundGeolocation.configure(this.config)
   //        .then(() => {
   //          this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
   //            this.presentToast(location);
   //            this.locations.push(location);
   //            console.log(location);
   //            // Es muy importante llamar al método finish() en algún momento para que se le notifique al sistema que hemos terminado y que libere lo que tenga que liberar,
   //            // Si no se hace, la aplicación dará error por problemas de memoria.
   //            this.backgroundGeolocation.finish(); // SOLO PARA IOS
   //          });
   //        });
  }

 start(){
    this.locationTracker.startTracking();
  }

  stop(){
    this.locationTracker.stopTracking();
  }
 
 presentToast(location) {
  let toast = this.toastCtrl.create({
    message: "lat: "+location.latitude+" lng: "+location.longitude,
    duration: 1000,
    position: 'top'
  });

  toast.present();
}
}
