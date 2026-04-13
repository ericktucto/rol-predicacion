import { Model, Types } from "localstorm";
import { Turno, type TurnoSchema } from "./turno";

export type DiaPredicacionSchema = {
    fecha: Date
    turnos: TurnoSchema[]
}

export class DiaPredicacion extends Model {
    static schema = {
        fecha: Types.date,
        turnos: Types.arrayOf(Types.reference(Turno))
    }
}
