import { IEstadoModel } from ".";

export interface ICidadeModel {
    id: number;
    nome: string;
    estado: IEstadoModel;
}