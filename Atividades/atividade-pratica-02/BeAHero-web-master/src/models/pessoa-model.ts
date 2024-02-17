import { ICidadeModel, ITipoSanguineoModel } from ".";

export interface iPessoaModel {
    id: number;
    nome: string;
    rua: string;
    numero: string;
    complemento: string;
    rg: string;
    tipoSanguineo: ITipoSanguineoModel;
    cidade: ICidadeModel;
}

export interface IPessoaRequestModel {
    nome: string;
    rua: string;
    numero: string;
    complemento: string;
    rg: string;
    tipo_id: number;
    cidade_id: number;
}