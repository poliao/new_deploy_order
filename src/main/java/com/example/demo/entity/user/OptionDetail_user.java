package com.example.demo.entity.user;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class OptionDetail_user {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long optionDetailId;

    private String optionDetails;

    // Getters and Setters
}
