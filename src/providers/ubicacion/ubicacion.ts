import { Injectable,NgZone } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { debounceTime } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UsuarioProvider } from '../usuario/usuario';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/filter';

@Injectable()
export class UbicacionProvider {

public watch: any;  
 posOptions = {
         enableHighAccuracy: true,
         timeout:2500,
         maximumAge: 4050
     };

  public countFor: number = 0;
  public countBack: number = 0;

  config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 70,
      distanceFilter: 70,
      debug: true,
      interval: 10000,
      stopOnTerminate: false, // Si pones este en verdadero, la aplicación dejará de trackear la localización cuando la app se haya cerrado.
     notificationTitle: "Cutbus esta usando tu ubicacion",
     notificationText: "Recuerda borrar tu ubicacion",
    };

  constructor( public zone: NgZone,
               private afDB: AngularFirestore,
               private geolocation: Geolocation,
               private backgroundGeolocation: BackgroundGeolocation,
               public _usuarioProv: UsuarioProvider) {
  }

  obtenerCamiones(){
  console.log("PETICION get ");
  return this.afDB.collection('usuarios').snapshotChanges();
   //return this.afDB.collection('usuarios').valueChanges();
  }

  crear_usuario(record){
    return this.afDB.collection('usuarios/').add(record).then(function(docRef){
      localStorage.setItem("id_ubicacion",docRef.id);
      localStorage.setItem("hora_ubicacion",record.horario);
    });
  }

  borrar_registro(record_id) {
    console.log("PETICION delete");
    return this.afDB.doc('usuarios/' + record_id).delete();
  }

  obtenerubicacion(){

    return this.geolocation.getCurrentPosition();
  }
 
 creartiemporeal(){
 
   return this.geolocation.watchPosition(this.posOptions);
             
 }


  ubicacionTiempoReal() {

      this.backgroundGeolocation.configure(this.config)
          .then(() => {
            this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
             
              console.log(location);

            this.afDB.doc('usuarios/' + localStorage.getItem("id_ubicacion")).update({
                         lat: location.latitude,
                         lng: location.longitude
                       });

               this.zone.run(() => {
                this.countBack++;
              });

              //this.backgroundGeolocation.finish(); // SOLO PARA IOS
            });
          });


      this.watch = this.geolocation.watchPosition(this.posOptions).pipe(debounceTime(5200)).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

        console.log(position);

        this.afDB.doc('usuarios/' + localStorage.getItem("id_ubicacion")).update({
                         lat: position.coords.latitude,
                         lng: position.coords.longitude
                       });

        // Run update inside of Angular's zone
        this.zone.run(() => {
          this.countFor++;
        });

       

      });
  }

}
