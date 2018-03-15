import { Exercise } from './../../models/create-exercise/create-exercise.interface';
import { ToastController } from 'ionic-angular';
import { SetLogFormComponent } from './../set-log-form/set-log-form.component';
import { Set, ExerciseLogEntry } from './../../models/exercise-log/exercise-log-entry.interface';
import { DatabaseService } from './../../providers/database/database.service';
import { Component, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Select } from 'ionic-angular/components/select/select';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'exercise-log-form',
  templateUrl: 'exercise-log-form.component.html'
})
export class ExerciseLogFormComponent implements OnInit, OnChanges { 

  @ViewChild(SetLogFormComponent) setForm: SetLogFormComponent;
  @ViewChild('exerciseSelector') exerciseSelector: Select;

  @Input() exerciseLogEntry: ExerciseLogEntry;

  @Output() sendExerciseSelection: EventEmitter<string>;
  @Output() sendSetData: EventEmitter<Set>;
  @Output() sendExerciseLogEntry: EventEmitter<ExerciseLogEntry>;
  @Output() resetExercise: EventEmitter<boolean>;
  @Output() sendDate: EventEmitter<string>;

  exercises$: Observable<Exercise[]>;
  disable = true as boolean;

  constructor(private database: DatabaseService, private toastCtrl: ToastController) {
     this.sendExerciseSelection = new EventEmitter<string>();
     this.sendSetData = new EventEmitter<Set>();
     this.sendExerciseLogEntry = new EventEmitter<ExerciseLogEntry>();
     this.resetExercise = new EventEmitter<boolean>();
     this.sendDate = new EventEmitter<string>();
  }

  ngOnInit() {
    this.exercises$ = this.database.getExerciseListRef().valueChanges();
  }

  ngOnChanges() {
    if (this.exerciseLogEntry) {
      this.exerciseLogEntry.exercise ? this.setForm.showForm = true : this.setForm.showForm = false;
      this.exerciseLogEntry.sets ? this.disable = false : this.disable = true;
    } else {
      this.exerciseLogEntry = {} as ExerciseLogEntry;
      this.setForm.showForm = false;
      this.setForm.set = {} as Set;
    }
  }

  retrieveSetData(set: Set) {
    this.sendSetData.emit(set);
  }

  selectExercise(exercise:string) {
    this.exerciseSelector.close();
    this.setForm.resetForm();
    this.sendExerciseSelection.emit(exercise);
  }

  selectDate() {
    this.sendDate.emit(this.exerciseLogEntry.date);   
  }

  finishExercise() {
    this.sendExerciseLogEntry.emit(this.exerciseLogEntry);
    this.setForm.resetForm();
    this.openToast().present();    
  }

  resetMovement() {
    this.resetExercise.emit(true);
  }

  openToast() {
    return this.toastCtrl.create({
      message: `Successfully logged ${this.exerciseLogEntry.exercise}!`,
      position: 'bottom',
      duration: 2000
    })
  }

}
