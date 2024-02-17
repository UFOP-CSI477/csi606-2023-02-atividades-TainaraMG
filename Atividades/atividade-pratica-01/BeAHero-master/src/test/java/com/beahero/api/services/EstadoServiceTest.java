package com.beahero.api.services;

import com.beahero.api.DTO.estado.response.EstadoResponse;
import com.beahero.api.entities.Estado;
import com.beahero.api.repositories.EstadoRepository;
import com.beahero.api.services.estado.EstadoService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@ActiveProfiles("test")
public class EstadoServiceTest {
    @Mock
    private EstadoRepository estadoRepository;

    @InjectMocks
    private EstadoService estadoService;

    @Test
    void testGetAll() {
        // Arrange
        Estado estado1 = new Estado();
        Estado estado2 = new Estado();
        List<Estado> estadoList = Arrays.asList(estado1, estado2);

        when(estadoRepository.findAll()).thenReturn(estadoList);

        // Act
        List<Estado> result = estadoService.getAll();

        // Assert
        assertEquals(2, result.size());
        // Adicione mais verificações conforme necessário
    }
}
