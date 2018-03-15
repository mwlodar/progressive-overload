import { AngularFireList, AngularFireObject } from 'angularfire2/database/interfaces';
import { DatabaseService } from './../../providers/database/database.service';
import { Set, ExerciseLogEntry } from './../../models/exercise-log/exercise-log-entry.interface';
import { Subscription } from 'rxjs/Subscription';
import { ExerciseLogFormComponent } from './../../components/exercise-log-form/exercise-log-form.component';
import { Workout, ScheduledExercise } from './../../models/schedule-workout/workout-exercises.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-schedule-workout',
  templateUrl: 'schedule-workout.html',
})
export class ScheduleWorkoutPage {

  workoutRef: AngularFireObject<Workout>;
  exercisesRef: AngularFireList<ScheduledExercise>;
  activeDataRef: any;
  activeSetsRef: AngularFireList<Set>;

  workout = {
    active_data: {} as ExerciseLogEntry
  } as Workout;
  workout$: Subscription;

  activeEx$: Subscription;

  date:string;

  @ViewChild(ExerciseLogFormComponent) exerciseLogForm: ExerciseLogFormComponent;

  constructor(private navCtrl: NavController, private navParams: NavParams, private database: DatabaseService) {
  }

  ionViewWillLoad() {
    this.createRefs();
    this.createSubscription();
  }

  createRefs(date?: string) {
    date ? this.date = date : this.date = this.database.todayString;
    this.workoutRef = this.database.database.object(`scheduledWorkouts/${this.database.uid}/${this.date}/workout`);
    this.exercisesRef = this.database.database.list(`scheduledWorkouts/${this.database.uid}/${this.date}/workout/exercises`);
    this.activeDataRef = this.database.database.object(`scheduledWorkouts/${this.database.uid}/${this.date}/workout/active_data`);
    this.activeSetsRef = this.database.database.list(`scheduledWorkouts/${this.database.uid}/${this.date}/workout/active_data/sets`);
  }

  createSubscription(date?: string) {
    date ? null : date = this.database.todayString;
    this.workout$ ? this.workout$.unsubscribe() : null;

    this.workout$ = this.workoutRef.valueChanges().subscribe(workout => {
      console.log("Updated Subscription", workout);
      if (workout) {
        this.workout = workout;
      } else {
        this.workout = {
          date:date,
          completed: false,
          active_data: {date:date, completed: false} as ExerciseLogEntry
        } as Workout;
        this.database.updateObjectData(this.workout, this.workoutRef);
      }
    });
  }

  ionViewWillUnload() {
    this.workout$ ? this.workout$.unsubscribe() : null;
  }

  retrieveDate(date: string) {
    this.createRefs(date);
    this.createSubscription(date);
  }

  retrieveSet(set: Set) {
    this.database.setListData(this.activeSetsRef, set).then(() => {
      this.exerciseLogForm.setForm.incrementSet();
    });
  }

  retrieveExerciseSelection(exercise: string) {
    this.database.updateObjectData({ exercise: exercise }, this.activeDataRef);
  }

  retrieveExerciseLogEntry(exerciseLog: ExerciseLogEntry) {
    this.database.setListData(this.exercisesRef, { date: exerciseLog.date, completed:false, exercise: exerciseLog.exercise, sets: exerciseLog.sets, timestamp: this.database.timeStamp }).then(() => {
      this.database.setObjectData({date: exerciseLog.date}, this.activeDataRef);
    })
  }

  retrieveResetExercise(reset: boolean) {
    reset ? this.database.setObjectData({date: this.workout.date}, this.activeDataRef) : null;
  }

  retrieveEditSet(data:any) {
    let ref = this.database.database.list(`scheduledWorkouts/${this.database.uid}/${this.date}/workout/exercises/${data.exKey}/sets`);
    this.navCtrl.push('EditSetPage', {data: data.set, ref: ref});
  }

  retrieveAddSet(exercise: ExerciseLogEntry) {  
    let ref = this.database.database.list(`scheduledWorkouts/${this.database.uid}/${this.date}/workout/exercises/${exercise.key}/sets`);
    this.navCtrl.push('EditSetPage', {data: {}, ref: ref});  
  }

  retrieveDeleteSet(keys) {
    let ref = this.database.database.list(`scheduledWorkouts/${this.database.uid}/${this.date}/workout/exercises/${keys.exKey}/sets`);
    ref.remove(keys.setKey);
  }

  retrieveDeleteEx(key) {
    let ref = this.database.database.list(`scheduledWorkouts/${this.database.uid}/${this.date}/workout/exercises/`);
    ref.remove(key);      
  }

}
