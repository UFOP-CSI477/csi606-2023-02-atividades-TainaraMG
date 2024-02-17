package com.beahero.api.services.estado.mapper;

import com.beahero.api.DTO.estado.response.EstadoResponse;
import com.beahero.api.entities.Estado;
import org.springframework.stereotype.Component;

@Component
public class EstadoMapper {

    public EstadoResponse toResponse(Estado estado) {
        EstadoResponse estadoResponse = new EstadoResponse();

        estadoResponse.setId(estado.getId());
        estadoResponse.setNome(estado.getNome());
        estadoResponse.setSigla(estado.getSigla());
        estadoResponse.setCreated_at(estado.getCreated_at());
        estadoResponse.setUpdated_at(estado.getUpdated_at());

        return estadoResponse;
    }
}
