'use client';

import { useEffect, useId, useRef } from 'react';

export interface SubmissionConfirmModalProps {
    isOpen: boolean;
    assignmentName: string;
    warningMessage?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * Diálogo de confirmación basado en la etiqueta nativa <dialog> + clase `modal` de daisyUI.
 * Es Client Component porque usa una ref y un efecto para abrir/cerrar el <dialog>.
 * `isOpen` lo controla el padre; Escape y el clic en el fondo llaman a `onCancel`.
 */
export default function SubmissionConfirmModal({
    isOpen,
    assignmentName,
    warningMessage = 'Esta acción es irreversible: una vez enviada no podrás modificarla.',
    confirmLabel = 'Enviar definitivamente',
    cancelLabel = 'Cancelar',
    onConfirm,
    onCancel,
}: SubmissionConfirmModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();

    // Sincroniza la prop `isOpen` con el estado real del <dialog>
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (isOpen && !dialog.open) dialog.showModal();
        if (!isOpen && dialog.open) dialog.close();
    }, [isOpen]);

    return (
        <dialog
            ref={dialogRef}
            className="modal"
            aria-labelledby={titleId}
            // Escape dispara el evento "cancel": se cede el control al padre en lugar de cerrar a mano
            onCancel={(event) => {
                event.preventDefault();
                onCancel();
            }}
        >
            <div className="modal-box">
                <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 shrink-0 text-error" aria-hidden="true">
                        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                    </svg>
                    <div>
                        <h3 id={titleId} className="text-lg font-bold">
                            ¿Enviar «{assignmentName}»?
                        </h3>
                        <p className="py-2 text-sm text-base-content/70">{warningMessage}</p>
                    </div>
                </div>
                <div className="modal-action">
                    <button type="button" className="btn btn-sm btn-ghost" onClick={onCancel}>
                        {cancelLabel}
                    </button>
                    <button type="button" className="btn btn-sm btn-primary" onClick={onConfirm}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
            {/* Clic en el fondo oscuro = cancelar */}
            <form method="dialog" className="modal-backdrop">
                <button type="button" onClick={onCancel} aria-label="Cerrar diálogo">
                    cerrar
                </button>
            </form>
        </dialog>
    );
}
