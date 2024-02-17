package com.beahero.api.repositories;

import com.beahero.api.entities.Cidade;
import com.beahero.api.entities.Pessoa;
import jakarta.persistence.NamedQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional(readOnly = true)
public interface CidadeRepository extends JpaRepository<Cidade, Long> {
    Page<Cidade> findByEstado_Id(@Param("estado_id") Long estadoId, Pageable pageable);
    @Query("SELECT c FROM Cidade c WHERE LOWER(c.nome) LIKE LOWER(CONCAT('%', :nome, '%')) AND c.estado.id = :estado_id")
    Page<Cidade> findByNome(@Param("estado_id") Long estado_id, @Param("nome") String nome, Pageable pageable);

}
