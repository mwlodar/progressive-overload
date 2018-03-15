import { AuthService } from './../../providers/auth/auth.service';
import { AlertController, ToastController } from 'ionic-angular';
import { LoginResponse } from './../../models/login-response/login-response.interface';
import { Account } from './../../models/account/account.interface';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html'
})
export class LoginFormComponent {     

  account = {} as Account;
  @Output() loginStatus: EventEmitter<LoginResponse>;

  constructor(private auth: AuthService, private alertCtrl: AlertController, private toast: ToastController) {
    this.loginStatus = new EventEmitter<LoginResponse>();
  }

  async login() {
    const login = await this.auth.signInWithEmailAndPassword(this.account); 
    this.loginStatus.emit(login);
  }

  showToast(msg: string) {
    this.toast.create({
      message: msg,
      duration: 3000,
      position: 'top'
    }).present();
  }

  resetPassword() {
    let prompt = this.alertCtrl.create({
      title: 'Reset Password',
      message: 'Enter your email below',
      inputs: [
        {
          name: 'email',
          placeholder: 'example@example.com'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Submit',
          handler: data => {
            this.auth.resetPassword(data.email).then(data => {
              this.showToast('Email sent! Please check your email for further instructions.');
            })
            .catch(err => {
              this.showToast(err.message);
            });
          }
        }
      ]
    });
    prompt.present();
}

}
