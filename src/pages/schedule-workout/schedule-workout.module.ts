import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleWorkoutPage } from './schedule-workout';
import { DatabaseService } from '../../providers/database/database.service';

@NgModule({
  declarations: [
    ScheduleWorkoutPage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduleWorkoutPage),
    ComponentsModule
  ],
  providers: [
    DatabaseService
  ]
})
export class ScheduleWorkoutPageModule {}
