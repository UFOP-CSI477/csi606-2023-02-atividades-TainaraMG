package com.beahero.api.web.v1.pessoa;

import com.beahero.api.DTO.doacao.response.DoacaoResponse;
import com.beahero.api.DTO.pessoa.request.PessoaRequest;
import com.beahero.api.DTO.pessoa.response.PessoaResponse;
import com.beahero.api.entities.Pessoa;
import com.beahero.api.models.PageModel;
import com.beahero.api.services.pessoa.PessoaService;
import com.beahero.api.services.pessoa.mapper.PessoaMapper;
import jakarta.websocket.server.PathParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pessoas")
@CrossOrigin(origins = "*")
@Slf4j
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    @Autowired
    private PessoaMapper pessoaMapper;

    private final int SIZE = 20;

    @GetMapping(value = "/{id}")
    public ResponseEntity<PessoaResponse> getPessoaById(@PathVariable("id") final Long id) {
        var pessoa = pessoaService.getById(id);
        var foundPessoa = pessoaMapper.toResponse(pessoa);
        return ResponseEntity.ok(foundPessoa);
    }

    @GetMapping
    public ResponseEntity<List<PessoaResponse>> getAllPessoasByNome(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "nome", defaultValue = "") String nome) {
        PageRequest pageRequest = PageRequest.of(page, this.SIZE);
        Page<Pessoa> pessoas = pessoaService.getByNome(nome, pageRequest);

        List<PessoaResponse> doacoesResponses = pessoas.getContent().stream().map(doacao -> pessoaMapper.toResponse(doacao)).toList();

        return ResponseEntity.ok(doacoesResponses);
    }

    @PostMapping
    public ResponseEntity<PessoaRequest> insertPessoa(@RequestBody PessoaRequest pessoa) {
        var pessoaToInsert = pessoaMapper.toEntity(pessoa);
        var insertedPessoa = pessoaService.insertPessoa(pessoaToInsert);

        return ResponseEntity.ok(pessoa);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<PessoaResponse> insertPessoa(
            @PathVariable(value = "id") Long id,
            @RequestBody PessoaRequest pessoa
    ) {
        var pessoaToUpdate = pessoaMapper.toEntity(pessoa);
        pessoaToUpdate.setId(id);
        var updatedPessoa = pessoaService.updatePessoa(pessoaToUpdate);

        return ResponseEntity.ok(pessoaMapper.toResponse(updatedPessoa));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<PessoaResponse> deletePessoaById(@PathVariable("id") final Long id) {
        var pessoa = pessoaService.deletePessoa(id);
        var deletedPessoa = pessoaMapper.toResponse(pessoa);
        return ResponseEntity.ok(deletedPessoa);
    }

}
