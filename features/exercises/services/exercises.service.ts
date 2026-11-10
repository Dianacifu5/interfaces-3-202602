import { EXERCISES } from '../data';
import type { Exercise } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ExerciseFilters {
    q?: string;
    category?: string;
    duration?: number;
}

export async function getExercises(
    filters: ExerciseFilters = {},
): Promise<Exercise[]> {
    await delay(800);

    const q = filters.q?.trim().toLowerCase();

    return EXERCISES.filter((exercise) => {
        const matchesText =
            !q ||
            exercise.name.toLowerCase().includes(q) ||
            exercise.muscle.toLowerCase().includes(q);
        const matchesCategory =
            !filters.category || exercise.category === filters.category;
        const matchesDuration =
            !filters.duration || exercise.durationMin <= filters.duration;

        return matchesText && matchesCategory && matchesDuration;
    });
}

export async function getExerciseById(id: number): Promise<Exercise | null> {
    await delay(300);
    return EXERCISES.find((exercise) => exercise.id === id) ?? null;
}