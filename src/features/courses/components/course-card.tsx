import Link from 'next/link';

export interface CourseCardProps {
    courseCode: string;
    title: string;
    instructor: string;
    room: string;
    credits: number;
    /** Avance del semestre. Se normaliza a un valor entre 0 y 100. */
    progressPercentage: number;
    courseUrl: string;
    syllabusUrl?: string;
}

/**
 * Tarjeta de asignatura con barra de progreso.
 * Navega con <Link> (precarga y navegación del lado del cliente); no necesita 'use client'.
 */
export default function CourseCard({
    courseCode,
    title,
    instructor,
    room,
    credits,
    progressPercentage,
    courseUrl,
    syllabusUrl,
}: CourseCardProps) {
    // Se acota el valor para que una prop fuera de rango (ej. 140 o -5) no rompa la barra
    const progress = Math.min(100, Math.max(0, Math.round(progressPercentage)));

    return (
        <article className="card card-border w-full max-w-sm overflow-hidden bg-base-100 shadow-sm">
            <header className="bg-linear-to-r from-primary to-secondary p-4 text-primary-content">
                <p className="font-mono text-xs opacity-90">{courseCode}</p>
                <h3 className="card-title text-lg">{title}</h3>
            </header>

            <div className="card-body gap-3">
                <div className="flex items-center justify-between gap-2">
                    <p className="min-w-0 truncate text-sm font-medium">{instructor}</p>
                    <span className="badge badge-outline badge-sm shrink-0">{credits} créditos</span>
                </div>
                <p className="text-xs text-base-content/70">Salón: {room}</p>

                <div>
                    <div className="mb-1 flex justify-between text-xs">
                        <span>Progreso del semestre</span>
                        <span className="font-semibold">{progress}%</span>
                    </div>
                    <progress
                        className="progress progress-primary w-full"
                        value={progress}
                        max={100}
                        aria-label={`Progreso de ${title}: ${progress}%`}
                    />
                </div>

                <div className="card-actions justify-end">
                    {syllabusUrl && (
                        <Link href={syllabusUrl} className="btn btn-ghost btn-sm">
                            Sílabo
                        </Link>
                    )}
                    <Link href={courseUrl} className="btn btn-primary btn-sm">
                        Entrar al aula
                    </Link>
                </div>
            </div>
        </article>
    );
}
