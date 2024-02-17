import { ILocalColetaModel, iPessoaModel } from ".";

export interface IDoacaoModel {
  id: number;
  pessoa: iPessoaModel;
  local: ILocalColetaModel;
  data: Date;
  created_at: string;
  updated_at: string;
}

export interface IDoacaoRequestModel {
  pessoa_id: number;
  local_id: number;
  data: Date;
}