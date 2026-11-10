import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EXERCISES } from '@/features/exercises/data';
import { ExerciseDetail } from '@/features/exercises/components/ExerciseDetail';
import { getExerciseById } from '@/features/exercises/services/exercises.service';

interface PageProps {
    params: Promise<{ id: string }>;
}

// Le dice a Next qué ids existen para generar esas páginas al hacer el build
export function generateStaticParams() {
    return EXERCISES.map((exercise) => ({ id: String(exercise.id) }));
}

// El título de la pestaña sale del ejercicio
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const exercise = await getExerciseById(Number(id));
    return { title: exercise ? exercise.name : 'Ejercicio no encontrado' };
}

export default async function ExerciseDetailPage({ params }: PageProps) {
    const { id } = await params;
    const exercise = await getExerciseById(Number(id));

    if (!exercise) notFound();

    return (
        <div className="flex flex-col gap-4">
            <Link href="/exercises" className="btn btn-ghost btn-sm w-fit">
                ← Volver a ejercicios
            </Link>
            <ExerciseDetail exercise={exercise} />
        </div>
    );
}