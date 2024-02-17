package com.beahero.api.entities;

import com.beahero.api.enums.FatorSanguineoEnum;
import com.beahero.api.enums.TipoSanguineoEnum;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "tipos_sanguineos")
public class TipoSanguineo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotNull
    @Enumerated(EnumType.STRING)
    private TipoSanguineoEnum tipo;

    @Column
    @NotNull
    @Enumerated(EnumType.STRING)
    private FatorSanguineoEnum fator;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Nonnull
    private final Instant created_at = Instant.now();

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Nonnull
    private final Instant updated_at = Instant.now();
}
