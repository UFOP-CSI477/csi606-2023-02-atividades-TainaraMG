package com.beahero.api.web.v1.doacao;

import com.beahero.api.DTO.doacao.request.DoacaoRequest;
import com.beahero.api.DTO.doacao.response.DoacaoResponse;
import com.beahero.api.entities.Doacao;
import com.beahero.api.models.PageModel;
import com.beahero.api.services.doacao.DoacaoService;
import com.beahero.api.services.doacao.mapper.DoacaoMapper;
import com.beahero.api.services.localColeta.LocalColetaService;
import com.beahero.api.services.pessoa.PessoaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v1/doacoes")
@CrossOrigin(origins = "*")
@Slf4j
public class DoacaoController {

    @Autowired
    private DoacaoService doacaoService;

    @Autowired
    private PessoaService pessoaService;

    @Autowired
    private LocalColetaService localColetaService;

    @Autowired
    private DoacaoMapper doacaoMapper;

    private final int SIZE = 20;

    @GetMapping(value = "/{id}")
    public ResponseEntity<DoacaoResponse> getLocalColetaById(@PathVariable("id") final Long id) {
        var pessoa = doacaoService.getById(id);
        var foundPessoa = doacaoMapper.toResponse(pessoa);
        return ResponseEntity.ok(foundPessoa);
    }

    @GetMapping
    public ResponseEntity<List<DoacaoResponse>> getAllLocaisColetaByNome(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "nome", defaultValue = "") String nome) {
        PageRequest pageRequest = PageRequest.of(page, this.SIZE);
        Page<Doacao> doacoes = doacaoService.getAll(pageRequest);

        List<DoacaoResponse> doacoesResponses = doacoes.getContent().stream().map(doacao -> doacaoMapper.toResponse(doacao)).toList();

        return ResponseEntity.ok(doacoesResponses);
    }

    @PostMapping
    public ResponseEntity<DoacaoResponse> insertPessoa(@RequestBody DoacaoRequest doacao) {
        var doacaoToInsert = doacaoMapper.toEntity(doacao);
        var insertedDoacao = doacaoService.insertPessoa(doacaoToInsert);

        var doacaoComplete = doacaoService.getById(insertedDoacao.getId());
        doacaoComplete.setPessoa(pessoaService.getById(doacaoComplete.getPessoa().getId()));
        doacaoComplete.setLocalColeta(localColetaService.getById(doacaoComplete.getLocalColeta().getId()));

        var doacaoResponse = doacaoMapper.toResponse(doacaoComplete);

        return ResponseEntity.ok(doacaoResponse);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<DoacaoResponse> insertPessoa(
            @PathVariable(value = "id") Long id,
            @RequestBody DoacaoRequest pessoa
    ) {
        var doacaoToUpdate = doacaoMapper.toEntity(pessoa);
        doacaoToUpdate.setId(id);
        var updatedDoacao = doacaoService.updatePessoa(doacaoToUpdate);

        return ResponseEntity.ok(doacaoMapper.toResponse(updatedDoacao));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<DoacaoResponse> deletePessoaById(@PathVariable("id") final Long id) {
        var doacao = doacaoService.deletePessoa(id);
        var deletedDoacao = doacaoMapper.toResponse(doacao);
        return ResponseEntity.ok(deletedDoacao);
    }
}
