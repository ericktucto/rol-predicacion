import { addDays, addMonths, format, parseISO } from "date-fns";
import { es } from 'date-fns/locale';
import { date2DiaPrediccion } from "./lib/date";

export function mesesDefault() {
    const anio = (new Date()).getFullYear()
    const mesActual = format(new Date(), 'M')
    const meses = []
    for (let i = 0; i < 4; i++) {
        const m = parseISO(`${anio}-${mesActual.toString().padStart(2, '0')}-01`)
        meses.push(
            date2DiaPrediccion(addMonths(m, i))
        )
    }
    return meses
}

export function diasDefault() {
    const dias = []
    for (let i = 0; i < 30; i++) {
        const item = format(
            addDays(new Date(), i),
            "MMMM, EEEE d",
            { locale: es }
        ).toUpperCase()
        dias.push(item)
    }
    return dias
}

export const horariosDefault = ['7:50 AM', '3:50 PM']

export const conductoresDefault = [
    'ERICK TUCTO',
]

export const puntosDefault = [
    'PLAZA DE ARMAS',
    'SALON DEL REINO',
]

export const territorioDefault = [
    'TERRITORIO 1',
    'TERRITORIO 2',
    'TERRITORIO 3',
]
