import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ExerciseFilters } from '@/features/exercises/components/ExerciseFilters';
import { ExerciseGrid } from '@/features/exercises/components/ExerciseGrid';
import { ExerciseGridSkeleton } from '@/features/exercises/components/ExerciseGridSkeleton';

type SearchParams = {
    [key: string]: string | string[] | undefined;
};

interface PageProps {
    searchParams: Promise<SearchParams>;
}

export const metadata: Metadata = { title: 'Ejercicios' };

export default async function ExercisesPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const qValue = params.q;
    const categoryValue = params.category;
    const q = Array.isArray(qValue) ? qValue[0] : qValue;
    const category = Array.isArray(categoryValue)
        ? categoryValue[0]
        : categoryValue;

    return (
        <div className="flex flex-col gap-6">
            <header>
                <h1 className="text-2xl font-bold">Ejercicios</h1>
                <p className="text-sm opacity-70">
                    Elige un ejercicio para ver cómo se hace.
                </p>
            </header>

            <ExerciseFilters />

            <Suspense
                key={`${q ?? ''}|${category ?? ''}`}
                fallback={<ExerciseGridSkeleton />}
            >
                <ExerciseGrid q={q} category={category} />
            </Suspense>
        </div>
    );
}
