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
  icon= "https://i.ibb.co/L16MJjx/icon-1.png";
  cut = "https://i.ibb.co/7k0b3KP/CUT-Sin-Fondo-2.png";
  latitudInicial:number = 20.620608;
  longitudInicial:number = -103.305311;
   latitudCutonala = 20.566187;
  longitudCutonala = -103.226863;
 locations = [];
 styles;
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
  	    
 this.styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#85f1c6"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2d4f8c"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#c8d0fb"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

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
