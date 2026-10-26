/**
 * Une nombres de clases ignorando los valores vacíos (false, null, undefined, '').
 * Evita repetir plantillas de texto con ternarios dentro de los componentes.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
    return classes.filter(Boolean).join(' ');
}