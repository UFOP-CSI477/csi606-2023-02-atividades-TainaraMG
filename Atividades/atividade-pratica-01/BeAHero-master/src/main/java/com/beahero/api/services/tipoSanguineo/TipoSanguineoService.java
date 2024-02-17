package com.beahero.api.services.tipoSanguineo;

import com.beahero.api.DTO.tipoSanguineo.response.TipoSanguineoResponse;
import com.beahero.api.entities.TipoSanguineo;
import com.beahero.api.exception.tipoSanguineo.TipoSanguineoNotFoundException;
import com.beahero.api.repositories.TipoSanguineoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class TipoSanguineoService {
    @Autowired
    private TipoSanguineoRepository tipoSanguineoRepository;

    @Transactional
    public List<TipoSanguineo> getAll() {
        log.info("Returning all TiposSanguineos");

        return tipoSanguineoRepository.findAll();
    }

    @Transactional
    public TipoSanguineo getById(Long id) {
        log.info("Finding a TipoSanguineo by id");
        TipoSanguineoResponse tipoSanguineoResponse = new TipoSanguineoResponse();
        return tipoSanguineoRepository.findById(id).orElseThrow(() -> new TipoSanguineoNotFoundException("No TipoSanguineo found for the given id"));
    }
}
