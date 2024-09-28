package com.example.demo.entity.user;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class MenuOrder_user {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuId;
    private String status;
    private String nameMenu;
    private String detailMenu;
    private String typemenu;
    private String img;
    private Integer price;
    private Integer total;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_order_id")
    private List<OptionMenu_user> optionsMenu;

    @ManyToOne
    @JoinColumn(name = "table_id")
    private Table_user table;

    // Getters and Setters
}
