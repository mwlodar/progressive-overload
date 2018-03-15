import { LoginResponse } from './../../models/login-response/login-response.interface';
import { Component } from '@angular/core';
import { NavController, MenuController, IonicPage, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(private menu: MenuController, private navCtrl: NavController, private toast: ToastController) {

  }

  register(event: LoginResponse) {
    if (event.result) {
      this.toast.create({
        message: `Account Created: ${event.result.email}`,
        duration: 3000
      }).present();
      return;
    }
    if (event.error) {
      this.toast.create({
        message: `Error: ${event.error.message}`,
        duration: 3000
      }).present();
    }
  } 
}
