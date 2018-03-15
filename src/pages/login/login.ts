import { User } from 'firebase/app';
import { LoginResponse } from './../../models/login-response/login-response.interface';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(private navCtrl: NavController, private menu: MenuController, private toast: ToastController) {
 
  }

  login(event: LoginResponse) {
    if(!event.error) {
      this.toast.create({
        message: `Welcome to Progressive Overload, ${event.result.email}`,
        duration: 3000
      }).present();
    }
    else {
      this.toast.create({
        message: event.error.message,
        duration: 3000
      }).present();
    }
  }
}
