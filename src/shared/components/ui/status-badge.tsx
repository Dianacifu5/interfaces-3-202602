import { cn } from '@/shared/lib/cn';

type BadgeStatus = 'active' | 'pending' | 'danger' | 'neutral';

export interface StatusBadgeProps {
    status: BadgeStatus;
    label: string;
    hasPulse?: boolean;
    className?: string;
}

// Mapa estado -> clases semánticas (tema "icesi": success=verde, secondary=morado, error=naranja)
const statusStyles: Record<BadgeStatus, { badge: string; dot: string }> = {
    active: { badge: 'badge-success', dot: 'bg-success' },
    pending: { badge: 'badge-secondary', dot: 'bg-secondary' },
    danger: { badge: 'badge-error', dot: 'bg-error' },
    neutral: { badge: 'badge-neutral', dot: 'bg-neutral' },
};

/** Píldora de estado con punto luminoso. Server Component puro (no necesita 'use client'). */
export default function StatusBadge({ status, label, hasPulse = status === 'active', className }: StatusBadgeProps) {
    const styles = statusStyles[status];

    return (
        <span className={cn('badge badge-soft inline-flex items-center gap-2 font-semibold', styles.badge, className)}>
            <span aria-hidden="true" className={cn('h-2 w-2 rounded-full', styles.dot, hasPulse && 'animate-pulse')} />
            {label}
        </span>
    );
}