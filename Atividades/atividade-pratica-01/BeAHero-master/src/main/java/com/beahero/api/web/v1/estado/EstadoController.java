package com.beahero.api.web.v1.estado;
import com.beahero.api.DTO.estado.response.EstadoResponse;
import com.beahero.api.entities.Estado;
import com.beahero.api.services.estado.EstadoService;
import com.beahero.api.services.estado.mapper.EstadoMapper;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/estados")
@CrossOrigin(origins = "*")

public class EstadoController {
    @Autowired
    private EstadoService estadoService;

    @Autowired
    private EstadoMapper estadoMapper;

    @GetMapping
    public ResponseEntity<List<EstadoResponse>> getAllEstados() {
        List<Estado> estados = estadoService.getAll();

        List<EstadoResponse> estadoResponses = new ArrayList<EstadoResponse>();
            estados.forEach(estado -> {
                EstadoResponse estadoResponse = estadoMapper.toResponse(estado);
                estadoResponses.add(estadoResponse);
            });

        return ResponseEntity.ok(estadoResponses);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<EstadoResponse> getEstadoById(@PathVariable("id") final Long id) {
        var estado = estadoService.getById(id);
        var foundEstado = estadoMapper.toResponse(estado);
        return ResponseEntity.ok(foundEstado);
    }

}
