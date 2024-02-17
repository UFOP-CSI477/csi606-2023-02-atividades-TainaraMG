package com.beahero.api.services.cidade;

import com.beahero.api.DTO.cidade.response.CidadeResponse;
import com.beahero.api.entities.Cidade;
import com.beahero.api.entities.Doacao;
import com.beahero.api.exception.cidade.CidadeNotFoundException;
import com.beahero.api.exception.doacao.DoacaoNotFoundException;
import com.beahero.api.repositories.CidadeRepository;
import com.beahero.api.services.cidade.mapper.CidadeMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class CidadeService {
    @Autowired
    private CidadeRepository cidadeRepository;
    @Transactional
    public Cidade getById(Long id) {
        log.info("Returning a Doacao by id");
        return cidadeRepository.findById(id).orElseThrow(() -> new CidadeNotFoundException("No cidade found for the given id"));
    }

    @Transactional
    public Page<Cidade> getByEstado(Long estado_id, PageRequest pageRequest) {
        return  cidadeRepository.findByEstado_Id(estado_id, pageRequest);
    }

    @Transactional
    public Page<Cidade> getByNome(Long estado_id, String nome, PageRequest pageRequest) {
        return cidadeRepository.findByNome(estado_id, nome, pageRequest);
    }
}
