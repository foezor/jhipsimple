package com.foe.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Mission.
 */
@Entity
@Table(name = "mission")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Mission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "theme")
    private String theme;

    @Column(name = "maximum_amount")
    private Double maximumAmount;

    @ManyToOne
    private Fashionidas fashionidas;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTheme() {
        return theme;
    }

    public Mission theme(String theme) {
        this.theme = theme;
        return this;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public Double getMaximumAmount() {
        return maximumAmount;
    }

    public Mission maximumAmount(Double maximumAmount) {
        this.maximumAmount = maximumAmount;
        return this;
    }

    public void setMaximumAmount(Double maximumAmount) {
        this.maximumAmount = maximumAmount;
    }

    public Fashionidas getFashionidas() {
        return fashionidas;
    }

    public Mission fashionidas(Fashionidas fashionidas) {
        this.fashionidas = fashionidas;
        return this;
    }

    public void setFashionidas(Fashionidas fashionidas) {
        this.fashionidas = fashionidas;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Mission mission = (Mission) o;
        if (mission.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, mission.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Mission{" +
            "id=" + id +
            ", theme='" + theme + "'" +
            ", maximumAmount='" + maximumAmount + "'" +
            '}';
    }
}
