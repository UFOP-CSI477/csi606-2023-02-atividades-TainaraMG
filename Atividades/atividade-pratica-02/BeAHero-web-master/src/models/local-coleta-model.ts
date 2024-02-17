import { ICidadeModel } from ".";

export interface ILocalColetaModel {
    id: number;
    nome: string;
    rua: string;
    complemento: string;
    numero: string;
    cidade: ICidadeModel;
}

export interface ILocalColetaRequestModel {
    nome: string;
    rua: string;
    complemento: string;
    numero: string;
    cidade_id: number;
}