/**
 * Devuelve las iniciales (máximo 2) de un nombre. Se usa como alternativa
 * visual cuando la imagen de un avatar no existe o no carga.
 */
export function getInitials(name: string): string {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join('');
}
