import Link from 'next/link';

import { cn } from '@/shared/lib/cn';

type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface AlertBannerProps {
    title: string;
    description: string;
    type?: AlertType;
    actionLabel?: string;
    /** Si la acción navega a otra ruta, se renderiza un <Link> en lugar de un botón. */
    actionHref?: string;
    onActionClick?: () => void;
    className?: string;
}

const typeClasses: Record<AlertType, string> = {
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
    error: 'alert-error',
};

// Un icono sencillo por tipo (SVG en línea, sin librerías externas)
const iconPaths: Record<AlertType, string> = {
    info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
    success: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    warning: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
    error: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
};

/**
 * Banner de alerta institucional. `role="alert"` lo anuncia a los lectores de pantalla.
 * Es un Server Component: solo es cliente si el padre le pasa `onActionClick`.
 */
export default function AlertBanner({
    title,
    description,
    type = 'info',
    actionLabel,
    actionHref,
    onActionClick,
    className,
}: AlertBannerProps) {
    return (
        <div role="alert" className={cn('alert alert-soft', typeClasses[type], className)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0" aria-hidden="true">
                <path d={iconPaths[type]} />
            </svg>
            <div className="min-w-0">
                <h3 className="text-sm font-bold">{title}</h3>
                <p className="text-xs">{description}</p>
            </div>
            {actionLabel &&
                (actionHref ? (
                    <Link href={actionHref} className="btn btn-xs btn-outline">
                        {actionLabel}
                    </Link>
                ) : (
                    <button type="button" onClick={onActionClick} className="btn btn-xs btn-outline">
                        {actionLabel}
                    </button>
                ))}
        </div>
    );
}
