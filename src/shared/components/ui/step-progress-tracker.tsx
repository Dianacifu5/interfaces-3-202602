import { cn } from '@/shared/lib/cn';

export interface StepItem {
    label: string;
    isCompleted: boolean;
    isCurrent?: boolean;
    stepNumber?: number | string;
}

export interface StepProgressTrackerProps {
    steps: StepItem[];
    ariaLabel?: string;
}

/**
 * Línea de tiempo por pasos. daisyUI dibuja los conectores solos (`steps`);
 * en móvil se apila en vertical y desde `md` pasa a horizontal. Server Component.
 */
export default function StepProgressTracker({ steps, ariaLabel = 'Progreso de entregas' }: StepProgressTrackerProps) {
    return (
        <ul className="steps steps-vertical md:steps-horizontal w-full" aria-label={ariaLabel}>
            {steps.map((step, index) => (
                <li
                    key={`${step.label}-${index}`}
                    className={cn('step', (step.isCompleted || step.isCurrent) && 'step-primary')}
                    data-content={step.isCompleted ? '✓' : (step.stepNumber ?? index + 1)}
                    aria-current={step.isCurrent ? 'step' : undefined}
                >
                    {step.label}
                    {/* Texto solo para lectores de pantalla: el color no es la única señal del estado */}
                    <span className="sr-only">
                        {step.isCompleted ? ' (completado)' : step.isCurrent ? ' (paso actual)' : ' (pendiente)'}
                    </span>
                </li>
            ))}
        </ul>
    );
}
