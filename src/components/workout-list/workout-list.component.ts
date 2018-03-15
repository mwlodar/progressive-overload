import { Global } from './../../app/app.component';
import { ExerciseLogEntry } from './../../models/exercise-log/exercise-log-entry.interface';
import { DatabaseService } from './../../providers/database/database.service';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { Component, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'workout-list',
  templateUrl: 'workout-list.component.html'
})
export class WorkoutListComponent implements OnInit{

  exerciseListRef: AngularFireList<ExerciseLogEntry>;
  date = moment() as moment.Moment;
  uid = Global.uid as string;

  formattedDate: string;

  exerciseList$: Observable<ExerciseLogEntry[]>;

  @Output() sendNavData: EventEmitter<ExerciseLogEntry>;

  constructor(private database: DatabaseService) {
    this.sendNavData = new EventEmitter<ExerciseLogEntry>();
  }

  ngOnInit() {
    this.date ? null : this.date = moment();
    this.formatDate(this.date);
    this.setRef();
    this.exerciseListRef ? this.exerciseList$ = this.exerciseListRef.valueChanges() : null;
  }

  setRef() {
    this.uid ? null : this.uid = this.database.uid;
    return this.exerciseListRef = this.database.database.list(`scheduledWorkouts/${this.uid}/${this.database.getDatabaseDateString(this.date)}/workout/exercises`);
  }

  incrementDate(direction: 'up' | 'down') {
    direction === 'up' ? this.date = moment(this.date).add(1, 'd') : this.date = moment(this.date).subtract(1, 'd');
    this.formatDate(this.date);
    this.setRef();
    this.exerciseList$ = this.exerciseListRef.valueChanges(); 
  }

  formatDate(date: moment.Moment) {
    this.formattedDate = date.format('ddd, MMM Do YYYY');   
  }

  nav(exercise: ExerciseLogEntry) {
    this.sendNavData.emit(exercise);
  }

}
