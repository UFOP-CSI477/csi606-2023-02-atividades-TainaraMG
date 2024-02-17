package com.beahero.api.services.estado;

import com.beahero.api.DTO.estado.response.EstadoResponse;
import com.beahero.api.entities.Estado;
import com.beahero.api.exception.estado.EstadoNotFoundException;
import com.beahero.api.repositories.EstadoRepository;
import com.beahero.api.services.estado.mapper.EstadoMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class EstadoService {
    @Autowired
    private EstadoRepository estadoRepository;

    @Transactional
    public List<Estado> getAll() {
        log.info("Returning all Estados");

        return estadoRepository.findAll();
    }

    @Transactional
    public Estado getById(Long id) {
        log.info("Finding a Estado by id");

        return estadoRepository.findById(id).orElseThrow(() -> new EstadoNotFoundException("No Estado found for the given id"));
    }
}
