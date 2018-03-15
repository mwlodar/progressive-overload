import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewExercisePage } from './review-exercise';

@NgModule({
  declarations: [
    ReviewExercisePage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewExercisePage),
    ComponentsModule
  ],
})
export class ReviewExercisePageModule {}
