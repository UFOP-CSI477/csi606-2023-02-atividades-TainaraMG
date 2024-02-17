package com.beahero.api.entities;

import com.beahero.api.enums.FatorSanguineoEnum;
import com.beahero.api.enums.TipoSanguineoEnum;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "doacoes")
public class Doacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pessoa_id", referencedColumnName = "id")
    private Pessoa pessoa;

    @ManyToOne
    @JoinColumn(name = "local_id", referencedColumnName = "id")
    private LocalColeta localColeta;

    @Column
    @Nonnull
    private LocalDate data;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Nonnull
    private final Instant created_at = Instant.now();

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Nonnull
    private final Instant updated_at = Instant.now();
}
