package com.beahero.api.services.tipoSanguineo.mapper;

import com.beahero.api.DTO.tipoSanguineo.response.TipoSanguineoResponse;
import com.beahero.api.entities.TipoSanguineo;
import org.springframework.stereotype.Component;

@Component
public class TipoSanguineoMapper {
    public TipoSanguineoResponse toResponse(TipoSanguineo tipoSanguineo) {
        TipoSanguineoResponse tipoSanguineoResponse = new TipoSanguineoResponse();

        tipoSanguineoResponse.setId(tipoSanguineo.getId());
        tipoSanguineoResponse.setTipo(tipoSanguineo.getTipo());
        tipoSanguineoResponse.setFator(tipoSanguineo.getFator());
        tipoSanguineoResponse.setCreated_at(tipoSanguineo.getCreated_at());
        tipoSanguineoResponse.setUpdated_at(tipoSanguineo.getUpdated_at());

        return tipoSanguineoResponse;
    }
}
