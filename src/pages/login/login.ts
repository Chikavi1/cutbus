import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides,AlertController,LoadingController} from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';
import swal from 'sweetalert';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 codigo:any;
 nip:any;

  constructor(public navCtrl: NavController,
  			  public navParams: NavParams,
  			  public alertCtrl: AlertController,
  			  public loadingCtrl: LoadingController,
  			  public _usuarioProv: UsuarioProvider) {
  }

  ingresar(){
    this.navCtrl.setRoot( HomePage );
  }

  login(){
    this._usuarioProv.login(this.codigo,this.nip)
        .subscribe((data)=>{
          if(data._body == "incorrecto"){
            console.log("error");
            this.mostrar_mensaje("Error","Tus datos estan mal.","error");
          }else{
            this.mostrar_mensaje("¡Hola!",data._body,"success");
            localStorage.setItem("clave",this.codigo);
            localStorage.setItem("nombre",data._body);
            this.ingresar();
          }
    });
  }

  mostrar_mensaje(title,text,status){
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




}
