package com.example.demo.entity.admin;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class menuitem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuId;

    @Column
    private String namemenu;

    @Column
    private String detailmenu;

    @Column
    private String img;

    @Column
    private Long price; 

    @Column
    private Long total;

    @Column
    private String typemenu; // Added field for menu type

    @OneToMany(mappedBy = "menu", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<optionmenu_admin> optionsmenu;
}
