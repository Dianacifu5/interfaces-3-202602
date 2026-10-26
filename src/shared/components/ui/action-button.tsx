import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

type ActionButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ActionButtonSize = 'sm' | 'md' | 'lg';

export interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    icon?: ReactNode;
    badgeText?: string;
    isLoading?: boolean;
    variant?: ActionButtonVariant;
    size?: ActionButtonSize;
}

// Cada valor de las props se traduce a clases semánticas de daisyUI (nada de colores a mano)
const variantClasses: Record<ActionButtonVariant, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline btn-primary',
    ghost: 'btn-ghost',
};

const sizeClasses: Record<ActionButtonSize, string> = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
};

/**
 * Botón de acción con icono, badge informativo y estado de carga.
 * Es un Server Component: solo será cliente si quien lo usa le pasa un `onClick`.
 */
export default function ActionButton({
    label,
    icon,
    badgeText,
    isLoading = false,
    variant = 'primary',
    size = 'md',
    type = 'button',
    disabled,
    className,
    ...rest
}: ActionButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            aria-busy={isLoading}
            className={cn('btn gap-2', variantClasses[variant], sizeClasses[size], className)}
            {...rest}
        >
            {isLoading ? <span className="loading loading-spinner loading-xs" aria-hidden="true" /> : icon}
            {label}
            {badgeText && <span className="badge badge-secondary badge-sm">{badgeText}</span>}
        </button>
    );
}
