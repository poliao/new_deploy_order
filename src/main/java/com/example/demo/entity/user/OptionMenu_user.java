package com.example.demo.entity.user;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class OptionMenu_user {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long optionId;

    private String optionName;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "option_menu_id")
    private List<OptionDetail_user> optionDetail;

    // Getters and Setters
}
