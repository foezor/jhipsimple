package com.foe.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.foe.domain.Fashionidas;

import com.foe.repository.FashionidasRepository;
import com.foe.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Fashionidas.
 */
@RestController
@RequestMapping("/api")
public class FashionidasResource {

    private final Logger log = LoggerFactory.getLogger(FashionidasResource.class);

    private static final String ENTITY_NAME = "fashionidas";
        
    private final FashionidasRepository fashionidasRepository;

    public FashionidasResource(FashionidasRepository fashionidasRepository) {
        this.fashionidasRepository = fashionidasRepository;
    }

    /**
     * POST  /fashionidas : Create a new fashionidas.
     *
     * @param fashionidas the fashionidas to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fashionidas, or with status 400 (Bad Request) if the fashionidas has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fashionidas")
    @Timed
    public ResponseEntity<Fashionidas> createFashionidas(@RequestBody Fashionidas fashionidas) throws URISyntaxException {
        log.debug("REST request to save Fashionidas : {}", fashionidas);
        if (fashionidas.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new fashionidas cannot already have an ID")).body(null);
        }
        Fashionidas result = fashionidasRepository.save(fashionidas);
        return ResponseEntity.created(new URI("/api/fashionidas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fashionidas : Updates an existing fashionidas.
     *
     * @param fashionidas the fashionidas to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fashionidas,
     * or with status 400 (Bad Request) if the fashionidas is not valid,
     * or with status 500 (Internal Server Error) if the fashionidas couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fashionidas")
    @Timed
    public ResponseEntity<Fashionidas> updateFashionidas(@RequestBody Fashionidas fashionidas) throws URISyntaxException {
        log.debug("REST request to update Fashionidas : {}", fashionidas);
        if (fashionidas.getId() == null) {
            return createFashionidas(fashionidas);
        }
        Fashionidas result = fashionidasRepository.save(fashionidas);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fashionidas.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fashionidas : get all the fashionidas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of fashionidas in body
     */
    @GetMapping("/fashionidas")
    @Timed
    public List<Fashionidas> getAllFashionidas() {
        log.debug("REST request to get all Fashionidas");
        List<Fashionidas> fashionidas = fashionidasRepository.findAll();
        return fashionidas;
    }

    /**
     * GET  /fashionidas/:id : get the "id" fashionidas.
     *
     * @param id the id of the fashionidas to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fashionidas, or with status 404 (Not Found)
     */
    @GetMapping("/fashionidas/{id}")
    @Timed
    public ResponseEntity<Fashionidas> getFashionidas(@PathVariable Long id) {
        log.debug("REST request to get Fashionidas : {}", id);
        Fashionidas fashionidas = fashionidasRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(fashionidas));
    }

    /**
     * DELETE  /fashionidas/:id : delete the "id" fashionidas.
     *
     * @param id the id of the fashionidas to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fashionidas/{id}")
    @Timed
    public ResponseEntity<Void> deleteFashionidas(@PathVariable Long id) {
        log.debug("REST request to delete Fashionidas : {}", id);
        fashionidasRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
