package com.beahero.api.exception.pessoa;

public class PessoaAlreadyExistsException extends RuntimeException {
    public PessoaAlreadyExistsException(String message){
        super(message);
    }
}
