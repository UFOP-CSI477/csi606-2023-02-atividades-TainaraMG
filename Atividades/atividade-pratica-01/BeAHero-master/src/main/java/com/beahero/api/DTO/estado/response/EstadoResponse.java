package com.beahero.api.DTO.estado.response;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;

@Data
@Getter
@Setter
@ToString
public class EstadoResponse {
    private Long id;

    private String nome;

    private String sigla;

    private Instant created_at;

    private Instant updated_at;
}
