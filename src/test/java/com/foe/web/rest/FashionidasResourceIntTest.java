package com.foe.web.rest;

import com.foe.JhipsimpleApp;

import com.foe.domain.Fashionidas;
import com.foe.repository.FashionidasRepository;
import com.foe.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FashionidasResource REST controller.
 *
 * @see FashionidasResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsimpleApp.class)
public class FashionidasResourceIntTest {

    private static final String DEFAULT_ALIAS = "AAAAAAAAAA";
    private static final String UPDATED_ALIAS = "BBBBBBBBBB";

    @Autowired
    private FashionidasRepository fashionidasRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFashionidasMockMvc;

    private Fashionidas fashionidas;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
            FashionidasResource fashionidasResource = new FashionidasResource(fashionidasRepository);
        this.restFashionidasMockMvc = MockMvcBuilders.standaloneSetup(fashionidasResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fashionidas createEntity(EntityManager em) {
        Fashionidas fashionidas = new Fashionidas()
                .alias(DEFAULT_ALIAS);
        return fashionidas;
    }

    @Before
    public void initTest() {
        fashionidas = createEntity(em);
    }

    @Test
    @Transactional
    public void createFashionidas() throws Exception {
        int databaseSizeBeforeCreate = fashionidasRepository.findAll().size();

        // Create the Fashionidas

        restFashionidasMockMvc.perform(post("/api/fashionidas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fashionidas)))
            .andExpect(status().isCreated());

        // Validate the Fashionidas in the database
        List<Fashionidas> fashionidasList = fashionidasRepository.findAll();
        assertThat(fashionidasList).hasSize(databaseSizeBeforeCreate + 1);
        Fashionidas testFashionidas = fashionidasList.get(fashionidasList.size() - 1);
        assertThat(testFashionidas.getAlias()).isEqualTo(DEFAULT_ALIAS);
    }

    @Test
    @Transactional
    public void createFashionidasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fashionidasRepository.findAll().size();

        // Create the Fashionidas with an existing ID
        Fashionidas existingFashionidas = new Fashionidas();
        existingFashionidas.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFashionidasMockMvc.perform(post("/api/fashionidas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingFashionidas)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Fashionidas> fashionidasList = fashionidasRepository.findAll();
        assertThat(fashionidasList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFashionidas() throws Exception {
        // Initialize the database
        fashionidasRepository.saveAndFlush(fashionidas);

        // Get all the fashionidasList
        restFashionidasMockMvc.perform(get("/api/fashionidas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fashionidas.getId().intValue())))
            .andExpect(jsonPath("$.[*].alias").value(hasItem(DEFAULT_ALIAS.toString())));
    }

    @Test
    @Transactional
    public void getFashionidas() throws Exception {
        // Initialize the database
        fashionidasRepository.saveAndFlush(fashionidas);

        // Get the fashionidas
        restFashionidasMockMvc.perform(get("/api/fashionidas/{id}", fashionidas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fashionidas.getId().intValue()))
            .andExpect(jsonPath("$.alias").value(DEFAULT_ALIAS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFashionidas() throws Exception {
        // Get the fashionidas
        restFashionidasMockMvc.perform(get("/api/fashionidas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFashionidas() throws Exception {
        // Initialize the database
        fashionidasRepository.saveAndFlush(fashionidas);
        int databaseSizeBeforeUpdate = fashionidasRepository.findAll().size();

        // Update the fashionidas
        Fashionidas updatedFashionidas = fashionidasRepository.findOne(fashionidas.getId());
        updatedFashionidas
                .alias(UPDATED_ALIAS);

        restFashionidasMockMvc.perform(put("/api/fashionidas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFashionidas)))
            .andExpect(status().isOk());

        // Validate the Fashionidas in the database
        List<Fashionidas> fashionidasList = fashionidasRepository.findAll();
        assertThat(fashionidasList).hasSize(databaseSizeBeforeUpdate);
        Fashionidas testFashionidas = fashionidasList.get(fashionidasList.size() - 1);
        assertThat(testFashionidas.getAlias()).isEqualTo(UPDATED_ALIAS);
    }

    @Test
    @Transactional
    public void updateNonExistingFashionidas() throws Exception {
        int databaseSizeBeforeUpdate = fashionidasRepository.findAll().size();

        // Create the Fashionidas

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFashionidasMockMvc.perform(put("/api/fashionidas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fashionidas)))
            .andExpect(status().isCreated());

        // Validate the Fashionidas in the database
        List<Fashionidas> fashionidasList = fashionidasRepository.findAll();
        assertThat(fashionidasList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFashionidas() throws Exception {
        // Initialize the database
        fashionidasRepository.saveAndFlush(fashionidas);
        int databaseSizeBeforeDelete = fashionidasRepository.findAll().size();

        // Get the fashionidas
        restFashionidasMockMvc.perform(delete("/api/fashionidas/{id}", fashionidas.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Fashionidas> fashionidasList = fashionidasRepository.findAll();
        assertThat(fashionidasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fashionidas.class);
    }
}
