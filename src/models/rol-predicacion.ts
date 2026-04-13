import { Model, Types } from "localstorm";
import { DiaPredicacion, type DiaPredicacionSchema } from "./dia-predicacion";

export type RolPredicacionSchema = {
    titulo: string;
    dias: DiaPredicacionSchema[];
}

export class RolPredicacion extends Model {
    static schema = {
        titulo: Types.string.isRequired,
        dias: Types.arrayOf(Types.reference(DiaPredicacion)),
    }
}
