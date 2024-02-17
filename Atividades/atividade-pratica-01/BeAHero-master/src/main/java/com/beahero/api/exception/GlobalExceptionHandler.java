package com.beahero.api.exception;

import com.beahero.api.exception.cidade.CidadeNotFoundException;
import com.beahero.api.exception.doacao.DoacaoAlreadyExistsException;
import com.beahero.api.exception.doacao.DoacaoNotFoundException;
import com.beahero.api.exception.estado.EstadoNotFoundException;
import com.beahero.api.exception.localColeta.LocalColetaAreadyExistsException;
import com.beahero.api.exception.localColeta.LocalColetaNotFoundException;
import com.beahero.api.exception.pessoa.PessoaAlreadyExistsException;
import com.beahero.api.exception.pessoa.PessoaNotFoundException;
import com.beahero.api.exception.tipoSanguineo.TipoSanguineoNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Getter
@Setter
@AllArgsConstructor
class Error {

    private String message;

    private HttpStatus status;
}
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler({TipoSanguineoNotFoundException.class})
    public ResponseEntity<Object> handleStudentNotFoundException(TipoSanguineoNotFoundException exception) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new Error(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @ExceptionHandler({EstadoNotFoundException.class})
    public ResponseEntity<Object> handleEstadoNotFoundException(EstadoNotFoundException exception) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new Error(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @ExceptionHandler({CidadeNotFoundException.class})
    public ResponseEntity<Object> handleCidadeNotFoundException(CidadeNotFoundException exception) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new Error(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @ExceptionHandler({PessoaNotFoundException.class})
    public ResponseEntity<Object> handlePessoaNotFoundException(PessoaNotFoundException exception) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new Error(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @ExceptionHandler({PessoaAlreadyExistsException.class})
    public ResponseEntity<Object> handlePessoaAlreadyExistsException(PessoaAlreadyExistsException exception) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new Error(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @ExceptionHandler({LocalColetaNotFoundException.class})
    public ResponseEntity<Object> handleLocalColetaNotFoundException(LocalColetaNotFoundException exception) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new Error(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @ExceptionHandler({LocalColetaAreadyExistsException.class})
    public ResponseEntity<Object> handleLocalColetaAreadyExistsException(LocalColetaAreadyExistsException exception) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new Error(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @ExceptionHandler({DoacaoNotFoundException.class})
    public ResponseEntity<Object> handleDoacaoNotFoundException(DoacaoNotFoundException exception) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new Error(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @ExceptionHandler({DoacaoAlreadyExistsException.class})
    public ResponseEntity<Object> handleDoacaoAlreadyExistsException(DoacaoAlreadyExistsException exception) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new Error(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
    }
}