package com.beahero.api.DTO.localColeta.response;

import com.beahero.api.DTO.cidade.response.CidadeResponse;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;

@Data
@Getter
@Setter
@ToString
public class LocalColetaResponse {
    private Long id;

    private String nome;

    private String rua;

    private String numero;

    private String complemento;

    private CidadeResponse cidade;

    private Instant created_at;

    private Instant updated_at;
}
