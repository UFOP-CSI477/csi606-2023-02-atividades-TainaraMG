import { ILocalColetaRequestModel } from "@/models";
import api from "../api";

export async function postlocalColeta({
  body,
}: {
  body: ILocalColetaRequestModel;
}) {
  return api
    .post("api/v1/locais-coleta", body)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export async function deleteLocalColeta(id: number) {
  return api
    .delete(`api/v1/locais-coleta/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export async function updateLocalColeta(
  id: number,
  { body }: { body: ILocalColetaRequestModel }
) {
  return api
    .put(`api/v1/locais-coleta/${id}`, body)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}
