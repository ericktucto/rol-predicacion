import { Model, Types } from "localstorm";

export type TurnoSchema = {
    horario: string
    territorio: string
    punto: string
    conductores: string[]
}

export class Turno extends Model {
    static schema = {
        horario: Types.string,
        territorio: Types.string,
        punto: Types.string,
        conductores: Types.arrayOf(Types.string),
    }
}
