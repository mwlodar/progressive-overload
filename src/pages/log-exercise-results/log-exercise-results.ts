import { ComponentModalView } from './../display-component-modal/display-component-modal';
import { ExerciseTracker } from './../../models/exercise-tracker/exercise-tracker.interface';
import { AngularFireList, AngularFireObject } from 'angularfire2/database/interfaces';
import { Subscription } from 'rxjs/Subscription';
import { DatabaseService } from './../../providers/database/database.service';
import { SetLogFormComponent } from './../../components/set-log-form/set-log-form.component';
import { ExerciseLogEntry, Set } from './../../models/exercise-log/exercise-log-entry.interface';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-log-exercise-results',
  templateUrl: 'log-exercise-results.html',
})
export class LogExerciseResultsPage {

  scheduledExercise: ExerciseLogEntry;

  resultRef: any;

  sets = [] as Set[];
  setsRef: AngularFireList<Set>;
  sets$: Subscription;

  exerciseRef: AngularFireObject<ExerciseLogEntry>;

  exerciseTrackerRef: AngularFireList<ExerciseTracker>

  setNumber: number;
  completedSets: number;

  @ViewChild(SetLogFormComponent) setForm: SetLogFormComponent;

  constructor(private navCtrl: NavController, private navParams: NavParams, private database: DatabaseService, private modalCtrl: ModalController) {
  }

  createSetRef(key: string) {
    //use set key to find the appropriate node 
    this.resultRef = this.database.database.object<Set>(`scheduledWorkouts/${this.database.uid}/${this.scheduledExercise.date}/workout/exercises/${this.scheduledExercise.key}/sets/${key}/results`);
  }

  ionViewWillEnter() {
    this.scheduledExercise = this.navParams.get('data');
    this.exerciseRef = this.database.database.object<ExerciseLogEntry>(`scheduledWorkouts/${this.database.uid}/${this.scheduledExercise.date}/workout/exercises/${this.scheduledExercise.key}`);
    this.setsRef = this.database.database.list<Set>(`scheduledWorkouts/${this.database.uid}/${this.scheduledExercise.date}/workout/exercises/${this.scheduledExercise.key}/sets`);
    this.exerciseTrackerRef = this.database.database.list<ExerciseTracker>(`exerciseTracker/${this.database.uid}/${this.scheduledExercise.exercise}`);
    
    this.sets$ = this.setsRef.valueChanges().subscribe(sets => {
      this.sets = sets;
      this.setNumber = sets.length;
      this.completedSets = 0;
      sets.forEach(element => {
        element.results ? this.completedSets++ : null;
      });
    })
  }

  ionViewWillLeave() {
    if (!this.scheduledExercise.completed && this.setNumber === this.completedSets) {
      this.exerciseRef.update({completed: true});
      this.database.setListData(this.exerciseTrackerRef, {completedDate: this.scheduledExercise.date, exercise: this.scheduledExercise.exercise, sets: this.sets}, true);
    }
    this.sets$ ? this.sets$.unsubscribe() : null;  
  }

  retrieveSetData(set: Set) {
    this.createSetRef(set.key);
    this.setForm.showForm = false;
    this.setForm.resetForm();
    this.resultRef.set(set);
  }

  logSet(set: Set) {
    this.setForm.showForm = true;
    this.setForm.set = set;
  }

  openComponentModal() {
    let data = {
      header: 'RPE Calculator',
      component: 'rpe-calculator'
    } as ComponentModalView;
    this.modalCtrl.create('DisplayComponentModalPage', {data: data}).present(); 
  }

}
