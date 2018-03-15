import { Set, ExerciseLogEntry } from './../../models/exercise-log/exercise-log-entry.interface';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { ScheduledExercise } from './../../models/schedule-workout/workout-exercises.interface';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'exercise-list',
  templateUrl: 'exercise-list.component.html'
})
export class ExerciseListComponent implements OnChanges {

  @Input() exerciseListRef: AngularFireList<ScheduledExercise>;  

  @Output() sendEditSet: EventEmitter<any>;
  @Output() sendAddSet: EventEmitter<ExerciseLogEntry>;
  @Output() sendDeleteSet: EventEmitter<any>;
  @Output() sendDeleteEx: EventEmitter<string>;

  exerciseList$: Observable<ScheduledExercise[]>; 

  constructor() {
    this.sendEditSet = new EventEmitter<any>();
    this.sendAddSet = new EventEmitter<ExerciseLogEntry>();
    this.sendDeleteSet = new EventEmitter<any>();
    this.sendDeleteEx = new EventEmitter<string>();
  }

  ngOnChanges() {
    this.exerciseList$ = this.exerciseListRef.valueChanges();  
  }

  edit(set: Set, exKey:string) {
    this.sendEditSet.emit({set:set, exKey:exKey});
  }

  addSet(exercise: ExerciseLogEntry) {
    this.sendAddSet.emit(exercise);
  }

  delete(setKey:string, exKey: string) {
    this.sendDeleteSet.emit({setKey: setKey, exKey: exKey}); 
  }

  deleteEx(key:string) {
    this.sendDeleteEx.emit(key);  
  }

}
