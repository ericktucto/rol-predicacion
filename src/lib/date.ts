import { format } from "date-fns";
import { es } from 'date-fns/locale';

export function date2DiaPrediccion(fecha: Date): string {
    return format(fecha, "MMMM yyyy", { locale: es }).toUpperCase()
}
