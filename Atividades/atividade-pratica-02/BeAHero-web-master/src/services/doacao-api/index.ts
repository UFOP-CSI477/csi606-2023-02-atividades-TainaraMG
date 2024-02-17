import { IDoacaoRequestModel } from "@/models";
import api from "../api";

export async function postDoacao({
  local_id,
  pessoa_id,
  data,
}: IDoacaoRequestModel) {
  const body = {
    pessoa_id,
    local_id,
    data,
  };
  return api
    .post("api/v1/doacoes", body)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export async function deleteDoacao(id: number) {
  return api
    .delete(`api/v1/doacoes/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export async function updateDoacao(
  id: number,
  { body }: { body: IDoacaoRequestModel }
) {
  return api
    .put(`api/v1/doacoes/${id}`, body)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}
