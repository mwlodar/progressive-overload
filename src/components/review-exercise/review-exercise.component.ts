import { Set } from './../../models/exercise-log/exercise-log-entry.interface';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { ExerciseTracker } from './../../models/exercise-tracker/exercise-tracker.interface';
import { Select } from 'ionic-angular/components/select/select';
import { DatabaseService } from './../../providers/database/database.service';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Exercise } from './../../models/create-exercise/create-exercise.interface';
import { Observable } from 'rxjs/Observable';
import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

export interface Metric {
  name: "intensity" | "tonnage";
  function: "getIntensity" | "getTonnage";
}

@Component({
  selector: 'review-exercise',
  templateUrl: 'review-exercise.component.html'
})
export class ReviewExerciseComponent implements OnInit, OnDestroy {

  @ViewChild('exerciseSelector') exerciseSelector: Select;
  @ViewChild('lineCanvas') lineCanvas;

  exTrackerRef: AngularFireList<ExerciseTracker>
  exTracker$: Subscription;
  exTracker: ExerciseTracker[];

  exercises$: Observable<Exercise[]>;

  selection: {
    exercise?: string;
    metric?: Metric;
  };

  metrics: Metric[];

  lineChart: any;

  constructor(private database: DatabaseService) { 
    this.selection = {};
    this.metrics = [
      { name: "intensity", function: "getIntensity" },
      { name: "tonnage", function: "getTonnage" }
    ]
  }

  ngOnInit() {
    this.exercises$ = this.database.getExerciseListRef().valueChanges();
  }

  ngOnDestroy() {
    this.exTracker$ ? this.exTracker$.unsubscribe() : null; 
  }

  selectExercise(exercise: string) {
    this.exerciseSelector.close();
    this.selection.exercise = exercise;
    console.log(this.selection);
    this.selection.exercise && this.selection.metric ? this.setRef() : null;
  }

  selectMetric(metric: Metric) {
    this.selection.metric = metric;
    console.log(this.selection);
    this.selection.exercise && this.selection.metric ? this.setRef() : null;
  }

  setRef() {
    this.exTrackerRef = this.database.database.list<ExerciseTracker>(`exerciseTracker/${this.database.uid}/${this.selection.exercise}`);
    this.exTracker$ ? this.exTracker$.unsubscribe() : null;
    this.exTracker$ = this.exTrackerRef.valueChanges().subscribe(exerciseSessions=> {
      this.exTracker = exerciseSessions;
      let labelArr = [] as string[];
      let dataArr = [] as number[];

      exerciseSessions.forEach(session => {
        labelArr.push(session.completedDate);
        dataArr.push(this[this.selection.metric.function](session.sets));
      });
      this.createLineChart(labelArr, dataArr);
    })
  }

  getIntensity(sets: Set[]): any {
    console.log("Get Intensity");
    let weight = 0;
    let numberOfSets = 0;
    sets.forEach(set => {
      weight = weight + parseInt(set.results.weight);
      numberOfSets++;
    });
    return weight/numberOfSets;
  }

  getTonnage(sets: Set[]) {
    console.log("Get Tonnage");
    let repsTimesWeight = 0;
    let numberOfSets = sets.length;
    sets.forEach(set => {
      repsTimesWeight = repsTimesWeight + (set.weight * set.reps);
    });
    return repsTimesWeight * numberOfSets;
  }

  createLineChart(labelArr: string[], dataArr: number[]) {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labelArr,
        datasets: [
          {
            label: this.selection.metric.name.toUpperCase(),
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: dataArr,
            spanGaps: false,
          }
        ]
      }
    });
  }

}
