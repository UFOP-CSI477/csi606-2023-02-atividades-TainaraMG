package com.beahero.api.exception.cidade;

public class CidadeNotFoundException extends RuntimeException {
    public CidadeNotFoundException(String message){
        super(message);
    }
}
