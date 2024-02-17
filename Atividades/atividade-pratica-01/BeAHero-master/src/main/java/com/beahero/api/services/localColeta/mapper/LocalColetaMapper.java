package com.beahero.api.services.localColeta.mapper;
import com.beahero.api.DTO.cidade.response.CidadeResponse;
import com.beahero.api.DTO.localColeta.request.LocalColetaRequest;
import com.beahero.api.DTO.localColeta.response.LocalColetaResponse;
import com.beahero.api.entities.Cidade;
import com.beahero.api.entities.LocalColeta;
import com.beahero.api.services.cidade.mapper.CidadeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LocalColetaMapper {
    @Autowired
    private CidadeMapper cidadeMapper;
    public LocalColetaResponse toResponse(LocalColeta localColeta) {
        LocalColetaResponse localColetaResponse = new LocalColetaResponse();

        localColetaResponse.setId(localColeta.getId());
        localColetaResponse.setNome(localColeta.getNome());
        localColetaResponse.setRua(localColeta.getRua());
        localColetaResponse.setComplemento(localColeta.getComplemento());
        localColetaResponse.setNumero(localColeta.getNumero());
        localColetaResponse.setCidade(cidadeMapper.toResponse(localColeta.getCidade()));
        localColetaResponse.setCreated_at(localColeta.getCreated_at());
        localColetaResponse.setUpdated_at(localColeta.getUpdated_at());

        return localColetaResponse;
    }

    public LocalColeta toEntity(LocalColetaRequest localColetaRequest) {
        LocalColeta localColeta = new LocalColeta();

        localColeta.setNome(localColetaRequest.getNome());
        localColeta.setRua(localColetaRequest.getRua());
        localColeta.setComplemento(localColetaRequest.getComplemento());
        localColeta.setNumero(localColetaRequest.getNumero());

        Cidade cidade = new Cidade();
        cidade.setId(localColetaRequest.getCidade_id());
        localColeta.setCidade(cidade);

        return localColeta;
    }
}
