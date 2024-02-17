package com.beahero.api.services.doacao;

import com.beahero.api.entities.Doacao;
import com.beahero.api.exception.doacao.DoacaoAlreadyExistsException;
import com.beahero.api.exception.doacao.DoacaoNotFoundException;
import com.beahero.api.repositories.DoacaoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
public class DoacaoService {

    @Autowired
    private DoacaoRepository doacaoRepository;

    @Transactional
    public Page<Doacao> getAll(PageRequest pageRequest) {
        log.info("Returning all Doacoes");
        return doacaoRepository.findAll(pageRequest);
    }

    @Transactional
    public Doacao getById(Long id) {
        log.info("Returning a Doacao by id");

        return doacaoRepository.findById(id).orElseThrow(() -> new DoacaoNotFoundException("No LocalColeta found for the given id"));
    }

    @Transactional
    public Doacao updatePessoa(Doacao pessoa) {
        log.info("Updating a Doacao by id");
        var foundDoacao = exists(pessoa.getId());

        if(foundDoacao.isPresent()){
            return doacaoRepository.save(pessoa);
        }

        return null;
    }

    @Transactional
    public Doacao insertPessoa(Doacao pessoa) {
        log.info("Inserting a Doacao");
        return doacaoRepository.save(pessoa);
    }

    @Transactional
    public Doacao deletePessoa(Long id) {
        log.info("Deleting a Doacao by id");
        var foundDoacao = exists(id);
        if(foundDoacao.isPresent()){
            doacaoRepository.deleteById(id);

            return foundDoacao.get();
        }

        return null;
    }

    @Transactional
    private Optional<Doacao> exists(Long id) {
        Optional<Doacao> foundPessoa = doacaoRepository.findById(id);
        if(foundPessoa.isEmpty()){
            throw new DoacaoAlreadyExistsException("A LocalColeta does not exist with the provided id");
        }

        return foundPessoa;
    }
}
