import { Set } from './../exercise-log/exercise-log-entry.interface';

export interface ExerciseTracker {
    completedDate: string;
    sets: Set[];
    exercise: string;
}