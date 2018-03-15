import { AlertController } from 'ionic-angular';
import { RPEChart } from './../../models/RPE-chart/RPE-chart';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Component } from '@angular/core';

export interface RPEData {
  completedWeight:any;
  completedReps: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  completedRPE: 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10;
  goalReps: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  goalRPE: 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10;
}

@Component({
  selector: 'rpe-calculator',
  templateUrl: 'rpe-calculator.component.html'
})
export class RpeCalculatorComponent {

  data = {

  } as RPEData;

  intensityOptions = [ 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10 ] as RPEData['completedRPE'][];
  repsOptions = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ] as RPEData['completedReps'][];

  rpeChart: RPEChart;

  constructor(private popupCtrl: AlertController) {
    this.rpeChart = new RPEChart();
  }


  save(form: NgForm) {
    let newWeight = this.rpeChart.getNewWeight(+this.data.completedWeight, this.data.completedReps, this.data.completedRPE, this.data.goalReps, this.data.goalRPE);
    let popup = this.openPopup(newWeight);
    popup.present();
  }

  openPopup(weight:number) {
    return this.popupCtrl.create({
      title: "New Weight",
      message: `Based on the entered information, you should change the weight to: ${weight.toFixed(2)}lbs`,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
  }

}
