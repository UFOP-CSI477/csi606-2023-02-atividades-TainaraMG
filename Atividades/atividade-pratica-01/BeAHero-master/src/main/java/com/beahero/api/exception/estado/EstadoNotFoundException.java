package com.beahero.api.exception.estado;

public class EstadoNotFoundException extends RuntimeException {
    public EstadoNotFoundException(String message){
        super(message);
    }
}
