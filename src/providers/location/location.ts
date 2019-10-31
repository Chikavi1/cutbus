import { Injectable, NgZone } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

@Injectable()
export class LocationProvider {

  public watch: any;    
  public lat: number = 0;
  public lng: number = 0;

  constructor(public zone: NgZone,private backgroundGeolocation: BackgroundGeolocation,private geolocation: Geolocation) {

  }
startTracking(){

    // Background Tracking

    let config: BackgroundGeolocationConfig = {
      desiredAccuracy: 0,
      stationaryRadius: 2,
      distanceFilter: 2,
      debug: true,
      interval: 2000,
      stopOnTerminate: false, // Si pones este en verdadero, la aplicación dejará de trackear la localización cuando la app se haya cerrado.
     notificationTitle: "Cutbus esta usando tu ubicacion",
     notificationText: "Recuerda borrar tu ubicacion"
    };


    this.backgroundGeolocation.configure(config)
          .then(() => {
            this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
             
              console.log(location);
               this.zone.run(() => {
        		this.lat = location.latitude;
        		this.lng = location.longitude;
      			});

              //this.backgroundGeolocation.finish(); // SOLO PARA IOS
            });
          });


		    // Turn ON the background-geolocation system.
		    this.backgroundGeolocation.start();


		    // Foreground Tracking

		  let options = {
		    frequency: 3000, 
		    enableHighAccuracy: true
		  };

		  this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

		    console.log(position);

		    // Run update inside of Angular's zone
		    this.zone.run(() => {
		      this.lat = position.coords.latitude;
		      this.lng = position.coords.longitude;
		    });

		  });

		  }

 stopTracking() {

    console.log('stopTracking');

    this.backgroundGeolocation.stop();
    this.watch.unsubscribe();

  }

}



