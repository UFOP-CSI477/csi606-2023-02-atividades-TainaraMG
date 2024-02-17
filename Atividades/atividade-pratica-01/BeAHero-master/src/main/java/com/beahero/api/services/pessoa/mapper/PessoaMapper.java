package com.beahero.api.services.pessoa.mapper;

import com.beahero.api.DTO.pessoa.request.PessoaRequest;
import com.beahero.api.DTO.pessoa.response.PessoaResponse;
import com.beahero.api.entities.Cidade;
import com.beahero.api.entities.Pessoa;
import com.beahero.api.entities.TipoSanguineo;
import com.beahero.api.services.cidade.mapper.CidadeMapper;
import com.beahero.api.services.tipoSanguineo.mapper.TipoSanguineoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class PessoaMapper {

    @Autowired
    private CidadeMapper cidadeMapper;

    @Autowired
    private TipoSanguineoMapper tipoSanguineoMapper;
    public PessoaResponse toResponse(Pessoa pessoa) {
        PessoaResponse pessoaResponse = new PessoaResponse();

        pessoaResponse.setId(pessoa.getId());
        pessoaResponse.setNome(pessoa.getNome());
        pessoaResponse.setRua(pessoa.getRua());
        pessoaResponse.setComplemento(pessoa.getComplemento());
        pessoaResponse.setNumero(pessoa.getNumero());
        pessoaResponse.setRg(pessoa.getRg());
        pessoaResponse.setCidade(cidadeMapper.toResponse(pessoa.getCidade()));
        pessoaResponse.setTipoSanguineo(tipoSanguineoMapper.toResponse(pessoa.getTipoSanguineo()));
        pessoaResponse.setCreated_at(pessoa.getCreated_at());
        pessoaResponse.setUpdated_at(pessoa.getUpdated_at());

        return pessoaResponse;
    }

    public Pessoa toEntity(PessoaRequest pessoaRequest) {
        Pessoa pessoa = new Pessoa();

        pessoa.setNome(pessoaRequest.getNome());
        pessoa.setRua(pessoaRequest.getRua());
        pessoa.setComplemento(pessoaRequest.getComplemento());
        pessoa.setNumero(pessoaRequest.getNumero());
        pessoa.setRg(pessoaRequest.getRg());

        Cidade cidade = new Cidade();
        cidade.setId(pessoaRequest.getCidade_id());
        pessoa.setCidade(cidade);

        TipoSanguineo tipoSanguineo = new TipoSanguineo();
        tipoSanguineo.setId(pessoaRequest.getTipo_id());
        pessoa.setTipoSanguineo(tipoSanguineo);

        return pessoa;

    }
}
