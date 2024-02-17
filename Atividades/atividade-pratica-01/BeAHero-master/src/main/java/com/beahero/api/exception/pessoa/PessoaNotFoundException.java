package com.beahero.api.exception.pessoa;

public class PessoaNotFoundException extends RuntimeException{
    public PessoaNotFoundException(String message){
        super(message);
    }
}
