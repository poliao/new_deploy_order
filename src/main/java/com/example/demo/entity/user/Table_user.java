package com.example.demo.entity.user;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Data
public class Table_user {

    @SuppressWarnings("deprecation")
    @Id
    @GeneratedValue(generator = "custom-generator")
    @GenericGenerator(name = "custom-generator", strategy = "com.example.demo.entity.user.CustomIdGenerator")
    private String tableId;

    private String tableName;
    private String status;

    public String getTableId() {
        return tableId;
    }

    // Getters and Setters
}