package com.beahero.api.web.v1.localColeta;

import com.beahero.api.DTO.doacao.response.DoacaoResponse;
import com.beahero.api.DTO.localColeta.request.LocalColetaRequest;
import com.beahero.api.DTO.localColeta.response.LocalColetaResponse;
import com.beahero.api.entities.LocalColeta;
import com.beahero.api.models.PageModel;
import com.beahero.api.services.cidade.CidadeService;
import com.beahero.api.services.localColeta.LocalColetaService;
import com.beahero.api.services.localColeta.mapper.LocalColetaMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/locais-coleta")
@CrossOrigin(origins = "*")
@Slf4j
public class LocalColetaController {

    @Autowired
    private LocalColetaService localColetaService;

    @Autowired
    private CidadeService cidadeService;

    @Autowired
    private LocalColetaMapper localColetaMapper;

    private final int SIZE = 20;

    @GetMapping(value = "/{id}")
    public ResponseEntity<LocalColetaResponse> getLocalColetaById(@PathVariable("id") final Long id) {
        var localColeta = localColetaService.getById(id);
        var foundLocalColeta = localColetaMapper.toResponse(localColeta);
        return ResponseEntity.ok(foundLocalColeta);
    }

    @GetMapping
    public ResponseEntity<List<LocalColetaResponse>> getAllLocaisColetaByNome(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "nome", defaultValue = "") String nome) {
        PageRequest pageRequest = PageRequest.of(page, this.SIZE);
        Page<LocalColeta> locaisColeta = localColetaService.getByNome(nome, pageRequest);

        List<LocalColetaResponse> localColetaResponses = locaisColeta.getContent().stream().map(localColeta -> localColetaMapper.toResponse(localColeta)).toList();

        return ResponseEntity.ok(localColetaResponses);
    }

    @PostMapping
    public ResponseEntity<LocalColetaResponse> insertPessoa(@RequestBody LocalColetaRequest pessoa) {
        var localColetaToInsert = localColetaMapper.toEntity(pessoa);
        var insertedLocalColeta= localColetaService.insertPessoa(localColetaToInsert);

        var localColetaComplete = localColetaService.getById(insertedLocalColeta.getId());
        localColetaComplete.setCidade(cidadeService.getById(localColetaComplete.getCidade().getId()));

        var doacaoResponse = localColetaMapper.toResponse(localColetaComplete);

        return ResponseEntity.ok(doacaoResponse);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<LocalColetaResponse> insertPessoa(
            @PathVariable(value = "id") Long id,
            @RequestBody LocalColetaRequest pessoa
    ) {
        var localColetaToUpdate = localColetaMapper.toEntity(pessoa);
        localColetaToUpdate.setId(id);
        var updatedLocalPessoa = localColetaService.updatePessoa(localColetaToUpdate);

        return ResponseEntity.ok(localColetaMapper.toResponse(updatedLocalPessoa));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<LocalColetaResponse> deletePessoaById(@PathVariable("id") final Long id) {
        var localColeta = localColetaService.deletePessoa(id);
        var deletedLocalColeta= localColetaMapper.toResponse(localColeta);
        return ResponseEntity.ok(deletedLocalColeta);
    }
}
