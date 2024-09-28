package com.example.demo.controller.user;

import com.example.demo.entity.user.Table_user;
import com.example.demo.service.user.TableUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/tables")
public class TableUserController {

    @Autowired
    private TableUserService tableUserService;

    @GetMapping
    public List<Table_user> getAllUsers() {
        return tableUserService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Table_user> getUserById(@PathVariable("id") String id) {
        Table_user user = tableUserService.getUserById(id);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Table_user> createUser(@RequestBody Table_user user) {
        Table_user createdUser = tableUserService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Table_user> updateUser(@PathVariable("id") String id, @RequestBody Table_user user) {
        Table_user updatedUser = tableUserService.updateUser(id, user);
        if (updatedUser != null) {
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") String id) {
        tableUserService.deleteUser(id);
        return ResponseEntity.ok("Menu orders deleted successfully for table ID: " + id);
    }

    @PutMapping("/updateStatus/{tableId}")
    public ResponseEntity<String> updateStatus(@PathVariable("tableId") String tableId, @RequestParam("status") String status) {
        boolean isUpdated = tableUserService.updateStatusByTableId(tableId, status);
        if (isUpdated) {
            return ResponseEntity.ok("Status updated successfully");
        } else {
            return ResponseEntity.status(404).body("Table ID not found");
        }
    }
}