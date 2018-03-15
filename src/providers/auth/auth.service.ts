import { LoginResponse } from './../../models/login-response/login-response.interface';
import { Account } from './../../models/account/account.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor(private auth: AngularFireAuth) {
  }

  getAuthenticatedUser() {
    return this.auth.authState;
  }

  async createUserWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse>{
        result: await this.auth.auth.createUserWithEmailAndPassword(account.email, account.password)
      };
    }
    catch (e) {
      return <LoginResponse>{
        error: e
      }
    }
  }

  async signInWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse>{
        result: await this.auth.auth.signInWithEmailAndPassword(account.email, account.password)
      };
    }
    catch (e) {
      return <LoginResponse>{
        error: e
      };
    }
  }

  logout() {
    this.auth.auth.signOut();
  }

  resetPassword(email: string) {
    return this.auth.auth.sendPasswordResetEmail(email);
  }

}
