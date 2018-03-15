
export interface Set {
    set?: number;
    reps?: number;
    weight?: any;
    metric?: 'lb' | 'kg';
    note?: 'string';
    intensity?: 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10;     
    timestamp?: any;
    key?:string;
    results?: Set;
}

export interface ExerciseLogEntry {
    exercise: string;
    sets: Set[];
    date: any;
    startTime?: any;
    endTime?: any; 
    key?: string;
    completed?: boolean;
}