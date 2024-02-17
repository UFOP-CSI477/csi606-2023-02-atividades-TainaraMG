package com.beahero.api.exception.doacao;

public class DoacaoNotFoundException extends RuntimeException {
    public DoacaoNotFoundException(String message){
        super(message);
    }
}
