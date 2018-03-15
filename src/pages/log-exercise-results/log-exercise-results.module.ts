import { PipesModule } from './../../pipes/pipes.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogExerciseResultsPage } from './log-exercise-results';

@NgModule({
  declarations: [
    LogExerciseResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(LogExerciseResultsPage),
    ComponentsModule,
    PipesModule
  ],
})
export class LogExerciseResultsPageModule {}
