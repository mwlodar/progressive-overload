import { PipesModule } from './../pipes/pipes.module';
import { DatabaseService } from './../providers/database/database.service';
import { ExerciseLogFormComponent } from './exercise-log-form/exercise-log-form.component';
import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { CreateExerciseFormComponent } from './create-exercise-form/create-exercise-form.component';
import { SetLogFormComponent } from './set-log-form/set-log-form.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { ReviewExerciseComponent } from './review-exercise/review-exercise.component';
import { RpeCalculatorComponent } from './rpe-calculator/rpe-calculator.component';
import { TimerComponent } from './timer/timer.component';
@NgModule({
	declarations: [
		RegisterFormComponent,
		LoginFormComponent,
		CreateExerciseFormComponent,
		ExerciseLogFormComponent,
		SetLogFormComponent,
		ExerciseListComponent,
		WorkoutListComponent,
		ReviewExerciseComponent,
    RpeCalculatorComponent,
    TimerComponent
	],
	imports: [
		FormsModule,
		IonicModule,
		PipesModule
	],
	exports: [
		RegisterFormComponent,
		LoginFormComponent,
		CreateExerciseFormComponent,
		ExerciseLogFormComponent,
		SetLogFormComponent,
		ExerciseListComponent,
		WorkoutListComponent,
		ReviewExerciseComponent,
    RpeCalculatorComponent,
    TimerComponent
	],
	providers: [
		DatabaseService
	]
})
export class ComponentsModule { }
