package com.beahero.api.services.pessoa;

import com.beahero.api.entities.Pessoa;
import com.beahero.api.exception.pessoa.PessoaAlreadyExistsException;
import com.beahero.api.exception.pessoa.PessoaNotFoundException;
import com.beahero.api.repositories.PessoaRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class PessoaService {
    @Autowired
    private PessoaRepository pessoaRepository;

    @Transactional
    public Page<Pessoa> getAll(PageRequest pageRequest) {
        log.info("Returning all Pessoas");
        return pessoaRepository.findAll(pageRequest);
    }

    @Transactional
    public Pessoa getById(Long id) {
        log.info("Returning a Pessoa by id");

        return pessoaRepository.findById(id).orElseThrow(() -> new PessoaNotFoundException("No Pessoa found for the given id"));
    }

    @Transactional
    public Page<Pessoa> getByNome(String name, PageRequest pageRequest) {
        log.info("Returning all Pessoas by nome");
        return pessoaRepository.findByNome(name, pageRequest);
    }

    @Transactional
    public Pessoa updatePessoa(Pessoa pessoa) {
        log.info("Updating a Pessoa by id");
        var foundPessoa = exists(pessoa.getId());

        if(foundPessoa.isPresent()){
            return pessoaRepository.save(pessoa);
        }

        return null;
    }

    @Transactional
    public Pessoa insertPessoa(Pessoa pessoa) {
        log.info("Inserting a Pessoa");
        return pessoaRepository.save(pessoa);
    }

    @Transactional
    public Pessoa deletePessoa(Long id) {
        log.info("Deleting a Pessoa by id");

        var foundPessoa = exists(id);
        if(foundPessoa.isPresent()){
            pessoaRepository.deleteById(id);

            return foundPessoa.get();
        }

        return null;
    }

    @Transactional
    private Optional<Pessoa> exists(Long id) {
        Optional<Pessoa> foundPessoa = pessoaRepository.findById(id);
        if(foundPessoa.isEmpty()){
            throw new PessoaAlreadyExistsException("A Pessoa does not exist with the provided id");
        }

        return foundPessoa;
    }


}
