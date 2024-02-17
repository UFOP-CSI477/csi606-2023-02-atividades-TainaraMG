package com.beahero.api.web.v1.tipoSanguineo;

import com.beahero.api.DTO.tipoSanguineo.response.TipoSanguineoResponse;
import com.beahero.api.entities.TipoSanguineo;
import com.beahero.api.services.tipoSanguineo.TipoSanguineoService;
import com.beahero.api.services.tipoSanguineo.mapper.TipoSanguineoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/tipos-sanguineos")
@CrossOrigin(origins = "*")
public class TipoSanguineoController {
    @Autowired
    private TipoSanguineoService tipoSanguineoService;
    @Autowired
    private TipoSanguineoMapper tipoSanguineoMapper;


    @GetMapping
    public ResponseEntity<List<TipoSanguineoResponse>> getAllTiposSanguineos() {
        List<TipoSanguineo> tipoSanguineos = tipoSanguineoService.getAll();


        List<TipoSanguineoResponse> tipoSanguineoResponses = new ArrayList<TipoSanguineoResponse>();
        tipoSanguineos.forEach(tipoSanguineo -> {
            TipoSanguineoResponse tipoSanguineoResponse = tipoSanguineoMapper.toResponse(tipoSanguineo);
            tipoSanguineoResponses.add(tipoSanguineoResponse);
        });

        return ResponseEntity.ok(tipoSanguineoResponses);

    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<TipoSanguineoResponse> getTipoSanguineoById(@PathVariable("id") final Long id) {
        var tipoSanguineo = tipoSanguineoService.getById(id);
        var foundTipoSanguineo = tipoSanguineoMapper.toResponse(tipoSanguineo);
        return ResponseEntity.ok(foundTipoSanguineo);
    }
}
