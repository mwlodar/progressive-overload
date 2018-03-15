import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateExercisePage } from './create-exercise';

@NgModule({
  declarations: [
    CreateExercisePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateExercisePage),
    ComponentsModule
  ],
})
export class CreateExercisePageModule {}
