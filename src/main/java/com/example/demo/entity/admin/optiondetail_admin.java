package com.example.demo.entity.admin;


import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
@Entity
@Data
public class optiondetail_admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long optiondetail_id;

    @Column
    private String optiondetails;

    @ManyToOne
    @JoinColumn(name = "option_id", nullable = false)
    @JsonBackReference
    private optionmenu_admin optionMenu;

    // Getters and Setters
}
