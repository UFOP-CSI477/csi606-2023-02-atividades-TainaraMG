package com.beahero.api.services.localColeta;

import com.beahero.api.entities.LocalColeta;
import com.beahero.api.exception.localColeta.LocalColetaAreadyExistsException;
import com.beahero.api.exception.localColeta.LocalColetaNotFoundException;
import com.beahero.api.repositories.LocalColetaRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
public class LocalColetaService {

    @Autowired
    private LocalColetaRepository localColetaRepository;

    @Transactional
    public Page<LocalColeta> getAll(PageRequest pageRequest) {
        log.info("Returning all LocaisColeta");
        return localColetaRepository.findAll(pageRequest);
    }

    @Transactional
    public LocalColeta getById(Long id) {
        log.info("Returning a LocalColeta by id");

        return localColetaRepository.findById(id).orElseThrow(() -> new LocalColetaNotFoundException("No LocalColeta found for the given id"));
    }

    @Transactional
    public Page<LocalColeta> getByNome(String name, PageRequest pageRequest) {
        log.info("Returning all LocaisColeta by nome");
        return localColetaRepository.findByNome(name, pageRequest);
    }

    @Transactional
    public LocalColeta updatePessoa(LocalColeta pessoa) {
        log.info("Updating a LocaisColeta by id");
        var foundLocalColeta = exists(pessoa.getId());

        if(foundLocalColeta.isPresent()){
            return localColetaRepository.save(pessoa);
        }

        return null;
    }

    @Transactional
    public LocalColeta insertPessoa(LocalColeta pessoa) {
        log.info("Inserting a LocalColeta");
        return localColetaRepository.save(pessoa);
    }

    @Transactional
    public LocalColeta deletePessoa(Long id) {
        log.info("Deleting a LocalColeta by id");
        var foundPessoa = exists(id);
        if(foundPessoa.isPresent()){
            localColetaRepository.deleteById(id);

            return foundPessoa.get();
        }

        return null;
    }

    @Transactional
    private Optional<LocalColeta> exists(Long id) {
        Optional<LocalColeta> foundPessoa = localColetaRepository.findById(id);
        if(foundPessoa.isEmpty()){
            throw new LocalColetaAreadyExistsException("A LocalColeta does not exist with the provided id");
        }

        return foundPessoa;
    }
}
