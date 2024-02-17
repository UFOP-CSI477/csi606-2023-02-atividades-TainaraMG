package com.beahero.api.DTO.tipoSanguineo.response;

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
public class TipoSanguineoResponse {
    private Long id;

    private TipoSanguineoEnum tipo;

    private FatorSanguineoEnum fator;

    private Instant created_at;

    private Instant updated_at;
}
