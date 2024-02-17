package com.beahero.api.DTO.pessoa.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;

@Data
@Getter
@Setter
@ToString
public class PessoaRequest {
    private String nome;

    private String rua;

    private String numero;

    private String complemento;

    private String rg;

    private Long cidade_id;

    private Long tipo_id;
}
