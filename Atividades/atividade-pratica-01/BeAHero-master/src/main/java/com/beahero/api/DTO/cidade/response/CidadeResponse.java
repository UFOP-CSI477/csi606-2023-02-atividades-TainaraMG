package com.beahero.api.DTO.cidade.response;

import com.beahero.api.DTO.estado.response.EstadoResponse;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;

@Data
@Getter
@Setter
@ToString
public class CidadeResponse {
    private Long id;

    private String nome;

    private EstadoResponse estado;

    private Instant created_at;

    private Instant updated_at;
}
