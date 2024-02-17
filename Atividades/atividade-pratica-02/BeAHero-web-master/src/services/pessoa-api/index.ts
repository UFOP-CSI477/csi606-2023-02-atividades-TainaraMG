import { IPessoaRequestModel } from "@/models";
import api from "../api";

export async function postPessoa({ body }: { body: IPessoaRequestModel }) {
  return api
    .post("api/v1/pessoas", body)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export async function deletePessoa(id: number) {
  return api
    .delete(`api/v1/pessoas/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export async function updatePessoa(
  id: number,
  { body }: { body: IPessoaRequestModel }
) {
  return api
    .put(`api/v1/pessoas/${id}`, body)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}
