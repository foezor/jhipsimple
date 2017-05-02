package com.foe.repository;

import com.foe.domain.Fashionidas;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Fashionidas entity.
 */
@SuppressWarnings("unused")
public interface FashionidasRepository extends JpaRepository<Fashionidas,Long> {

}
