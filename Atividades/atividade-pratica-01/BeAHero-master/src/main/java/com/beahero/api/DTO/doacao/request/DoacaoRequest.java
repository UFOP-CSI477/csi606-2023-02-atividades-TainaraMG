package com.beahero.api.DTO.doacao.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Data
@Getter
@Setter
@ToString
public class DoacaoRequest {
    private Long pessoa_id;

    private Long local_id;

    private LocalDate data;
}
