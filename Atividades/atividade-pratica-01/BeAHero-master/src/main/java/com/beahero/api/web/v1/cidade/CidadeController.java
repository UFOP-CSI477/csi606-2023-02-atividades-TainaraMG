package com.beahero.api.web.v1.cidade;

import com.beahero.api.DTO.cidade.response.CidadeResponse;
import com.beahero.api.DTO.doacao.response.DoacaoResponse;
import com.beahero.api.DTO.estado.response.EstadoResponse;
import com.beahero.api.entities.Cidade;
import com.beahero.api.models.PageModel;
import com.beahero.api.services.cidade.CidadeService;
import com.beahero.api.services.cidade.mapper.CidadeMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/cidades")
@CrossOrigin(origins = "*")
@Slf4j
public class CidadeController {
    @Autowired
    CidadeService cidadeService;

    @Autowired
    CidadeMapper cidadeMapper;

    private final int SIZE = 20;

    @GetMapping(value = "/{estado_id}")
    public ResponseEntity<List<CidadeResponse>> getCidadeByEstadoId(
            @PathVariable("estado_id") final Long estado_id,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "nome", defaultValue = "") String nome) {
        PageRequest pageRequest = PageRequest.of(page, this.SIZE);
        Page<Cidade> cidades = cidadeService.getByNome(estado_id, nome, pageRequest);

        List<CidadeResponse> cidadesResponse = cidades.getContent().stream().map(cidade -> cidadeMapper.toResponse(cidade)).toList();

        return ResponseEntity.ok(cidadesResponse);

    }
}
