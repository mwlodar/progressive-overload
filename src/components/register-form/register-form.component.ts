import { AuthService } from './../../providers/auth/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ModalController } from 'ionic-angular';
import { LoginResponse } from './../../models/login-response/login-response.interface';
import { Account } from './../../models/account/account.interface';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent {   

  account = {} as Account;

  @Output() registerStatus: EventEmitter<LoginResponse>;

  constructor(private auth: AuthService, private modal: ModalController, private database: AngularFireDatabase) {
    this.registerStatus = new EventEmitter<LoginResponse>();
  }

  register() {
    this.auth.createUserWithEmailAndPassword(this.account).then(register => {
      register.result ? this.database.object(`/user-data/${register.result.uid}`).set({ email: this.account.email }) : null;
      this.registerStatus.emit(register);
    })
    
    .catch(e => {
      this.registerStatus.emit(e);
    });
  }
}
