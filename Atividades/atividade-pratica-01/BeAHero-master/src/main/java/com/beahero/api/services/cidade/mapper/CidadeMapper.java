package com.beahero.api.services.cidade.mapper;


import com.beahero.api.DTO.cidade.response.CidadeResponse;
import com.beahero.api.entities.Cidade;
import com.beahero.api.services.estado.mapper.EstadoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CidadeMapper {

    @Autowired
    private EstadoMapper estadoMapper;
    public CidadeResponse toResponse(Cidade cidade) {
        CidadeResponse cidadeResponse = new CidadeResponse();

        cidadeResponse.setId(cidade.getId());
        cidadeResponse.setNome(cidade.getNome());
        cidadeResponse.setEstado(estadoMapper.toResponse(cidade.getEstado()));
        cidadeResponse.setCreated_at(cidade.getCreated_at());
        cidadeResponse.setUpdated_at(cidade.getUpdated_at());

        return cidadeResponse;
    }
}
