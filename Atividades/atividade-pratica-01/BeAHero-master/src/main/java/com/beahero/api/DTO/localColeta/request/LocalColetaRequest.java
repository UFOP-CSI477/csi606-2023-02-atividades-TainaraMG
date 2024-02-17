package com.beahero.api.DTO.localColeta.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Data
@Getter
@Setter
@ToString
public class LocalColetaRequest {
    private String nome;

    private String rua;

    private String numero;

    private String complemento;

    private Long cidade_id;
}
