package com.beahero.api.repositories;

import com.beahero.api.entities.TipoSanguineo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface TipoSanguineoRepository extends JpaRepository<TipoSanguineo, Long> {
}
