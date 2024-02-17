package com.beahero.api.services.doacao.mapper;
import com.beahero.api.DTO.doacao.request.DoacaoRequest;
import com.beahero.api.DTO.doacao.response.DoacaoResponse;
import com.beahero.api.entities.Doacao;
import com.beahero.api.entities.LocalColeta;
import com.beahero.api.entities.Pessoa;
import com.beahero.api.services.localColeta.mapper.LocalColetaMapper;
import com.beahero.api.services.pessoa.mapper.PessoaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DoacaoMapper {
    @Autowired
    private LocalColetaMapper localColetaMapper;
    @Autowired
    private PessoaMapper pessoaMapper;
    public DoacaoResponse toResponse(Doacao doacao) {
        DoacaoResponse doacaoResponse = new DoacaoResponse();

        doacaoResponse.setId(doacao.getId());
        doacaoResponse.setLocal(localColetaMapper.toResponse(doacao.getLocalColeta()));
        doacaoResponse.setPessoa(pessoaMapper.toResponse(doacao.getPessoa()));
        doacaoResponse.setData(doacao.getData());
        doacaoResponse.setCreated_at(doacao.getCreated_at());
        doacaoResponse.setUpdated_at(doacao.getUpdated_at());

        return doacaoResponse;
    }

    public Doacao toEntity(DoacaoRequest doacaoRequest) {
        Doacao doacao = new Doacao();

        doacao.setData(doacaoRequest.getData());

        Pessoa pessoa = new Pessoa();
        pessoa.setId(doacaoRequest.getPessoa_id());
        doacao.setPessoa(pessoa);

        LocalColeta localColeta = new LocalColeta();
        localColeta.setId(doacaoRequest.getLocal_id());
        doacao.setLocalColeta(localColeta);

        return doacao;
    }
}
