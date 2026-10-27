import CourseCard from '@/features/courses/components/course-card';
import SprintAccordionPanel from '@/features/projects/components/sprint-accordion-panel';
import AcademicAppNavbar from '@/shared/components/ui/academic-app-navbar';
import ActionButton from '@/shared/components/ui/action-button';
import AlertBanner from '@/shared/components/ui/alert-banner';
import MetricBentoStat from '@/shared/components/ui/metric-bento-stat';
import StatusBadge from '@/shared/components/ui/status-badge';
import StepProgressTracker from '@/shared/components/ui/step-progress-tracker';

import InteractiveDemo from './_components/interactive-demo';

const chartIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
        <path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z" />
    </svg>
);

// Página de muestra: sirve para ver todos los componentes juntos y probar cómo cambian con sus props.
export default function UiShowcasePage() {
    return (
        <>
            <AcademicAppNavbar
                brandName="Portal Académico Icesi"
                user={{ name: 'Diana Cifuentes', avatarUrl: 'https://picsum.photos/150', notificationsCount: 3, currentTerm: '2026-02' }}
            />

            <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-4 sm:p-8">
                <h1 className="text-2xl font-bold">Biblioteca de componentes reutilizables</h1>

                <section className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold">Nivel 1 — Átomos</h2>
                    <div className="flex flex-wrap items-center gap-3">
                        <ActionButton label="Primario" variant="primary" />
                        <ActionButton label="Secundario" variant="secondary" badgeText="Nuevo" />
                        <ActionButton label="Contorno" variant="outline" size="sm" />
                        <ActionButton label="Fantasma" variant="ghost" size="lg" />
                        <ActionButton label="Cargando" isLoading />
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <StatusBadge status="active" label="Matriculado activo" />
                        <StatusBadge status="pending" label="En revisión" />
                        <StatusBadge status="danger" label="Pago pendiente" />
                        <StatusBadge status="neutral" label="Sin estado" />
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                        <AlertBanner title="Período de adición y cancelación" description="El sistema cerrará inscripciones el viernes a las 18:00." actionLabel="Ver calendario" actionHref="/dashboard" />
                        <AlertBanner type="success" title="Datos guardados" description="Tus cambios se guardaron correctamente." />
                        <AlertBanner type="warning" title="Casi sin cupos" description="Quedan pocos cupos disponibles para esta tutoría." />
                        <AlertBanner type="error" title="No se pudo iniciar sesión" description="Revisa tu correo y contraseña." />
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                        <MetricBentoStat title="Promedio acumulado" value="4.3" maxValue="5.0" trendText="↗ 0.2 frente al semestre anterior" trendType="positive" icon={chartIcon} />
                        <MetricBentoStat title="Créditos inscritos" value={18} trendText="Sin cambios" icon={chartIcon} />
                    </div>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold">Nivel 2 — Moléculas</h2>
                    <div className="flex flex-wrap gap-4">
                        <CourseCard courseCode="ICS-301" title="Desarrollo de Entornos Digitales Web" instructor="Kevin Rodríguez" room="C-201" credits={3} progressPercentage={65} courseUrl="/dashboard" syllabusUrl="/dashboard" />
                        <CourseCard courseCode="DMI-210" title="Diseño de Interacción" instructor="Docente por asignar" room="B-105" credits={4} progressPercentage={140} courseUrl="/dashboard" />
                    </div>
                    <StepProgressTracker
                        steps={[
                            { label: 'Propuesta', isCompleted: true },
                            { label: 'Prototipo', isCompleted: true },
                            { label: 'Desarrollo', isCompleted: false, isCurrent: true },
                            { label: 'Entrega final', isCompleted: false },
                        ]}
                    />
                    <InteractiveDemo />
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold">Nivel 3 — Organismos</h2>
                    <SprintAccordionPanel
                        sprints={[
                            { sprintNumber: 1, title: 'Diseño y prototipo', status: 'completed', tasks: [{ description: 'Definir historias de usuario', isDone: true }, { description: 'Prototipo en Figma', isDone: true }] },
                            { sprintNumber: 2, title: 'Backend con NestJS', status: 'in_progress', isDefaultOpen: true, tasks: [{ description: 'Entidades y relaciones', isDone: true }, { description: 'CRUD con permisos', isDone: false }] },
                            { sprintNumber: 3, title: 'Frontend con Next.js', status: 'pending', tasks: [{ description: 'Componentes reutilizables', isDone: false }] },
                        ]}
                    />
                </section>
            </main>
        </>
    );
}
