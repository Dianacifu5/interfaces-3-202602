import Image from 'next/image';
import Link from 'next/link';

import { getInitials } from '@/shared/lib/initials';

export interface UserSessionData {
    name: string;
    avatarUrl?: string;
    notificationsCount: number;
    currentTerm: string;
}

export interface NavbarMenuItem {
    label: string;
    href: string;
}

export interface AcademicAppNavbarProps {
    brandName: string;
    user: UserSessionData;
    homeHref?: string;
    menuItems?: NavbarMenuItem[];
}

const defaultMenuItems: NavbarMenuItem[] = [
    { label: 'Mi perfil', href: '/dashboard' },
    { label: 'Cerrar sesión', href: '/login' },
];

/**
 * Barra de navegación con notificaciones y menú de usuario.
 * El menú desplegable usa <details> de daisyUI (CSS puro), por eso sigue siendo Server Component.
 */
export default function AcademicAppNavbar({
    brandName,
    user,
    homeHref = '/',
    menuItems = defaultMenuItems,
}: AcademicAppNavbarProps) {
    return (
        <header className="navbar min-h-16 border-b border-base-300 bg-base-100 px-4">
            <div className="navbar-start gap-3">
                <Link href={homeHref} className="flex items-center gap-2" aria-label={`${brandName}: ir al inicio`}>
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-content">
                        {getInitials(brandName)}
                    </span>
                    <span className="hidden text-base font-bold sm:inline">{brandName}</span>
                </Link>
                <span className="badge badge-outline badge-sm hidden md:inline-flex">{user.currentTerm}</span>
            </div>

            <div className="navbar-end gap-1">
                <button type="button" className="btn btn-ghost btn-circle" aria-label={`Notificaciones: ${user.notificationsCount} sin leer`}>
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                        </svg>
                        {user.notificationsCount > 0 && (
                            <span className="badge badge-secondary badge-xs indicator-item">{user.notificationsCount}</span>
                        )}
                    </div>
                </button>

                <details className="dropdown dropdown-end">
                    <summary className="btn btn-ghost btn-circle avatar avatar-online list-none" aria-label="Menú de usuario">
                        <div className="w-9 rounded-full">
                            {user.avatarUrl ? (
                                <Image src={user.avatarUrl} alt={`Foto de perfil de ${user.name}`} width={36} height={36} unoptimized className="object-cover" />
                            ) : (
                                <span className="flex h-full w-full items-center justify-center bg-primary text-xs font-bold text-primary-content">
                                    {getInitials(user.name)}
                                </span>
                            )}
                        </div>
                    </summary>
                    <ul className="menu dropdown-content z-10 mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
                        <li className="menu-title">{user.name}</li>
                        {menuItems.map((item) => (
                            <li key={item.href + item.label}>
                                <Link href={item.href}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </details>
            </div>
        </header>
    );
}
