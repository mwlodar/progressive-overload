import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ToastController } from 'ionic-angular';
import { Exercise } from './../../models/create-exercise/create-exercise.interface';
import { Component } from '@angular/core';
import { DatabaseService } from '../../providers/database/database.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'create-exercise-form',
  templateUrl: 'create-exercise-form.component.html' 
})
export class CreateExerciseFormComponent implements OnInit{

  exercise = {} as Exercise;
  url:string;
  slotOptions: Array<Exercise["slot"]>;
  typeOptions: Array<Exercise["type"]>;
  
  exerciseList$: Observable<Exercise[]>;

  constructor(private database: DatabaseService, private toastCtrl: ToastController) {
    this.slotOptions = ['Upper Body', 'Lower Body', 'Torso', 'Other'];
    this.typeOptions = ['Press', 'Pull', 'Leg/Hip Drive', 'Other'];

  }  

  ngOnInit() {
    this.exerciseList$ = this.database.exerciseListRef.valueChanges();
  }

  async save(form:NgForm) {
    try {
      if (this.url) {
        this.exercise.url = [];
        this.exercise.url.push(this.url);
        this.url = "";
      }
      await this.database.setListData(this.database.exerciseListRef, this.exercise, true);

      this.openToast().present();
      this.exercise = {} as Exercise;
      form.resetForm(this.exercise);
    }

    catch(e) {
      this.database.handleError(e);
    }
    
  }

  openToast() {
    return this.toastCtrl.create({
      message: `Saved ${this.exercise.name} to your list of exercises`,
      position: 'bottom',
      duration: 2000
    });
  }

  deleteExercise(exercise: Exercise) {
    this.database.exerciseListRef.remove(exercise.key);
  }



}
