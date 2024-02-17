package com.beahero.api.DTO.doacao.response;

import com.beahero.api.DTO.localColeta.response.LocalColetaResponse;
import com.beahero.api.DTO.pessoa.response.PessoaResponse;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;
import java.time.LocalDate;

@Data
@Getter
@Setter
@ToString
public class DoacaoResponse {
    private Long id;

    private PessoaResponse pessoa;

    private LocalColetaResponse local;

    private LocalDate data;

    private Instant created_at;

    private Instant updated_at;
}
