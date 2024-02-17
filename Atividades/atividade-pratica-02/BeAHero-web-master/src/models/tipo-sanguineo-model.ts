import { TipoSanguineoEnum } from "@/enum";

export interface ITipoSanguineoModel {
    id: number;
    tipo: string;
    fator: TipoSanguineoEnum;
    created_at: string;
    updated_at: string;
}