import { ExerciseLogEntry } from './../../models/exercise-log/exercise-log-entry.interface';
import { AuthService } from './../../providers/auth/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(private navCtrl: NavController, private navParams: NavParams, private auth: AuthService) {
  }

  logout() {
    this.navCtrl.setRoot('LoginPage').then(() => {
      this.auth.logout();
    }); 
  }

  retrieveNavData(exercise:ExerciseLogEntry) {
    this.navCtrl.push('LogExerciseResultsPage', {data: exercise}); 
  }

}
