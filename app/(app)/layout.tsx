'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '@/features/auth/services/auth.service';
import { AuthGuard } from '@/features/auth/components/AuthGuard';
import { NotificationBell } from '@/features/notifications/components/NotificationBell';
import { useSessionStore } from '@/shared/store/session.store';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        useSessionStore.persist.rehydrate();
    }, []);

    const handleLogout = () => {
        authService.logout();
        router.replace('/login');
    };

    return (
        <AuthGuard>
            <div className="min-h-screen bg-base-200">
                <header className="navbar justify-between border-b border-base-300 bg-base-100 px-6 shadow-sm">
                    <nav className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className={`btn btn-ghost btn-sm ${pathname === '/dashboard' ? 'btn-active font-bold' : ''}`}
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/exercises"
                            className={`btn btn-ghost btn-sm ${pathname.startsWith('/exercises') ? 'btn-active font-bold' : ''}`}
                        >
                            Ejercicios
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        <NotificationBell />

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="btn btn-outline btn-error btn-sm"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </header>

                <main className="mx-auto max-w-4xl p-6">{children}</main>
            </div>
        </AuthGuard>
    );
}
