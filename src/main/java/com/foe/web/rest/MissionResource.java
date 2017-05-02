package com.foe.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.foe.domain.Mission;

import com.foe.repository.MissionRepository;
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
 * REST controller for managing Mission.
 */
@RestController
@RequestMapping("/api")
public class MissionResource {

    private final Logger log = LoggerFactory.getLogger(MissionResource.class);

    private static final String ENTITY_NAME = "mission";
        
    private final MissionRepository missionRepository;

    public MissionResource(MissionRepository missionRepository) {
        this.missionRepository = missionRepository;
    }

    /**
     * POST  /missions : Create a new mission.
     *
     * @param mission the mission to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mission, or with status 400 (Bad Request) if the mission has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/missions")
    @Timed
    public ResponseEntity<Mission> createMission(@RequestBody Mission mission) throws URISyntaxException {
        log.debug("REST request to save Mission : {}", mission);
        if (mission.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new mission cannot already have an ID")).body(null);
        }
        Mission result = missionRepository.save(mission);
        return ResponseEntity.created(new URI("/api/missions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /missions : Updates an existing mission.
     *
     * @param mission the mission to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mission,
     * or with status 400 (Bad Request) if the mission is not valid,
     * or with status 500 (Internal Server Error) if the mission couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/missions")
    @Timed
    public ResponseEntity<Mission> updateMission(@RequestBody Mission mission) throws URISyntaxException {
        log.debug("REST request to update Mission : {}", mission);
        if (mission.getId() == null) {
            return createMission(mission);
        }
        Mission result = missionRepository.save(mission);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mission.getId().toString()))
            .body(result);
    }

    /**
     * GET  /missions : get all the missions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of missions in body
     */
    @GetMapping("/missions")
    @Timed
    public List<Mission> getAllMissions() {
        log.debug("REST request to get all Missions");
        List<Mission> missions = missionRepository.findAll();
        return missions;
    }

    /**
     * GET  /missions/:id : get the "id" mission.
     *
     * @param id the id of the mission to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mission, or with status 404 (Not Found)
     */
    @GetMapping("/missions/{id}")
    @Timed
    public ResponseEntity<Mission> getMission(@PathVariable Long id) {
        log.debug("REST request to get Mission : {}", id);
        Mission mission = missionRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mission));
    }

    /**
     * DELETE  /missions/:id : delete the "id" mission.
     *
     * @param id the id of the mission to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/missions/{id}")
    @Timed
    public ResponseEntity<Void> deleteMission(@PathVariable Long id) {
        log.debug("REST request to delete Mission : {}", id);
        missionRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
