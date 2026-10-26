'use client';

import { useEffect } from 'react';

import { cn } from '@/shared/lib/cn';

type ToastVariant = 'success' | 'info' | 'warning' | 'error';

export interface ToastNotificationProps {
    title: string;
    message: string;
    variant?: ToastVariant;
    /** Identificador opcional (ej. id de transacción o commit) que se muestra bajo el mensaje. */
    reference?: string;
    /** Si es true (por defecto) flota arriba a la derecha; si es false se muestra en el flujo normal. */
    floating?: boolean;
    /** Milisegundos para cerrarse solo (requiere onClose). Sin valor, solo se cierra con el botón. */
    autoCloseMs?: number;
    onClose?: () => void;
}

const variantClasses: Record<ToastVariant, string> = {
    success: 'alert-success',
    info: 'alert-info',
    warning: 'alert-warning',
    error: 'alert-error',
};

/**
 * Notificación flotante. Es Client Component porque tiene un temporizador (useEffect).
 * El estado "visible/oculto" lo controla el padre: renderiza el toast solo cuando quiera mostrarlo.
 */
export default function ToastNotification({
    title,
    message,
    variant = 'success',
    reference,
    floating = true,
    autoCloseMs,
    onClose,
}: ToastNotificationProps) {
    useEffect(() => {
        if (!autoCloseMs || !onClose) return;
        const timer = setTimeout(onClose, autoCloseMs);
        return () => clearTimeout(timer); // Limpia el temporizador si el toast se desmonta antes
    }, [autoCloseMs, onClose]);

    const alert = (
        <div role="status" aria-live="polite" className={cn('alert alert-soft w-80 max-w-full', variantClasses[variant])}>
            <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold">{title}</h3>
                <p className="text-xs">{message}</p>
                {reference && <p className="mt-1 font-mono text-[11px] opacity-70">{reference}</p>}
            </div>
            {onClose && (
                <button type="button" className="btn btn-ghost btn-xs btn-circle" aria-label="Cerrar notificación" onClick={onClose}>
                    ✕
                </button>
            )}
        </div>
    );

    return floating ? <div className="toast toast-top toast-end z-50">{alert}</div> : alert;
}
