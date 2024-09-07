package com.example.demo.entity.user;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Basket_user {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long basketId;

    @ManyToOne
    @JoinColumn(name = "table_id")
    private Table_user table;  // เชื่อมโยงกับ Table_user entity

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "basket_id")
    private List<MenuOrder_user> menuOrders;

    // Getters and Setters
}
