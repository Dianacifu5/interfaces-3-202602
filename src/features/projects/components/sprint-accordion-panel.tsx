import { cn } from '@/shared/lib/cn';

type SprintStatus = 'completed' | 'in_progress' | 'pending';

export interface SprintTask {
    description: string;
    isDone: boolean;
}

export interface SprintPhase {
    sprintNumber: number;
    title: string;
    status: SprintStatus;
    tasks: SprintTask[];
    isDefaultOpen?: boolean;
}

export interface SprintAccordionPanelProps {
    sprints: SprintPhase[];
    /** Nombre del grupo de radios: debe ser distinto si hay dos acordeones en la misma página. */
    groupName?: string;
}

const statusBadge: Record<SprintStatus, { label: string; classes: string }> = {
    completed: { label: 'Completado', classes: 'badge-success' },
    in_progress: { label: 'En progreso', classes: 'badge-warning' },
    pending: { label: 'Pendiente', classes: 'badge-ghost' },
};

/**
 * Acordeón de sprints 100% CSS: cada ítem es un `collapse` de daisyUI controlado por un
 * <input type="radio">. No hay estado ni eventos de React, por eso es un Server Component.
 */
export default function SprintAccordionPanel({ sprints, groupName = 'sprint-accordion' }: SprintAccordionPanelProps) {
    return (
        <div className="join join-vertical w-full">
            {sprints.map((sprint) => {
                const badge = statusBadge[sprint.status];
                return (
                    <div key={sprint.sprintNumber} className="collapse collapse-arrow join-item border border-base-300 bg-base-100">
                        <input
                            type="radio"
                            name={groupName}
                            defaultChecked={sprint.isDefaultOpen}
                            aria-label={`Sprint ${sprint.sprintNumber}: ${sprint.title}`}
                        />
                        <div className="collapse-title flex items-center justify-between gap-2 pr-10 font-semibold">
                            <span className="min-w-0 truncate">
                                Sprint {sprint.sprintNumber}: {sprint.title}
                            </span>
                            <span className={cn('badge badge-sm shrink-0', badge.classes)}>{badge.label}</span>
                        </div>
                        <ul className="collapse-content flex flex-col gap-2 text-sm">
                            {sprint.tasks.map((task) => (
                                <li key={task.description} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary checkbox-sm"
                                        checked={task.isDone}
                                        readOnly
                                        tabIndex={-1}
                                        aria-label={task.description}
                                    />
                                    <span className={cn(task.isDone && 'text-base-content/50 line-through')}>{task.description}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}
