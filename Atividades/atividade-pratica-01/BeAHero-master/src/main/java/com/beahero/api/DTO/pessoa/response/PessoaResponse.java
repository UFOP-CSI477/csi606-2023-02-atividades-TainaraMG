package com.beahero.api.DTO.pessoa.response;

import com.beahero.api.DTO.cidade.response.CidadeResponse;
import com.beahero.api.DTO.tipoSanguineo.response.TipoSanguineoResponse;
import com.beahero.api.enums.FatorSanguineoEnum;
import com.beahero.api.enums.TipoSanguineoEnum;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;

@Data
@Getter
@Setter
@ToString
public class PessoaResponse {
    private Long id;

    private String nome;

    private String rua;

    private String numero;

    private String complemento;

    private String rg;

    private CidadeResponse cidade;

    private TipoSanguineoResponse tipoSanguineo;

    private Instant created_at;

    private Instant updated_at;
}
