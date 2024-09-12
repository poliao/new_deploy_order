package com.example.demo.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.user.Table_user;
import com.example.demo.service.user.TableUserService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "https://new-deploy-order.onrender.com")
@RequestMapping("/api/tables")
public class TableUserController {

    @Autowired
    private TableUserService tableUserService;

    @GetMapping
    public List<Table_user> getAllTables() {
        return tableUserService.getAllTables();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Table_user> getTableById(@PathVariable("id") Long id) {
        Optional<Table_user> table = tableUserService.getTableById(id);
        return table.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Table_user createTable(@RequestBody Table_user table) {
        return tableUserService.createTable(table);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Table_user> updateTable(@PathVariable("id") Long id, @RequestBody Table_user tableDetails) {
        Optional<Table_user> updatedTable = tableUserService.updateTable(id, tableDetails);
        return updatedTable.map(ResponseEntity::ok)
                           .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTable(@PathVariable("id") Long id) {
        boolean isDeleted = tableUserService.deleteTable(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
