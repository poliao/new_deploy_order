package com.example.demo.service.user;

import com.example.demo.entity.user.Table_user;
import com.example.demo.repository.user.TableUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TableUserService {

    @Autowired
    private TableUserRepository tableUserRepository;

    public List<Table_user> getAllUsers() {
        return tableUserRepository.findAll();
    }

    public Table_user getUserById(String id) {
        Optional<Table_user> user = tableUserRepository.findById(id);
        return user.orElse(null);
    }

    public Table_user createUser(Table_user user) {
        return tableUserRepository.save(user);
    }

    public Table_user updateUser(String id, Table_user userDetails) {
        Optional<Table_user> userOptional = tableUserRepository.findById(id);
        if (userOptional.isPresent()) {
            Table_user user = userOptional.get();
            user.setTableName(userDetails.getTableName());
            user.setStatus(userDetails.getStatus());
            return tableUserRepository.save(user);
        }
        return null;
    }

    public void deleteUser(String id) {
        tableUserRepository.deleteById(id);
    }

    public boolean updateStatusByTableId(String tableId, String newStatus) {
        Optional<Table_user> tableUserOptional = tableUserRepository.findById(tableId);
        if (tableUserOptional.isPresent()) {
            Table_user tableUser = tableUserOptional.get();
            tableUser.setStatus(newStatus);
            tableUserRepository.save(tableUser);
            return true;
        } else {
            return false; // ไม่พบ tableId ที่ต้องการอัพเดต
        }
    }
}
