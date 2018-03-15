import { Set, ExerciseLogEntry } from './../exercise-log/exercise-log-entry.interface';
import { Exercise } from './../create-exercise/create-exercise.interface';

export interface ScheduledExercise {
    exercise?: string;
    sets?: Set[];
    timestamp?: any;
    key?: string;
}

export interface Workout {
    exercises?: ScheduledExercise[];
    active_data: ExerciseLogEntry;
    date?: string;
    timeStamp?: any; //timestamp
    key?: string;
    completed?: boolean;
    completedAt?: any; //timestamp
}