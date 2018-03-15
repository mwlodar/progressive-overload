import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Set } from './../../models/exercise-log/exercise-log-entry.interface';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'set-log-form',
  templateUrl: 'set-log-form.component.html' 
})
export class SetLogFormComponent implements OnInit {   

  showForm = false as boolean; 
  @Input() set = {
    set: 1,
    metric: 'lb'
  } as Set;

  @Input() showCloseButton = false as boolean;

  intensityOptions = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10] as Array<Set['intensity']>;
  weightLabel: string;
  setNumber = 1 as number;
  logSetText = 'Log Set' as string;

  @Output() sendSetData: EventEmitter<Set>;
  @Output() sendDeleteSet: EventEmitter<Set>;

  constructor() {
    this.sendSetData = new EventEmitter<Set>();
    this.sendDeleteSet = new EventEmitter<Set>();
  }

  ngOnInit() {
    this.weightLabel = `Weight(lb)`;
  }

  save(form: NgForm) {
    this.sendSetData.emit(this.set);
  }

  incrementSet() {
    this.set.set++;
  }

  resetForm() {
    this.set = {
      set: 1,
      metric: 'lb'
    } as Set;
  }

  deleteSet(set: Set) {
    this.sendDeleteSet.emit(set);
  }

}
