import { Workout, ScheduledExercise } from './../../models/schedule-workout/workout-exercises.interface';
import { ExerciseLogEntry, Set } from './../../models/exercise-log/exercise-log-entry.interface';
import { AlertController } from 'ionic-angular';
import { Exercise } from './../../models/create-exercise/create-exercise.interface';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList, AngularFireObject } from 'angularfire2/database/interfaces';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth/auth.service';
import * as moment from 'moment';

@Injectable()
export class DatabaseService {

  timeStamp: any = firebase.database['ServerValue']['TIMESTAMP'];
  uid:string;
  today = moment() as moment.Moment;
  todayString = moment().format('YYYY-MM-DD') as string;

  exerciseListRef: AngularFireList<Exercise>;

  constructor(public database: AngularFireDatabase, private alertCtrl: AlertController, private auth: AuthService) {
    this.auth.getAuthenticatedUser().subscribe(user => {
      if (user) {
        this.uid = user.uid;
        this.exerciseListRef = this.database.list<Exercise>(`exercises/${this.uid}`);
        console.log("USER ID CHANGE FROM DATABASE: ", this.uid, this.exerciseListRef);
      }
    });
  }

  getDatabaseDateString(date: moment.Moment) {
    return date.format('YYYY-MM-DD'); 
  }

  async setListData(ref:any, data:any, timestamp?: boolean) {
    //copy firebase key into data object and add timestamp then store data
    let d = data;
    timestamp ? data.timeStamp = this.timeStamp : null;
    try {
      const r = await ref.query.ref.push();
      d.key = r.key;
      r.set(d);
      return r.key;
    }
    catch(e) {
      this.handleError(e);
    }
  }

  async updateObjectData(data: any, ref:any, timestamp?: boolean) {
    let d = data;
    timestamp ? d.timestamp = this.timeStamp : null;
    try {
      await ref.update(d);
      console.log("Updated to", d);
      return d;
    }
    catch(e) {
      this.handleError(e);
    }
  }

  async setObjectData(data: any, ref:any, timestamp?: boolean) {
    let d = data;
    timestamp ? d.timestamp = this.timeStamp : null;
    try {
      await ref.set(d);
      console.log("SET OBJECT TO", data);
      return d;
    }
    catch(e) {
      this.handleError(e);
    }
  }

  async clearObjectData(ref:any) {
    try {
      await ref.remove();
      console.log("CLEARED", ref);
    }
    catch(e) {
      this.handleError(e);
    }
  }

  async updateListData(ref:any, key:string, data:any) {
    try {
      return ref.update(key, data);
    }
    catch(e) {
      this.handleError(e);
    }
  }

  handleError(error) {
    this.alertCtrl.create({
      title: 'Error',
      message: error.message,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    }).present();
  }

  getExerciseListRef() {
    return this.exerciseListRef;
  }

}
