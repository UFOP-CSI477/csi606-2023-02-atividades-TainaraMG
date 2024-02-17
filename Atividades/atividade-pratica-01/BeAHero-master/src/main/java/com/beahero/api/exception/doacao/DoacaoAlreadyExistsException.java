package com.beahero.api.exception.doacao;

public class DoacaoAlreadyExistsException extends RuntimeException {
    public DoacaoAlreadyExistsException(String message){
        super(message);
    }
}
