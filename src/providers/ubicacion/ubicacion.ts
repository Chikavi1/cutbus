import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UsuarioProvider } from '../usuario/usuario';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class UbicacionProvider {

  taxista: AngularFirestoreDocument<any>;
  private watch: Subscription;


  constructor( private afDB: AngularFirestore,
               private geolocation: Geolocation,
               public _usuarioProv: UsuarioProvider) {
    
     this.taxista = afDB.doc(`/usuarios/${ localStorage.getItem("id_ubicacion") }`);

  }

  getCamiones(){
 
  return this.afDB.collection('usuarios').snapshotChanges();
   //return this.afDB.collection('usuarios').valueChanges();
  }

  inicializarTaxista(){
    this.taxista = this.afDB.doc(`/usuarios/${ this._usuarioProv.clave }`);
  }

  crear_usuario(record){
    return this.afDB.collection('usuarios/').add(record).then(function(docRef){
      localStorage.setItem("id_ubicacion",docRef.id);
    });
  }

  borrar_registro(record_id) {
    return this.afDB.doc('usuarios/' + record_id).delete();
  }


  iniciarGeoLocalizacion() {

    this.geolocation.getCurrentPosition().then((resp) => {

      this.afDB.doc('usuarios/' + localStorage.getItem("id_ubicacion")).update({
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      });


       // this.taxista.update({
       //              lat: resp.coords.latitude,
       //              lng: resp.coords.longitude,
       //              clave: this._usuarioProv.clave
       //            });

      return this.geolocation.watchPosition()
              .subscribe((data) => {
                  // data can be a set of coordinates, or an error (if an error occurred).
                  // data.coords.latitude
                  // data.coords.longitude
                  this.afDB.doc('usuarios/' + localStorage.getItem("id_ubicacion")).update({
                      lat: data.coords.latitude,
                      lng: data.coords.longitude
                    });

                  // this.taxista.update({
                  //   lat: data.coords.latitude,
                  //   lng: data.coords.longitude,
                  //   clave: this._usuarioProv.clave
                  // });
      });
     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }

  detenerUbicacion() {

    try {
      this.watch.unsubscribe();
    }catch(e){
      console.log(JSON.stringify(e));
    }


  }

}
