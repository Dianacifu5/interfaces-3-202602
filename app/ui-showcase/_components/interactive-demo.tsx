'use client';

import { useState } from 'react';

import ActionButton from '@/shared/components/ui/action-button';
import SubmissionConfirmModal from '@/shared/components/ui/submission-confirm-modal';
import ToastNotification from '@/shared/components/ui/toast-notification';

/** Demo de los componentes que necesitan estado (loading, toast y modal). */
export default function InteractiveDemo() {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const simulateDownload = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1800);
    };

    const confirmSubmission = () => {
        setIsModalOpen(false);
        setShowToast(true);
    };

    return (
        <div className="flex flex-wrap items-center gap-3">
            <ActionButton label="Descargar guía" badgeText="PDF" isLoading={isLoading} onClick={simulateDownload} />
            <ActionButton label="Enviar tarea" variant="outline" onClick={() => setIsModalOpen(true)} />

            <SubmissionConfirmModal
                isOpen={isModalOpen}
                assignmentName="Tarea individual: componentes reutilizables"
                onConfirm={confirmSubmission}
                onCancel={() => setIsModalOpen(false)}
            />

            {showToast && (
                <ToastNotification
                    title="Entrega registrada"
                    message="Tu tarea fue enviada correctamente."
                    reference="commit 3f9a2c1"
                    autoCloseMs={4000}
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
}
